import { Info, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useMathmindLanguage } from '../context';

interface DemoBannerProps {
  isVisible: boolean;
}

export function DemoBanner({ isVisible }: DemoBannerProps) {
  const [isDismissed, setIsDismissed] = useState(false);
  const { t } = useMathmindLanguage();

  if (!isVisible || isDismissed) return null;

  return (
    <div className="bg-amber-50 dark:bg-amber-900/20 border-b border-amber-200 dark:border-amber-800 px-4 py-2">
      <div className="max-w-3xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-sm text-amber-800 dark:text-amber-200">
          <Info className="w-4 h-4 flex-shrink-0" />
          <span>
            <strong>{t.demoBanner.title}</strong> {t.demoBanner.body}{' '}
            <a href="https://console.anthropic.com/" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline">
              {t.demoBanner.cta}
            </a>
          </span>
        </div>
        <Button
          variant="ghost" size="icon"
          className="h-6 w-6 flex-shrink-0 text-amber-800 dark:text-amber-200 hover:bg-amber-100 dark:hover:bg-amber-900/30"
          onClick={() => setIsDismissed(true)}
        >
          <X className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
