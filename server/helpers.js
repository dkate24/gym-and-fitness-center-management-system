export function fail(status, message) {
  const error = new Error(message)
  error.status = status
  throw error
}

export function text(value, label, maxLength = 80) {
  if (typeof value !== 'string' || !value.trim() || value.trim().length > maxLength) {
    fail(400, `Please enter a valid ${label} (up to ${maxLength} characters).`)
  }
  return value.trim()
}

export async function readBody(request) {
  let raw = ''
  for await (const chunk of request) {
    raw += chunk
    if (raw.length > 64000) fail(413, 'This request is too large.')
  }
  try {
    const value = JSON.parse(raw)
    if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error()
    return value
  } catch {
    fail(400, 'Please send a valid JSON object.')
  }
}

