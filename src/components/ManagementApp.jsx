import { useEffect, useState } from 'react'
import { api } from '../api'
import Dashboard from './Dashboard'
import MembersPage from './MembersPage'
import TrainersPage from './TrainersPage'
import './Management.css'

export default function ManagementApp({ user, onLogout }) {
  const [page, setPage] = useState('Dashboard')
  const [records, setRecords] = useState(null)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    let active = true
    api('/records').then((data) => {
      if (active) setRecords(data)
    }).catch((failure) => {
      if (active) setError(failure.message)
    })
    return () => { active = false }
  }, [])

  async function reload() {
    setError('')
    try {
      setRecords(await api('/records'))
    } catch (failure) {
      setError(failure.message)
    }
  }

  async function change(path, options, successMessage) {
    setSaving(true)
    setError('')
    setMessage('')
    try {
      await api(path, options)
      setRecords(await api('/records'))
      setMessage(successMessage)
      return true
    } catch (failure) {
      setError(failure.message)
      return false
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="management">
      <header className="management-header">
        <div className="management-width management-topbar">
          <span className="management-brand">GYM <span>Management</span></span>
          <div className="account-actions"><span>{user.name}</span><button type="button" onClick={onLogout}>Logout</button></div>
        </div>
      </header>
      <nav className="management-nav" aria-label="Management navigation">
        <div className="management-width">
          {['Dashboard', 'Members', 'Trainers'].map((item) => (
            <button key={item} type="button" aria-current={page === item ? 'page' : undefined} onClick={() => { setPage(item); setMessage('') }}>{item}</button>
          ))}
        </div>
      </nav>
      <main className="management-width management-main">
        {error && <div className="management-error" role="alert">{error} <button type="button" onClick={reload}>Reload records</button></div>}
        <p className="management-status" role="status">{saving ? 'Saving changes…' : message}</p>
        {!records && !error && <p>Loading records…</p>}
        {records && page === 'Dashboard' && <Dashboard records={records} onNavigate={setPage} />}
        {records && page === 'Members' && <MembersPage {...records} saving={saving} onChange={change} />}
        {records && page === 'Trainers' && <TrainersPage trainers={records.trainers} members={records.members} saving={saving} onChange={change} />}
      </main>
    </div>
  )
}
