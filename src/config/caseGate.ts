/**
 * Client-side "soft" gate — a speed bump like Medium's paywall, not real
 * security. The password below is XOR+base64 obfuscated so it isn't a plain,
 * grep-able string in the source or the shipped JS bundle — anyone who
 * actually inspects this file or decodes the runtime value can still recover
 * it in seconds, this just stops it from being trivially visible at a glance.
 */
const OBFUSCATION_KEY = 'lucila';
const ENCODED_PASSWORD = 'AAAAEEERAwcXDwMNBRpOW1xTWg==';

function decode(encoded: string, key: string): string {
  const raw = atob(encoded);
  return Array.from(raw, (char, i) => String.fromCharCode(char.charCodeAt(0) ^ key.charCodeAt(i % key.length))).join('');
}

export const CASE_GATE_PASSWORD = decode(ENCODED_PASSWORD, OBFUSCATION_KEY);
export const CASE_GATE_SESSION_KEY = 'lucila-portfolio:case-unlocked';
