import { useState } from 'react'

export default function AuthPage({ onBack }) {
  const [signup, setSignup] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [message, setMessage] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    if (signup && !data.get('name').trim()) {
      setMessage('Please enter your name, using more than spaces.')
      return
    }
    if (signup && data.get('password') !== data.get('confirmPassword')) {
      setMessage('Passwords do not match. Please enter them again.')
      return
    }
    setMessage('Form validation passed. This is a frontend demo; no account was created or signed in.')
  }

  function switchForm(nextSignup) {
    setSignup(nextSignup)
    setMessage('')
    setShowPassword(false)
  }

  return (
    <main className="auth-page">
      <style>{`
.auth-demo { width: min(500px, calc(100% - 32px)); height: auto; margin-bottom: 32px; }
.auth-demo .auth-tabs { width: min(300px, 90%); box-shadow: none; gap: 8px; }
.auth-demo .auth-tabs button { flex: 1; min-height: 48px; border-radius: 30px; }
.auth-demo .auth-tabs button[aria-pressed='true'] { background: #165f56; color: #fff; }
.auth-note { padding: 0 24px; font-size: 14px; text-align: center; color: #555; }
.account-form { display: flex; flex-direction: column; gap: 16px; padding: 24px; text-align: left; }
.account-form label { display: flex; flex-direction: column; gap: 6px; font-size: 14px; }
.account-form .ele { width: 100%; height: 48px; padding: 0 16px; font-size: 16px; }
.account-form .ele::placeholder { color: #666; }
.account-form .password-toggle { flex-direction: row; align-items: center; gap: 8px; min-height: 32px; }
.account-form .clkbtn { align-self: center; background: #165f56; }
.form-message { min-height: 42px; font-size: 14px; color: #333; }
.auth-page:has(.auth-demo) { justify-content: flex-start; padding-top: 80px; }
.auth-demo :focus-visible { outline: 3px solid #165f56; outline-offset: 3px; }
`}</style>
      <button className="back-link" type="button" onClick={onBack}>&lt; Back to home</button>
      <header><h1 className="heading">GYM</h1></header>
      <div className="auth-container auth-demo">
        <div className="auth-tabs" aria-label="Account form">
          <button type="button" aria-pressed={!signup} onClick={() => switchForm(false)}>Login</button>
          <button type="button" aria-pressed={signup} onClick={() => switchForm(true)}>Signup</button>
        </div>
        <p className="auth-note">Frontend prototype. Do not enter a real password.</p>
        <form className="account-form" key={signup ? 'signup' : 'login'} onSubmit={handleSubmit} onChange={() => setMessage('')}>
          {signup && <label>Name<input className="ele" name="name" autoComplete="name" required maxLength={80} placeholder="Enter your name" /></label>}
          <label>Email<input className="ele" type="email" name="email" autoComplete="email" required placeholder="youremail@email.com" /></label>
          <label>Password<input className="ele" type={showPassword ? 'text' : 'password'} name="password" autoComplete={signup ? 'new-password' : 'current-password'} minLength={8} required placeholder="At least 8 characters" /></label>
          {signup && <label>Confirm password<input className="ele" type={showPassword ? 'text' : 'password'} name="confirmPassword" autoComplete="new-password" minLength={8} required placeholder="Re-enter your password" /></label>}
          <label className="password-toggle"><input type="checkbox" checked={showPassword} onChange={(event) => setShowPassword(event.target.checked)} /> Show passwords</label>
          <button className="clkbtn" type="submit">{signup ? 'Signup' : 'Login'}</button>
          <p className="form-message" role="status">{message}</p>
        </form>
      </div>
    </main>
  )
}
