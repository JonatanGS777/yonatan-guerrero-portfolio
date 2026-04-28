// MathMind — translations (EN default, ES optional)

const en = {
  appName: 'MathMind',
  header: {
    themeLight: 'Light',
    themeDark: 'Dark',
    themeSystem: 'System',
  },
  sidebar: {
    newConversation: 'New conversation',
    noConversations: 'No conversations yet',
    delete: 'Delete',
    clearHistory: 'Clear history',
    clearConfirm: 'Sure? This cannot be undone.',
    clearYes: 'Yes, delete all',
    clearCancel: 'Cancel',
  },
  welcome: {
    tagline: 'Your intelligent mathematics tutor. Solve problems, understand concepts and master math with step-by-step explanations.',
    latexHint: 'Write formulas using LaTeX:',
    latexInline: 'for inline',
    latexBlock: 'for blocks',
    prompts: [
      { title: 'Solve equations', prompt: 'Solve the quadratic equation $2x^2 + 3x - 5 = 0$' },
      { title: 'Summations & series', prompt: 'Calculate the sum $$\\sum_{n=1}^{10} n^2$$' },
      { title: 'Differential calculus', prompt: 'Find the derivative of $f(x) = x^3 + 2x^2 - 5x + 1$' },
      { title: 'Integrals', prompt: 'Calculate the integral $$\\int_{0}^{\\pi} \\sin(x) \\, dx$$' },
    ],
  },
  chatMessage: {
    you: 'You',
    copy: 'Copy',
    copied: 'Copied',
    copiedToast: 'Copied to clipboard!',
    regenerate: 'Regenerate',
    newConversationTitle: 'New conversation',
  },
  chatInput: {
    placeholder: 'Type a message… Use $ for math formulas',
    hint: 'Press Enter to send, Shift + Enter for new line',
  },
  demoBanner: {
    title: 'Demo mode active.',
    body: 'Set up your Anthropic API key for intelligent responses.',
    cta: 'Get API key →',
  },
  errors: {
    auth: 'Invalid or missing API key. Check your configuration.',
    rateLimit: 'Too many requests. Please wait a moment and try again.',
    timeout: 'Request timed out. Check your connection and try again.',
    network: 'No internet connection. Check your network and try again.',
    server: 'Anthropic server error. Please try again in a moment.',
    generic: 'An error occurred. Please try again.',
  },
} as const;

const es = {
  appName: 'MathMind',
  header: {
    themeLight: 'Claro',
    themeDark: 'Oscuro',
    themeSystem: 'Sistema',
  },
  sidebar: {
    newConversation: 'Nueva conversación',
    noConversations: 'No hay conversaciones',
    delete: 'Eliminar',
    clearHistory: 'Limpiar historial',
    clearConfirm: '¿Seguro? Esto no se puede deshacer.',
    clearYes: 'Sí, borrar todo',
    clearCancel: 'Cancelar',
  },
  welcome: {
    tagline: 'Tu tutor de matemáticas inteligente. Resuelve problemas, entiende conceptos y domina las matemáticas con explicaciones paso a paso.',
    latexHint: 'Escribe fórmulas usando LaTeX:',
    latexInline: 'para inline',
    latexBlock: 'para bloques',
    prompts: [
      { title: 'Resolver ecuaciones', prompt: 'Resuelve la ecuación cuadrática $2x^2 + 3x - 5 = 0$' },
      { title: 'Sumatorias y series', prompt: 'Calcula la suma $$\\sum_{n=1}^{10} n^2$$' },
      { title: 'Cálculo diferencial', prompt: 'Encuentra la derivada de $f(x) = x^3 + 2x^2 - 5x + 1$' },
      { title: 'Integrales', prompt: 'Calcula la integral $$\\int_{0}^{\\pi} \\sin(x) \\, dx$$' },
    ],
  },
  chatMessage: {
    you: 'Tú',
    copy: 'Copiar',
    copied: 'Copiado',
    copiedToast: '¡Copiado al portapapeles!',
    regenerate: 'Regenerar',
    newConversationTitle: 'Nueva conversación',
  },
  chatInput: {
    placeholder: 'Escribe un mensaje… Usa $ para fórmulas matemáticas',
    hint: 'Presiona Enter para enviar, Shift + Enter para nueva línea',
  },
  demoBanner: {
    title: 'Modo Demo activo.',
    body: 'Configura tu API key de Anthropic para respuestas inteligentes.',
    cta: 'Obtener API key →',
  },
  errors: {
    auth: 'API key inválida o no configurada. Revisa tu configuración.',
    rateLimit: 'Demasiadas solicitudes. Espera un momento e intenta de nuevo.',
    timeout: 'La solicitud tardó demasiado. Verifica tu conexión e intenta de nuevo.',
    network: 'Sin conexión a internet. Verifica tu red e intenta de nuevo.',
    server: 'Error en el servidor de Anthropic. Intenta de nuevo en unos momentos.',
    generic: 'Ocurrió un error. Por favor, intenta de nuevo.',
  },
} as const;

export type Language = 'en' | 'es';
export const translations = { en, es } as const;

type Stringified<T> = T extends string
  ? string
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<Stringified<U>>
  : T extends object
  ? { readonly [K in keyof T]: Stringified<T[K]> }
  : T;

export type Translations = Stringified<typeof en>;
