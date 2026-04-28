import { useState, useEffect } from 'react';
import type { Conversation } from '../../types';
import {
  MessageSquare, Plus, Trash2, MoreHorizontal,
  ChevronLeft, ChevronRight, X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  DropdownMenu, DropdownMenuContent,
  DropdownMenuItem, DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { useMathmindLanguage } from '../../context';

interface SidebarProps {
  conversations: Conversation[];
  currentConversationId: string | null;
  isOpen: boolean;
  onToggle: () => void;
  onNewConversation: () => void;
  onSelectConversation: (id: string) => void;
  onDeleteConversation: (id: string) => void;
  onClearConversations: () => void;
}

export function Sidebar({
  conversations, currentConversationId, isOpen, onToggle,
  onNewConversation, onSelectConversation, onDeleteConversation, onClearConversations,
}: SidebarProps) {
  const { t } = useMathmindLanguage();
  const [confirmingClear, setConfirmingClear] = useState(false);

  useEffect(() => {
    if (!isOpen) setConfirmingClear(false);
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={onToggle} />
      )}

      <div className={cn(
        'fixed lg:static inset-y-0 left-0 z-50',
        'bg-gray-50 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800',
        'flex flex-col transition-all duration-300 ease-in-out',
        isOpen ? 'w-80 translate-x-0' : 'w-0 -translate-x-full lg:w-16 lg:translate-x-0'
      )}>
        <div className="flex items-center justify-between p-3 border-b border-gray-200 dark:border-gray-800">
          {isOpen ? (
            <>
              <Button onClick={onNewConversation} variant="outline" className="flex-1 justify-start gap-2 mr-2">
                <Plus className="w-4 h-4" />
                {t.sidebar.newConversation}
              </Button>
              <Button variant="ghost" size="icon" onClick={onToggle} className="lg:flex hidden">
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={onToggle} className="lg:hidden">
                <X className="w-4 h-4" />
              </Button>
            </>
          ) : (
            <Button variant="ghost" size="icon" onClick={onToggle} className="mx-auto">
              <ChevronRight className="w-4 h-4" />
            </Button>
          )}
        </div>

        {isOpen && (
          <>
            <ScrollArea className="flex-1">
              <div className="p-2 space-y-1">
                {conversations.length === 0 ? (
                  <div className="text-center py-8 text-gray-500 dark:text-gray-400 text-sm">
                    {t.sidebar.noConversations}
                  </div>
                ) : (
                  conversations.map((conversation) => (
                    <div
                      key={conversation.id}
                      onClick={() => onSelectConversation(conversation.id)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => e.key === 'Enter' && onSelectConversation(conversation.id)}
                      className={cn(
                        'group w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left text-sm transition-colors cursor-pointer',
                        'hover:bg-gray-200 dark:hover:bg-gray-800',
                        currentConversationId === conversation.id
                          ? 'bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100'
                          : 'text-gray-700 dark:text-gray-300'
                      )}
                    >
                      <MessageSquare className="w-4 h-4 flex-shrink-0" />
                      <span className="flex-1 truncate">{conversation.title}</span>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                          <Button variant="ghost" size="icon" className="h-6 w-6 opacity-0 group-hover:opacity-100">
                            <MoreHorizontal className="w-3 h-3" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={(e) => { e.stopPropagation(); onDeleteConversation(conversation.id); }}
                            className="text-red-600"
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            {t.sidebar.delete}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  ))
                )}
              </div>
            </ScrollArea>

            {conversations.length > 0 && (
              <div className="p-3 border-t border-gray-200 dark:border-gray-800">
                {confirmingClear ? (
                  <div className="space-y-2">
                    <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                      {t.sidebar.clearConfirm}
                    </p>
                    <div className="flex gap-2">
                      <Button
                        variant="destructive" size="sm" className="flex-1 text-xs"
                        onClick={() => { onClearConversations(); setConfirmingClear(false); }}
                      >
                        {t.sidebar.clearYes}
                      </Button>
                      <Button variant="ghost" size="sm" className="flex-1 text-xs" onClick={() => setConfirmingClear(false)}>
                        {t.sidebar.clearCancel}
                      </Button>
                    </div>
                  </div>
                ) : (
                  <Button
                    variant="ghost" size="sm" onClick={() => setConfirmingClear(true)}
                    className="w-full text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    {t.sidebar.clearHistory}
                  </Button>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}
