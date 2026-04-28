import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import remarkGfm from 'remark-gfm';
import 'katex/dist/katex.min.css';
import { ChartRenderer } from './ChartRenderer';

interface MathRendererProps {
  content: string;
  className?: string;
}

export function MathRenderer({ content, className = '' }: MathRendererProps) {
  const normalized = content
    .replace(/\\\[([\s\S]*?)\\\]/g, (_: string, math: string) => {
      if (/^[\d\s,.-]+$/.test(math.trim())) return `[${math}]`;
      return `$$${math}$$`;
    })
    .replace(/\\\(([\s\S]*?)\\\)/g, (_: string, math: string) => `$${math}$`);

  return (
    <div className={`prose dark:prose-invert max-w-none ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkMath, remarkGfm]}
        rehypePlugins={[rehypeKatex]}
        components={{
          code({ className, children, ...props }) {
            const isBlock = className?.includes('language-');
            const isChart = className === 'language-chart';

            if (isChart) {
              return <ChartRenderer raw={String(children)} />;
            }

            return isBlock ? (
              <code
                className={`block bg-gray-100 dark:bg-gray-800 rounded-md px-4 py-3 text-sm font-mono overflow-x-auto ${className ?? ''}`}
                {...props}
              >
                {children}
              </code>
            ) : (
              <code className="bg-gray-100 dark:bg-gray-800 rounded px-1 py-0.5 text-sm font-mono" {...props}>
                {children}
              </code>
            );
          },
          p({ children }) {
            return <p className="mb-2 last:mb-0 leading-relaxed">{children}</p>;
          },
          ul({ children }) {
            return <ul className="list-disc list-inside mb-2 space-y-1">{children}</ul>;
          },
          ol({ children }) {
            return <ol className="list-decimal list-inside mb-2 space-y-1">{children}</ol>;
          },
          h1({ children }) {
            return <h1 className="text-xl font-bold mb-2 mt-3">{children}</h1>;
          },
          h2({ children }) {
            return <h2 className="text-lg font-semibold mb-2 mt-3">{children}</h2>;
          },
          h3({ children }) {
            return <h3 className="text-base font-semibold mb-1 mt-2">{children}</h3>;
          },
          blockquote({ children }) {
            return (
              <blockquote className="border-l-4 border-indigo-400 bg-indigo-50 dark:bg-indigo-900/20 pl-4 pr-3 py-2 rounded-r-md my-2 italic">
                {children}
              </blockquote>
            );
          },
        }}
      >
        {normalized}
      </ReactMarkdown>
    </div>
  );
}
