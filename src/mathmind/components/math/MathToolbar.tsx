import { useState } from 'react';
import { ChevronDown, Calculator } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import katex from 'katex';
import 'katex/dist/katex.min.css';

interface MathToolbarProps {
  onInsert: (latex: string, cursorOffset?: number) => void;
}

const mathSymbols = [
  { label: 'Fracción', latex: '\\frac{}{}', preview: '\\frac{a}{b}', cursorOffset: -3 },
  { label: 'Raíz cuadrada', latex: '\\sqrt{}', preview: '\\sqrt{x}', cursorOffset: -1 },
  { label: 'Raíz n-ésima', latex: '\\sqrt[]{}', preview: '\\sqrt[n]{x}', cursorOffset: -3 },
  { label: 'Suma', latex: '\\sum', preview: '\\sum' },
  { label: 'Integral', latex: '\\int', preview: '\\int' },
  { label: 'Límite', latex: '\\lim_{x \\to }', preview: '\\lim_{x\\to 0}', cursorOffset: -1 },
  { label: 'Pi', latex: '\\pi', preview: '\\pi' },
  { label: 'Infinito', latex: '\\infty', preview: '\\infty' },
  { label: 'Alfa', latex: '\\alpha', preview: '\\alpha' },
  { label: 'Beta', latex: '\\beta', preview: '\\beta' },
  { label: 'Gamma', latex: '\\gamma', preview: '\\gamma' },
  { label: 'Delta', latex: '\\delta', preview: '\\delta' },
  { label: 'Theta', latex: '\\theta', preview: '\\theta' },
  { label: 'Lambda', latex: '\\lambda', preview: '\\lambda' },
  { label: 'Mu', latex: '\\mu', preview: '\\mu' },
  { label: 'Sigma', latex: '\\sigma', preview: '\\sigma' },
  { label: 'Phi', latex: '\\phi', preview: '\\phi' },
  { label: 'Omega', latex: '\\omega', preview: '\\omega' },
  { label: 'Mayor o igual', latex: '\\geq', preview: '\\geq' },
  { label: 'Menor o igual', latex: '\\leq', preview: '\\leq' },
  { label: 'Distinto', latex: '\\neq', preview: '\\neq' },
  { label: 'Aproximado', latex: '\\approx', preview: '\\approx' },
  { label: 'Parcial', latex: '\\partial', preview: '\\partial' },
  { label: 'Nabla', latex: '\\nabla', preview: '\\nabla' },
  { label: 'Vector', latex: '\\vec{}', preview: '\\vec{v}', cursorOffset: -1 },
  { label: 'Subíndice', latex: '_{}', preview: 'x_i', cursorOffset: -1 },
  { label: 'Superíndice', latex: '^{}', preview: 'x^n', cursorOffset: -1 },
];

function renderSymbol(preview: string): string {
  try {
    return katex.renderToString(preview, { throwOnError: false, displayMode: false });
  } catch {
    return preview;
  }
}

export function MathToolbar({ onInsert }: MathToolbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleInsert = (symbol: typeof mathSymbols[0]) => {
    onInsert(symbol.latex, symbol.cursorOffset);
    setIsOpen(false);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          aria-label="Insertar símbolo matemático"
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          className="gap-1 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
        >
          <Calculator className="w-4 h-4" aria-hidden="true" />
          <span className="hidden sm:inline">Símbolos</span>
          <ChevronDown className="w-3 h-3" aria-hidden="true" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-2" align="start">
        <div role="listbox" aria-label="Símbolos matemáticos" className="grid grid-cols-4 gap-1">
          {mathSymbols.map((symbol) => (
            <button
              key={symbol.label}
              role="option"
              aria-selected={false}
              onClick={() => handleInsert(symbol)}
              className={cn(
                'flex flex-col items-center justify-center p-2 rounded-lg min-h-[3rem]',
                'hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors'
              )}
              title={symbol.label}
              aria-label={symbol.label}
              dangerouslySetInnerHTML={{ __html: renderSymbol(symbol.preview) }}
            />
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
