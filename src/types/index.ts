export interface IFormMethods {
    validate: () => Promise<{ valid: boolean }>;
    reset: () => void;
  }
