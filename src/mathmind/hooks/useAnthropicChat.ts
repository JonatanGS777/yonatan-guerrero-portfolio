import { useState, useCallback } from 'react';
import type { Message } from '../types';
import { MATH_TUTOR_PROMPT, initAnthropicService } from '../service';
import { API_CONFIG } from '../config';

const simulateResponse = async (userMessage: string): Promise<string> => {
  await new Promise(resolve => setTimeout(resolve, 1500));
  const responses = [
    `¡Hola! Veo que tienes una pregunta sobre matemáticas.\n\n**Tu mensaje:** ${userMessage}\n\nEste es el **modo demo**. Para obtener respuestas inteligentes de Claude, configura tu API key de Anthropic.\n\n**Ejemplo de ecuación cuadrática:**\n$$x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$$\n\n**Integral definida:**\n$$\\int_{a}^{b} f(x) \\, dx = F(b) - F(a)$$`,
    `¡Excelente pregunta!\n\nEstoy en **modo demostración**. Conecta tu API de Anthropic para recibir respuestas personalizadas.\n\n**La identidad de Euler:**\n$$e^{i\\pi} + 1 = 0$$`,
    `¡Gracias por tu mensaje!\n\n**Modo Demo activo**\n\n**Ejemplo de derivada:**\n\nSi $f(x) = x^2$, entonces:\n$$f'(x) = 2x$$`,
  ];
  return responses[Math.floor(Math.random() * responses.length)];
};

export function useAnthropicChat() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = useCallback(async (
    messages: Message[],
    onChunk?: (chunk: string) => void
  ): Promise<string> => {
    if (API_CONFIG.DEMO_MODE) {
      return simulateResponse(messages[messages.length - 1]?.content || '');
    }

    setIsLoading(true);
    setError(null);

    try {
      const service = initAnthropicService('', API_CONFIG.MODEL);

      if (onChunk) {
        let fullContent = '';
        for await (const chunk of service.streamMessage(messages, MATH_TUTOR_PROMPT)) {
          fullContent += chunk;
          onChunk(chunk);
        }
        setIsLoading(false);
        return fullContent;
      } else {
        const response = await service.sendMessage(messages, MATH_TUTOR_PROMPT);
        setIsLoading(false);
        return response;
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
      setError(errorMessage);
      setIsLoading(false);
      throw err;
    }
  }, []);

  return { sendMessage, isLoading, error, isDemoMode: API_CONFIG.DEMO_MODE };
}
