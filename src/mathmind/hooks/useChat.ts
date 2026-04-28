import { useState, useCallback, useRef, useEffect } from 'react';
import type { Message, Conversation } from '../types';
import type { Translations } from '../translations';
import { useAnthropicChat } from './useAnthropicChat';
import { useMathmindLanguage } from '../context';

function classifyError(error: unknown, t: Translations): string {
  if (!(error instanceof Error)) return t.errors.generic;
  const msg = error.message.toLowerCase();
  if (error.name === 'AbortError' || msg.includes('timeout') || msg.includes('tardó')) return t.errors.timeout;
  if (msg.includes('401') || msg.includes('authentication') || msg.includes('api key') || msg.includes('unauthorized')) return t.errors.auth;
  if (msg.includes('429') || msg.includes('rate limit') || msg.includes('too many')) return t.errors.rateLimit;
  if (msg.includes('500') || msg.includes('502') || msg.includes('503') || msg.includes('server error')) return t.errors.server;
  if (msg.includes('failed to fetch') || msg.includes('network') || msg.includes('load failed')) return t.errors.network;
  return `${t.errors.generic} (${error.message})`;
}

const STORAGE_KEY = 'mathmind-conversations';
const SCHEMA_VERSION = 1;
const STORAGE_VERSION_KEY = 'mathmind-schema-version';
const MAX_CONTEXT_MESSAGES = 20;
const MAX_STORED_CONVERSATIONS = 50;
const MAX_MESSAGES_PER_CONVERSATION = 100;

function loadConversations(): Conversation[] {
  try {
    const storedVersion = Number(localStorage.getItem(STORAGE_VERSION_KEY) ?? '0');
    if (storedVersion !== SCHEMA_VERSION) {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.setItem(STORAGE_VERSION_KEY, String(SCHEMA_VERSION));
      return [];
    }
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return parsed.map((c: Conversation) => ({
      ...c,
      createdAt: new Date(c.createdAt),
      updatedAt: new Date(c.updatedAt),
      messages: c.messages.map((m: Message) => ({ ...m, timestamp: new Date(m.timestamp) })),
    }));
  } catch {
    return [];
  }
}

function trimForStorage(convs: Conversation[]): Conversation[] {
  return convs.slice(0, MAX_STORED_CONVERSATIONS).map(c => ({
    ...c,
    messages: c.messages.slice(-MAX_MESSAGES_PER_CONVERSATION),
  }));
}

export function useChat() {
  const { t } = useMathmindLanguage();
  const [conversations, setConversations] = useState<Conversation[]>(loadConversations);
  const [currentConversationId, setCurrentConversationId] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_VERSION_KEY, String(SCHEMA_VERSION));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(trimForStorage(conversations)));
  }, [conversations]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { sendMessage: sendToAnthropic, isLoading, isDemoMode } = useAnthropicChat();
  const currentConversation = conversations.find(c => c.id === currentConversationId);
  const generateId = () => Math.random().toString(36).substring(2, 15);

  const createNewConversation = useCallback(() => {
    const newConversation: Conversation = {
      id: generateId(),
      title: t.chatMessage.newConversationTitle,
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setConversations(prev => [newConversation, ...prev]);
    setCurrentConversationId(newConversation.id);
    return newConversation.id;
  }, [t.chatMessage.newConversationTitle]);

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim()) return;

    let convId = currentConversationId;
    if (!convId) convId = createNewConversation();

    const conversation = conversations.find(c => c.id === convId);
    const historyMessages: Message[] = conversation ? conversation.messages : [];
    const userMsg: Message = { id: 'temp', role: 'user', content, timestamp: new Date() };
    const allMessages: Message[] = [...historyMessages, userMsg];
    const contextMessages = allMessages.slice(-MAX_CONTEXT_MESSAGES);

    const userMsgId = generateId();
    const assistantMsgId = generateId();
    const now = new Date();
    const userMsgFinal: Message = { id: userMsgId, role: 'user', content, timestamp: now };
    const assistantPlaceholder: Message = { id: assistantMsgId, role: 'assistant', content: '', timestamp: now };

    setConversations(prev =>
      prev.map(conv => {
        if (conv.id !== convId) return conv;
        const title =
          conv.title === t.chatMessage.newConversationTitle
            ? content.slice(0, 30) + (content.length > 30 ? '...' : '')
            : conv.title;
        return { ...conv, messages: [...conv.messages, userMsgFinal, assistantPlaceholder], title, updatedAt: now };
      })
    );

    try {
      await sendToAnthropic(contextMessages, (chunk: string) => {
        setConversations(prev =>
          prev.map(conv => {
            if (conv.id !== convId) return conv;
            return {
              ...conv,
              messages: conv.messages.map(m =>
                m.id === assistantMsgId ? { ...m, content: m.content + chunk } : m
              ),
              updatedAt: new Date(),
            };
          })
        );
      });
    } catch (error) {
      const errorMessage = classifyError(error, t);
      setConversations(prev =>
        prev.map(conv => {
          if (conv.id !== convId) return conv;
          return {
            ...conv,
            messages: conv.messages.map(m =>
              m.id === assistantMsgId ? { ...m, content: errorMessage } : m
            ),
            updatedAt: new Date(),
          };
        })
      );
    }

    return convId;
  }, [currentConversationId, conversations, createNewConversation, sendToAnthropic, t]);

  const regenerateLastMessage = useCallback(async () => {
    if (!currentConversationId) return;
    const conv = conversations.find(c => c.id === currentConversationId);
    if (!conv || conv.messages.length < 2) return;

    const msgs = conv.messages;
    let lastAssistantIdx = -1;
    for (let i = msgs.length - 1; i >= 0; i--) {
      if (msgs[i].role === 'assistant') { lastAssistantIdx = i; break; }
    }
    if (lastAssistantIdx === -1) return;

    const assistantMsgId = msgs[lastAssistantIdx].id;
    const contextMessages = msgs.slice(0, lastAssistantIdx).slice(-MAX_CONTEXT_MESSAGES);

    setConversations(prev => prev.map(c =>
      c.id !== currentConversationId ? c : {
        ...c,
        messages: c.messages.map(m => m.id === assistantMsgId ? { ...m, content: '' } : m),
        updatedAt: new Date(),
      }
    ));

    try {
      await sendToAnthropic(contextMessages, (chunk: string) => {
        setConversations(prev => prev.map(c =>
          c.id !== currentConversationId ? c : {
            ...c,
            messages: c.messages.map(m =>
              m.id === assistantMsgId ? { ...m, content: m.content + chunk } : m
            ),
            updatedAt: new Date(),
          }
        ));
      });
    } catch (error) {
      const errorMessage = classifyError(error, t);
      setConversations(prev => prev.map(c =>
        c.id !== currentConversationId ? c : {
          ...c,
          messages: c.messages.map(m =>
            m.id === assistantMsgId ? { ...m, content: errorMessage } : m
          ),
        }
      ));
    }
  }, [currentConversationId, conversations, sendToAnthropic, t]);

  const deleteConversation = useCallback((conversationId: string) => {
    setConversations(prev => prev.filter(c => c.id !== conversationId));
    if (currentConversationId === conversationId) setCurrentConversationId(null);
  }, [currentConversationId]);

  const clearConversations = useCallback(() => {
    setConversations([]);
    setCurrentConversationId(null);
  }, []);

  return {
    conversations, currentConversation, currentConversationId,
    isLoading, isDemoMode, messagesEndRef,
    createNewConversation, setCurrentConversationId,
    sendMessage, regenerateLastMessage, deleteConversation, clearConversations,
  };
}
