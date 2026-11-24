import { randomUUID } from 'node:crypto'
import { fail, text, readBody } from '../helpers.js'

function accountDetails(body) {
  const email = text(body.email, 'email', 120).toLowerCase()
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) fail(400, 'Please enter a valid email address.')
  if (typeof body.password !== 'string' || body.password.length < 8 || body.password.length > 100) {
    fail(400, 'Use a password between 8 and 100 characters.')
  }
  return { email, password: body.password }
}

export async function authRoutes(route, records) {
  const { request, path, send } = route
  const method = request.method
  const { readRecords, saveRecords } = records

  if (method === 'POST' && path === '/api/login') {
    const credentials = accountDetails(await readBody(request))
    const user = readRecords('users').find((item) => item.email === credentials.email && item.password === credentials.password)
    if (!user) fail(401, 'Email or password is incorrect.')
    send(200, { id: user.id, name: user.name, email: user.email })
    return true
  }

  if (method === 'POST' && path === '/api/signup') {
    const body = await readBody(request)
    const credentials = accountDetails(body)
    const name = text(body.name, 'name')
    const users = readRecords('users')
    if (users.some((user) => user.email === credentials.email)) fail(409, 'An account with this email already exists. Please log in.')
    const user = { id: randomUUID(), name, ...credentials }
    saveRecords('users', [...users, user])
    send(201, { id: user.id, name: user.name, email: user.email })
    return true
  }

  return false
}
