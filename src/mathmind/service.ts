import type { Message } from './types';

const ANTHROPIC_API_URL = '/api/messages';

interface AnthropicMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface AnthropicRequestBody {
  model: string;
  max_tokens: number;
  messages: AnthropicMessage[];
  stream?: boolean;
  system?: string;
}

interface AnthropicResponse {
  id: string;
  type: string;
  role: string;
  content: Array<{ type: string; text: string }>;
  model: string;
  stop_reason: string | null;
  stop_sequence: string | null;
  usage: { input_tokens: number; output_tokens: number };
}

export class AnthropicService {
  private model: string;

  constructor(_apiKey: string, model: string = 'claude-haiku-4-5-20251001') {
    this.model = model;
  }

  async sendMessage(messages: Message[], systemPrompt?: string): Promise<string> {
    const anthropicMessages: AnthropicMessage[] = messages.map((msg) => ({
      role: msg.role,
      content: msg.content,
    }));

    const body: AnthropicRequestBody = {
      model: this.model,
      max_tokens: 4096,
      messages: anthropicMessages,
      ...(systemPrompt && { system: systemPrompt }),
    };

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30_000);

    try {
      const response = await fetch(ANTHROPIC_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        signal: controller.signal,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error?.message || `Error HTTP: ${response.status}`);
      }

      const data: AnthropicResponse = await response.json();
      return data.content[0]?.text || 'No se recibió respuesta';
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        throw new Error('La solicitud tardó demasiado. Intenta de nuevo.');
      }
      throw error;
    } finally {
      clearTimeout(timeoutId);
    }
  }

  async *streamMessage(messages: Message[], systemPrompt?: string): AsyncGenerator<string, void, unknown> {
    const anthropicMessages: AnthropicMessage[] = messages.map((msg) => ({
      role: msg.role,
      content: msg.content,
    }));

    const body: AnthropicRequestBody = {
      model: this.model,
      max_tokens: 4096,
      messages: anthropicMessages,
      stream: true,
      ...(systemPrompt && { system: systemPrompt }),
    };

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30_000);

    const response = await fetch(ANTHROPIC_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error?.message || `Error HTTP: ${response.status}`);
    }

    const reader = response.body?.getReader();
    if (!reader) throw new Error('No se pudo obtener el reader del stream');

    const decoder = new TextDecoder();
    let buffer = '';

    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            if (data === '[DONE]') return;
            try {
              const parsed = JSON.parse(data);
              if (parsed.type === 'content_block_delta') {
                yield parsed.delta.text || '';
              }
            } catch {
              // ignore malformed lines
            }
          }
        }
      }
    } finally {
      reader.releaseLock();
    }
  }
}

export const MATH_TUTOR_PROMPT = `Eres MathMind, un tutor de matemáticas experto y paciente. Tu objetivo es ayudar a los estudiantes a entender conceptos matemáticos y resolver problemas paso a paso.

INSTRUCCIONES IMPORTANTES:
1. Siempre responde en español
2. Usa LaTeX para todas las fórmulas matemáticas:
   - Inline: $fórmula$
   - Bloque: $$fórmula$$
3. Explica cada paso de forma clara y detallada
4. Si el estudiante comete un error, corrígelo amablemente
5. Anima al estudiante a pensar y razonar
6. Proporciona ejemplos adicionales cuando sea útil
7. Verifica tus respuestas cuando sea posible

GRÁFICAS - MUY IMPORTANTE:
- NUNCA uses arte ASCII para representar gráficas
- Cuando necesites mostrar una gráfica, usa SIEMPRE este formato:

\`\`\`chart
{
  "title": "Título descriptivo",
  "functions": [
    {
      "name": "f(x) = x²",
      "color": "#6366f1",
      "points": [[-3,9],[-2,4],[-1,1],[0,0],[1,1],[2,4],[3,9]]
    }
  ],
  "xLabel": "x",
  "yLabel": "y"
}
\`\`\`

ESTRUCTURA DE RESPUESTA:
1. Entiende el problema
2. Muestra el procedimiento paso a paso con fórmulas en LaTeX
3. Explica el razonamiento detrás de cada paso
4. Presenta la solución final claramente
5. Si aplica, muestra la gráfica con el formato chart
6. Ofrece verificación o ejercicios adicionales si es apropiado`;

let anthropicService: AnthropicService | null = null;

export function initAnthropicService(apiKey: string, model?: string) {
  anthropicService = new AnthropicService(apiKey, model);
  return anthropicService;
}

export function getAnthropicService(): AnthropicService {
  if (!anthropicService) {
    throw new Error('AnthropicService no inicializado.');
  }
  return anthropicService;
}
