/**
 * Client-side AES-256-GCM encryption using Web Crypto API.
 * No external dependencies — uses browser-native SubtleCrypto.
 */

export async function generateKey(): Promise<CryptoKey> {
  return crypto.subtle.generateKey(
    { name: 'AES-GCM', length: 256 },
    true,
    ['encrypt', 'decrypt']
  )
}

export async function exportKey(key: CryptoKey): Promise<string> {
  const raw = await crypto.subtle.exportKey('raw', key)
  return btoa(String.fromCharCode(...new Uint8Array(raw)))
}

export async function encryptFile(
  file: File,
  key: CryptoKey
): Promise<{ blob: Blob; iv: Uint8Array }> {
  const iv = crypto.getRandomValues(new Uint8Array(12))
  const fileBuffer = await file.arrayBuffer()

  const encrypted = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    key,
    fileBuffer
  )

  return {
    blob: new Blob([encrypted], { type: 'application/octet-stream' }),
    iv,
  }
}

export function ivToBase64(iv: Uint8Array): string {
  return btoa(String.fromCharCode(...iv))
}
