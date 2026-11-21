import { createServer } from 'node:http'
import { readFileSync, writeFileSync, renameSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { join } from 'node:path'
import { authRoutes } from './routes/auth.js'
import { trainerRoutes } from './routes/trainers.js'
import { memberRoutes } from './routes/members.js'

const defaultDataDirectory = fileURLToPath(new URL('./data/', import.meta.url))

export function createApiServer({ dataDirectory = defaultDataDirectory } = {}) {
  // Synchronous reads and writes keep these small demo updates in order.
  function readRecords(name) {
    const records = JSON.parse(readFileSync(join(dataDirectory, `${name}.json`), 'utf8'))
    if (!Array.isArray(records)) throw new Error(`Invalid ${name} records`)
    return records
  }

  function saveRecords(name, records) {
    const filename = join(dataDirectory, `${name}.json`)
    // Replace the file only after the entire new JSON document has been written.
    writeFileSync(`${filename}.tmp`, `${JSON.stringify(records, null, 2)}\n`)
    renameSync(`${filename}.tmp`, filename)
  }

  function today() {
    return new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Kolkata' })
  }

  return createServer(async (request, response) => {
    function send(status, data) {
      response.writeHead(status, { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' })
      response.end(JSON.stringify(data))
    }

    try {
      const path = new URL(request.url, 'http://localhost').pathname
      const method = request.method

      if (method === 'GET' && path === '/api/records') {
        send(200, { members: readRecords('members'), trainers: readRecords('trainers'), today: today() })
        return
      }

      const route = { request, path, send }
      const records = { readRecords, saveRecords, today }
      if (await authRoutes(route, records)) return
      if (await trainerRoutes(route, records)) return
      if (await memberRoutes(route, records)) return

      send(404, { message: 'API endpoint not found.' })
    } catch (error) {
      if (!error.status) console.error('JSON server:', error.message)
      send(error.status || 500, { message: error.status ? error.message : 'Could not read or save the JSON records. Check the server terminal and try again.' })
    }
  })
}
