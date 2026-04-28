import { Menu, Sun, Moon, Monitor, Calculator, Languages } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu, DropdownMenuContent,
  DropdownMenuItem, DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { useMathmindLanguage } from '../../context';

interface HeaderProps {
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
  theme: 'light' | 'dark' | 'system';
  resolvedTheme: 'light' | 'dark';
  onThemeChange: (theme: 'light' | 'dark' | 'system') => void;
}

export function Header({ isSidebarOpen, onToggleSidebar, theme, resolvedTheme, onThemeChange }: HeaderProps) {
  const { t, lang, setLang } = useMathmindLanguage();

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between px-4 py-3 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
      <div className="flex items-center gap-3">
        {!isSidebarOpen && (
          <Button variant="ghost" size="icon" onClick={onToggleSidebar} className="lg:flex">
            <Menu className="w-5 h-5" />
          </Button>
        )}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
            <Calculator className="w-4 h-4 text-white" />
          </div>
          <span className="font-semibold text-lg text-gray-900 dark:text-gray-100">
            {t.appName}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setLang(lang === 'en' ? 'es' : 'en')}
          className="text-xs font-semibold tracking-wide text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 gap-1.5 px-2"
          title="Switch language"
        >
          <Languages className="w-4 h-4" />
          {lang === 'en' ? 'ES' : 'EN'}
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              {resolvedTheme === 'dark' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onThemeChange('light')}>
              <Sun className={cn('w-4 h-4 mr-2', theme === 'light' && 'text-indigo-600')} />
              {t.header.themeLight}
              {theme === 'light' && <span className="ml-auto text-indigo-600">✓</span>}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onThemeChange('dark')}>
              <Moon className={cn('w-4 h-4 mr-2', theme === 'dark' && 'text-indigo-600')} />
              {t.header.themeDark}
              {theme === 'dark' && <span className="ml-auto text-indigo-600">✓</span>}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onThemeChange('system')}>
              <Monitor className={cn('w-4 h-4 mr-2', theme === 'system' && 'text-indigo-600')} />
              {t.header.themeSystem}
              {theme === 'system' && <span className="ml-auto text-indigo-600">✓</span>}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
