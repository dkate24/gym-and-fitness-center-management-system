import { randomUUID } from 'node:crypto'
import { fail, text, readBody } from '../helpers.js'

export async function memberRoutes(route, records) {
  const { request, path, send } = route
  const method = request.method
  const { readRecords, saveRecords } = records

  const { today } = records

  function trainerId(value) {
    if (value === '' || value === null) return null
    if (typeof value !== 'string' || !readRecords('trainers').some((trainer) => trainer.id === value)) {
      fail(400, 'Choose an existing trainer or Unassigned.')
    }
    return value
  }

  function feeStatus(value) {
    if (!['Paid', 'Pending'].includes(value)) fail(400, 'Fee status must be Paid or Pending.')
    return value
  }

  if (method === 'POST' && path === '/api/members') {
    const body = await readBody(request)
    const member = {
      id: randomUUID(),
      name: text(body.name, 'name'),
      phone: text(body.phone, 'phone number', 20),
      trainerId: trainerId(body.trainerId),
      feeStatus: feeStatus(body.feeStatus),
      attendanceDates: [],
    }
    saveRecords('members', [...readRecords('members'), member])
    send(201, member)
    return true
  }

  const memberMatch = path.match(/^\/api\/members\/([^/]+)$/)
  if (memberMatch && ['PATCH', 'DELETE'].includes(method)) {
    const members = readRecords('members')
    const member = members.find((item) => item.id === memberMatch[1])
    if (!member) fail(404, 'Member not found. Reload the records and try again.')

    if (method === 'DELETE') {
      saveRecords('members', members.filter((item) => item.id !== member.id))
      send(200, { message: 'Member removed.' })
      return true
    }

    const body = await readBody(request)
    const updated = { ...member }
    if ('trainerId' in body) updated.trainerId = trainerId(body.trainerId)
    if ('feeStatus' in body) updated.feeStatus = feeStatus(body.feeStatus)
    if ('present' in body) {
      if (typeof body.present !== 'boolean') fail(400, 'Attendance must be true or false.')
      const dates = member.attendanceDates.filter((date) => date !== today())
      updated.attendanceDates = body.present ? [...dates, today()] : dates
    }
    saveRecords('members', members.map((item) => item.id === member.id ? updated : item))
    send(200, updated)
    return true
  }

  return false
}
