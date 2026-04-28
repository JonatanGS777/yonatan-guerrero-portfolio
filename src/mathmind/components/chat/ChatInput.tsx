import { useState, useRef, useEffect } from 'react';
import { Send, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { useMathmindLanguage } from '../../context';
import { MathRenderer } from '../math/MathRenderer';

const HAS_MATH = /\$[^$]+\$|\$\$[\s\S]+?\$\$/;

interface ChatInputProps {
  onSend: (message: string) => void;
  isLoading?: boolean;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  textareaRef?: React.RefObject<HTMLTextAreaElement | null>;
}

export function ChatInput({ onSend, isLoading = false, placeholder, value, onChange, textareaRef: externalRef }: ChatInputProps) {
  const { t } = useMathmindLanguage();
  const resolvedPlaceholder = placeholder ?? t.chatInput.placeholder;
  const [internalMessage, setInternalMessage] = useState('');
  const internalRef = useRef<HTMLTextAreaElement>(null);

  const message = value !== undefined ? value : internalMessage;
  const setMessage = onChange ?? setInternalMessage;
  const textareaRef = externalRef ?? internalRef;
  const MAX_LENGTH = 4000;

  const handleSubmit = () => {
    if (!message.trim() || isLoading || message.length > MAX_LENGTH) return;
    onSend(message);
    setMessage('');
    if (textareaRef.current) textareaRef.current.style.height = 'auto';
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [message]);

  return (
    <div>
      <div className="relative flex items-end gap-2 bg-gray-100 dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 focus-within:ring-2 focus-within:ring-indigo-500/20 focus-within:border-indigo-500 transition-all">
        <Textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={resolvedPlaceholder}
          disabled={isLoading}
          aria-label={t.chatInput.placeholder}
          aria-busy={isLoading}
          aria-multiline="true"
          className={cn(
            'flex-1 min-h-[52px] max-h-[200px] bg-transparent border-0 resize-none',
            'focus-visible:ring-0 focus-visible:ring-offset-0',
            'placeholder:text-gray-500 dark:placeholder:text-gray-400',
            'text-gray-900 dark:text-gray-100 py-3.5 px-4 disabled:opacity-70'
          )}
          rows={1}
        />
        <div className="flex items-center gap-1 pr-2 pb-2">
          <Button
            onClick={handleSubmit}
            disabled={!message.trim() || isLoading}
            size="icon"
            className={cn(
              'h-9 w-9 rounded-xl transition-all',
              message.trim() && !isLoading
                ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                : 'bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed'
            )}
          >
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          </Button>
        </div>
      </div>

      {HAS_MATH.test(message) && (
        <div className="mt-2 px-3 py-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/50 text-sm text-gray-800 dark:text-gray-200 overflow-x-auto">
          <MathRenderer content={message} />
        </div>
      )}

      <div className="flex items-center justify-between mt-2">
        <p className="text-xs text-gray-500 dark:text-gray-400">{t.chatInput.hint}</p>
        {message.length > MAX_LENGTH * 0.8 && (
          <p className={cn('text-xs', message.length > MAX_LENGTH ? 'text-red-500' : 'text-amber-500')}>
            {message.length}/{MAX_LENGTH}
          </p>
        )}
      </div>
    </div>
  );
}
