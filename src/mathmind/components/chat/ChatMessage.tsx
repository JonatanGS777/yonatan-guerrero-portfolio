import { memo, useMemo, useState } from 'react';
import { toast } from 'sonner';
import type { Message } from '../../types';
import { MathRenderer } from '../math/MathRenderer';
import { User, Bot, Copy, Check, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useMathmindLanguage } from '../../context';

interface ChatMessageProps {
  message: Message;
  onRegenerate?: () => void;
}

export const ChatMessage = memo(function ChatMessage({ message, onRegenerate }: ChatMessageProps) {
  const { t } = useMathmindLanguage();
  const [copied, setCopied] = useState(false);
  const isUser = message.role === 'user';

  const formattedTime = useMemo(
    () => message.timestamp.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
    [message.timestamp]
  );

  const handleCopy = async () => {
    await navigator.clipboard.writeText(message.content);
    setCopied(true);
    toast.success(t.chatMessage.copiedToast);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <article
      role="listitem"
      aria-label={`${isUser ? t.chatMessage.you : t.appName}: ${message.content.slice(0, 80)}`}
      className={cn(
        'group py-6 px-4 md:px-8',
        isUser ? 'bg-white dark:bg-gray-900' : 'bg-gray-50 dark:bg-gray-800/50'
      )}
    >
      <div className="max-w-3xl mx-auto flex gap-4 md:gap-6">
        <div className={cn(
          'flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center',
          isUser
            ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400'
            : 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400'
        )}>
          {isUser ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-semibold text-sm text-gray-900 dark:text-gray-100">
              {isUser ? t.chatMessage.you : t.appName}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400">{formattedTime}</span>
          </div>

          <div
            className="text-gray-800 dark:text-gray-200 leading-relaxed"
            aria-live={!isUser && !message.isLoading ? 'polite' : undefined}
            aria-atomic="false"
          >
            {message.isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.1s]" />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]" />
              </div>
            ) : (
              <MathRenderer content={message.content} />
            )}
          </div>

          {!isUser && !message.isLoading && (
            <div className="mt-2 flex gap-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
              <Button
                variant="ghost" size="sm" onClick={handleCopy}
                className="h-8 px-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                {copied ? <Check className="w-4 h-4 mr-1" /> : <Copy className="w-4 h-4 mr-1" />}
                {copied ? t.chatMessage.copied : t.chatMessage.copy}
              </Button>
              {onRegenerate && (
                <Button
                  variant="ghost" size="sm" onClick={onRegenerate}
                  className="h-8 px-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <RefreshCw className="w-4 h-4 mr-1" />
                  {t.chatMessage.regenerate}
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </article>
  );
});
