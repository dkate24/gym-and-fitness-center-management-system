import { createServer as createViteServer } from 'vite'
import { createApiServer } from '../server/server.js'

const api = createApiServer()
let vite

async function stop() {
  await vite?.close()
  api.close()
}

try {
  await new Promise((resolve, reject) => {
    api.once('error', reject)
    api.listen(3001, '127.0.0.1', resolve)
  })
  console.log('JSON server running at http://127.0.0.1:3001')
  vite = await createViteServer()
  await vite.listen()
  vite.printUrls()
  process.once('SIGINT', stop)
  process.once('SIGTERM', stop)
} catch (error) {
  console.error('Could not start the app:', error.message)
  await stop()
  process.exitCode = 1
}
