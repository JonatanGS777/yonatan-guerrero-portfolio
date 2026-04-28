export const API_CONFIG = {
  MODEL: import.meta.env.VITE_ANTHROPIC_MODEL || 'claude-haiku-4-5-20251001',
  MAX_TOKENS: 4096,
  DEMO_MODE: import.meta.env.VITE_DEMO_MODE === 'true',
};
