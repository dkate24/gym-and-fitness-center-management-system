export async function api(path, options = {}) {
  let response
  try {
    response = await fetch(`/api${path}`, {
      ...options,
      headers: { 'Content-Type': 'application/json' },
      body: options.body === undefined ? undefined : JSON.stringify(options.body),
    })
  } catch {
    throw new Error('Cannot reach the server. Start the app with npm run dev and try again.')
  }

  const data = await response.json().catch(() => null)
  if (!response.ok || !data) {
    throw new Error(data?.message || 'The server could not complete this request. Please try again.')
  }
  return data
}
