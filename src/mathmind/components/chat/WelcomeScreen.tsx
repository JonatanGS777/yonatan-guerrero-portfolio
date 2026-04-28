import { Calculator, FunctionSquare, Sigma, Square } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useMathmindLanguage } from '../../context';
import { MathRenderer } from '../math/MathRenderer';

interface WelcomeScreenProps {
  onStart: (prompt: string) => void;
}

const promptIcons = [FunctionSquare, Sigma, Square, Calculator];

export function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  const { t } = useMathmindLanguage();

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4 py-12">
      <div className="text-center max-w-2xl mx-auto">
        <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/25">
          <Calculator className="w-10 h-10 text-white" />
        </div>

        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          {t.appName}
        </h1>

        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
          {t.welcome.tagline}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl mx-auto">
          {t.welcome.prompts.map((example, index) => {
            const Icon = promptIcons[index];
            return (
              <Button
                key={index}
                variant="outline"
                onClick={() => onStart(example.prompt)}
                className="h-auto py-4 px-4 justify-start text-left hover:bg-gray-50 dark:hover:bg-gray-800 border-gray-200 dark:border-gray-700"
              >
                <Icon className="w-5 h-5 mr-3 text-indigo-600 dark:text-indigo-400 flex-shrink-0" />
                <div className="min-w-0 flex-1">
                  <div className="font-medium text-gray-900 dark:text-gray-100">
                    {example.title}
                  </div>
                  <div
                    className="mt-1 overflow-hidden max-h-8 w-full [&_.prose]:!text-gray-500 [&_.prose]:dark:!text-gray-400 [&_p]:!m-0 [&_p]:!leading-none [&_.katex-display]:overflow-hidden [&_.katex]:max-w-full"
                    style={{ fontSize: '0.6rem' }}
                  >
                    <MathRenderer content={example.prompt} />
                  </div>
                </div>
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
