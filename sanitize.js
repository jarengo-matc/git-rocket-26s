const PROFANITY_LIST = [
  'ass', 'asshole', 'bastard', 'bitch', 'bollock', 'bollocks',
  'crap', 'cunt', 'damn', 'dick', 'douche', 'douchebag',
  'fag', 'fuck', 'goddamn', 'hell', 'jackass', 'jerk',
  'motherfucker', 'nigger', 'piss', 'prick', 'shit', 'slut',
  'twat', 'whore',
];

const MAX_LENGTH = 20;
const ALLOWED_PATTERN = /^[a-zA-Z0-9 _-]+$/;

/**
 * Sanitize and validate the -who input.
 * Returns { valid: true, value } or { valid: false, reason }.
 */
export function sanitizeWho(input) {
  if (input == null || typeof input !== 'string') {
    return { valid: false, reason: 'Name must be a non-empty string.' };
  }

  const trimmed = input.trim();

  if (trimmed.length === 0) {
    return { valid: false, reason: 'Name must be a non-empty string.' };
  }

  if (trimmed.length > MAX_LENGTH) {
    return { valid: false, reason: `Name must be ${MAX_LENGTH} characters or fewer.` };
  }

  if (!ALLOWED_PATTERN.test(trimmed)) {
    return { valid: false, reason: 'Name can only contain letters, numbers, spaces, hyphens, and underscores.' };
  }

  const lower = trimmed.toLowerCase();
  const words = lower.split(/[\s_-]+/);
  for (const word of PROFANITY_LIST) {
    if (words.some(w => w === word)) {
      return { valid: false, reason: 'Name contains inappropriate language.' };
    }
  }

  return { valid: true, value: trimmed };
}
