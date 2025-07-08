export type SecureWordEntry = {
  username: string;
  secureWord: string;
  issuedAt: number;
  lastRequestedAt: number;
};

export type MfaEntry = {
  code: string;
  attempts: number;
};

export const secureWordStore = new Map<string, SecureWordEntry>();
export const mfaStore = new Map<string, MfaEntry>();
