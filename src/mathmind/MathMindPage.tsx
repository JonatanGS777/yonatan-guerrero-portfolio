import { useState, useEffect, useRef, useCallback } from 'react';
import { Sidebar } from './components/chat/Sidebar';
import { Header } from './components/chat/Header';
import { ChatMessage } from './components/chat/ChatMessage';
import { ChatInput } from './components/chat/ChatInput';
import { WelcomeScreen } from './components/chat/WelcomeScreen';
import { MathToolbar } from './components/math/MathToolbar';
import { DemoBanner } from './components/DemoBanner';
import { MathmindLanguageProvider } from './context';
import { useChatTheme } from './hooks/useTheme';
import { useChat } from './hooks/useChat';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

function MathMindApp() {
  const { theme, setTheme, resolvedTheme } = useChatTheme();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const {
    conversations, currentConversation, currentConversationId,
    isLoading, isDemoMode, messagesEndRef,
    createNewConversation, setCurrentConversationId,
    sendMessage, regenerateLastMessage, deleteConversation, clearConversations,
  } = useChat();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'instant' });
  }, [currentConversation?.messages, isLoading]);

  const handleSend = async (message: string) => { await sendMessage(message); };
  const handleStartChat = (prompt: string) => { sendMessage(prompt); };

  const handleInsertSymbol = (latex: string, cursorOffset?: number) => {
    const input = inputRef.current;
    if (input) {
      const start = input.selectionStart || 0;
      const end = input.selectionEnd || 0;
      const wrapped = `$${latex}$`;
      const newValue = inputValue.slice(0, start) + wrapped + inputValue.slice(end);
      setInputValue(newValue);
      setTimeout(() => {
        input.focus();
        const cursorPos = cursorOffset !== undefined
          ? start + 1 + latex.length + cursorOffset
          : start + wrapped.length;
        input.setSelectionRange(cursorPos, cursorPos);
      }, 0);
    }
  };

  const handleRegenerate = useCallback(() => { regenerateLastMessage(); }, [regenerateLastMessage]);

  const inputArea = (
    <div className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
      <div className="max-w-3xl mx-auto px-4 py-3">
        <div className="flex items-center gap-2 mb-2">
          <MathToolbar onInsert={handleInsertSymbol} />
        </div>
        <ChatInput
          onSend={handleSend}
          isLoading={isLoading}
          value={inputValue}
          onChange={setInputValue}
          textareaRef={inputRef}
        />
      </div>
    </div>
  );

  return (
    <div className={cn('flex overflow-hidden', resolvedTheme)} style={{ height: '100dvh' }}>
      <Sidebar
        conversations={conversations}
        currentConversationId={currentConversationId}
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        onNewConversation={createNewConversation}
        onSelectConversation={setCurrentConversationId}
        onDeleteConversation={deleteConversation}
        onClearConversations={clearConversations}
      />

      <div className="flex-1 flex flex-col min-w-0 bg-white dark:bg-gray-900">
        <Header
          isSidebarOpen={isSidebarOpen}
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          theme={theme}
          resolvedTheme={resolvedTheme}
          onThemeChange={setTheme}
        />

        <div className="flex-1 flex flex-col overflow-hidden">
          {currentConversation && currentConversation.messages.length > 0 ? (
            <>
              <DemoBanner isVisible={isDemoMode} />
              <ScrollArea className="flex-1 min-h-0">
                <div role="list" aria-label="Conversación" className="pb-4">
                  {currentConversation.messages.map((message, index) => {
                    const isLastAssistant =
                      !isLoading &&
                      message.role === 'assistant' &&
                      index === currentConversation.messages.length - 1;
                    return (
                      <ChatMessage
                        key={message.id}
                        message={message}
                        onRegenerate={isLastAssistant ? handleRegenerate : undefined}
                      />
                    );
                  })}
                  {isLoading && (
                    <ChatMessage
                      message={{ id: 'typing', role: 'assistant', content: '', timestamp: new Date(), isLoading: true }}
                    />
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>
              {inputArea}
            </>
          ) : (
            <>
              <WelcomeScreen onStart={handleStartChat} />
              {inputArea}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function MathMindPage() {
  return (
    <MathmindLanguageProvider>
      <MathMindApp />
    </MathmindLanguageProvider>
  );
}
