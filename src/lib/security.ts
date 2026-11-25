/**
 * T.I.M.E FITS ATELIER - DEFENSIVE SECURITY & SANITIZATION ENGINE
 * 
 * Provides defense-in-depth protection across:
 * 1. Image Magic-Byte Verification (Zero trust in client-sent Content-Type)
 * 2. Polyglot & Steganographic Script Detection (Scans for embedded <script>, SVG payloads, PHP/eval markers)
 * 3. File Extension & Path Traversal Normalization
 * 4. User Input Sanitization & HTML/SQL Defenses
 */

export interface ImageValidationResult {
  isValid: boolean;
  detectedMime: string | null;
  detectedExt: string | null;
  error?: string;
}

// Canonical Magic Bytes (File Signatures)
const MAGIC_SIGNATURES = [
  {
    mime: 'image/jpeg',
    ext: 'jpg',
    matches: (b: Buffer) => b.length >= 3 && b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff,
  },
  {
    mime: 'image/png',
    ext: 'png',
    matches: (b: Buffer) =>
      b.length >= 8 &&
      b[0] === 0x89 &&
      b[1] === 0x50 &&
      b[2] === 0x4e &&
      b[3] === 0x47 &&
      b[4] === 0x0d &&
      b[5] === 0x0a &&
      b[6] === 0x1a &&
      b[7] === 0x0a,
  },
  {
    mime: 'image/webp',
    ext: 'webp',
    matches: (b: Buffer) =>
      b.length >= 12 &&
      b[0] === 0x52 &&
      b[1] === 0x49 &&
      b[2] === 0x46 &&
      b[3] === 0x46 && // RIFF
      b[8] === 0x57 &&
      b[9] === 0x45 &&
      b[10] === 0x42 &&
      b[11] === 0x50, // WEBP
  },
  {
    mime: 'image/gif',
    ext: 'gif',
    matches: (b: Buffer) =>
      b.length >= 6 &&
      b[0] === 0x47 &&
      b[1] === 0x49 &&
      b[2] === 0x46 &&
      b[3] === 0x38 &&
      (b[4] === 0x37 || b[4] === 0x39) &&
      b[5] === 0x61, // GIF87a or GIF89a
  },
  {
    mime: 'image/avif',
    ext: 'avif',
    matches: (b: Buffer) => {
      if (b.length < 12) return false;
      const sub = b.subarray(4, 12).toString('latin1');
      return sub.includes('ftypavif') || sub.includes('ftypavis');
    },
  },
];

// Dangerous byte sequence markers embedded in polyglot files or image metadata
const MALICIOUS_PATTERNS = [
  /<\s*script/i,
  /<\s*\/\s*script/i,
  /javascript\s*:/i,
  /<\s*svg/i,
  /<\s*iframe/i,
  /<\s*object/i,
  /<\s*embed/i,
  /<\s*form/i,
  /<\s*\?\s*php/i,
  /<\s*%/i,
  /data\s*:\s*text\/html/i,
  /onload\s*=/i,
  /onerror\s*=/i,
  /onclick\s*=/i,
  /onmouseover\s*=/i,
  /base64\s*,\s*PHNjcmlwdA/i, // base64 encoded "<script"
];

/**
 * Validates raw image buffer against real magic byte signatures and scans
 * for embedded scripts / HTML polyglots commonly hidden inside EXIF/IPTC comments.
 */
export function validateImageBuffer(buffer: Buffer): ImageValidationResult {
  if (!buffer || buffer.length === 0) {
    return { isValid: false, detectedMime: null, detectedExt: null, error: 'Empty file buffer.' };
  }

  // 1. Check Magic Bytes
  let matchedSignature = null;
  for (const sig of MAGIC_SIGNATURES) {
    if (sig.matches(buffer)) {
      matchedSignature = sig;
      break;
    }
  }

  if (!matchedSignature) {
    return {
      isValid: false,
      detectedMime: null,
      detectedExt: null,
      error: 'File does not match valid image signatures (JPEG, PNG, WebP, GIF, AVIF). Executable and SVG formats are strictly forbidden.',
    };
  }

  // 2. Scan for script polyglots in the byte stream
  // Polyglots hide executable ASCII/UTF-8 code inside comment segments or EXIF headers
  const textRepresentation = buffer.toString('latin1');
  for (const pattern of MALICIOUS_PATTERNS) {
    if (pattern.test(textRepresentation)) {
      return {
        isValid: false,
        detectedMime: matchedSignature.mime,
        detectedExt: matchedSignature.ext,
        error: 'Security violation: Suspicious executable code or script tags detected embedded within image bytes.',
      };
    }
  }

  return {
    isValid: true,
    detectedMime: matchedSignature.mime,
    detectedExt: matchedSignature.ext,
  };
}

/**
 * Normalizes and secures file names:
 * Prevents Directory Traversal (../, ..\), null byte injections (%00), and invalid extensions.
 */
export function generateSafeFileName(originalName: string, canonicalExt: string): string {
  const baseName = originalName
    .replace(/^.*[\\/]/, '') // Strip paths
    .replace(/\0/g, '') // Strip null bytes
    .replace(/[^a-zA-Z0-9_-]/g, '_') // Strip dangerous chars
    .substring(0, 32);

  const timestamp = Date.now();
  const entropy = Math.random().toString(36).substring(2, 8);
  return `${timestamp}-${entropy}-${baseName}.${canonicalExt}`;
}

/**
 * Sanitizes generic user input (names, addresses, queries, search terms)
 * Strips HTML tags, trims control characters, and escapes dangerous entities.
 */
export function sanitizeTextInput(input: unknown): string {
  if (typeof input !== 'string') return '';

  return input
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '') // Strip ASCII control characters
    .replace(/<[^>]*>?/gm, '') // Strip HTML tags
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .trim();
}

/**
 * Strict Email Validator (RFC 5322 compliant subset)
 */
export function isValidEmail(email: string): boolean {
  if (!email || email.length > 254) return false;
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  return emailRegex.test(email);
}
