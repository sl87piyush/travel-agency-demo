import { useEffect, useRef, useState } from 'react'
import { X } from 'lucide-react'
import { useApp } from '../context/AppContext'

const validEmail = (value) => /\S+@\S+\.\S+/.test(value)
const validPhone = (value) => value.replace(/\D/g, '').length >= 10

export default function AuthModal() {
  const { authOpen, setAuthOpen, login } = useApp()
  const [mode, setMode] = useState('login')
  const [values, setValues] = useState({ name: '', identity: '', email: '', phone: '', password: '' })
  const [errors, setErrors] = useState({})
  const closeRef = useRef(null)

  useEffect(() => {
    if (!authOpen) return undefined
    closeRef.current?.focus()
    const onKey = (event) => event.key === 'Escape' && setAuthOpen(false)
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = '' }
  }, [authOpen, setAuthOpen])

  if (!authOpen) return null

  const submit = (event) => {
    event.preventDefault()
    const next = {}
    if (mode === 'signup' && values.name.trim().length < 2) next.name = 'Enter your full name.'
    if (mode === 'login' && !(validEmail(values.identity) || validPhone(values.identity))) next.identity = 'Enter a valid email or 10-digit phone number.'
    if (mode === 'signup' && !validEmail(values.email)) next.email = 'Enter a valid email address.'
    if (mode === 'signup' && !validPhone(values.phone)) next.phone = 'Enter a valid 10-digit phone number.'
    if (values.password.length < 4) next.password = 'Use at least 4 characters for this demo.'
    setErrors(next)
    if (Object.keys(next).length) return
    login({ name: values.name || 'Traveler', email: values.email || values.identity, phone: values.phone || values.identity })
  }

  const field = (key, label, type = 'text', autoComplete) => (
    <label className="field">
      <span>{label}</span>
      <input type={type} value={values[key]} autoComplete={autoComplete} onChange={(e) => setValues({ ...values, [key]: e.target.value })} aria-invalid={Boolean(errors[key])} />
      {errors[key] && <small role="alert">{errors[key]}</small>}
    </label>
  )

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={(e) => e.target === e.currentTarget && setAuthOpen(false)}>
      <section className="auth-modal" role="dialog" aria-modal="true" aria-labelledby="auth-title">
        <button ref={closeRef} className="icon-button close-button" onClick={() => setAuthOpen(false)} aria-label="Close login dialog"><X /></button>
        <p className="eyebrow">TRAVEL X MORE MEMBER</p>
        <h2 id="auth-title">Your plans, saved for take-off.</h2>
        <div className="tabs" role="tablist" aria-label="Authentication mode">
          {['login', 'signup'].map((tab) => <button key={tab} role="tab" aria-selected={mode === tab} className={mode === tab ? 'active' : ''} onClick={() => { setMode(tab); setErrors({}) }}>{tab === 'login' ? 'Log in' : 'Sign up'}</button>)}
        </div>
        <form onSubmit={submit} noValidate>
          {mode === 'login' ? field('identity', 'Email or phone', 'text', 'username') : <>{field('name', 'Full name', 'text', 'name')}{field('email', 'Email address', 'email', 'email')}{field('phone', 'Phone number', 'tel', 'tel')}</>}
          {field('password', 'Password', 'password', mode === 'login' ? 'current-password' : 'new-password')}
          <button className="button primary w-full" type="submit">{mode === 'login' ? 'Log in securely' : 'Create demo account'}</button>
          <button className="button text-button w-full" type="button" onClick={() => setAuthOpen(false)}>Continue as guest</button>
        </form>
        <p className="modal-note">Demo only — no account is created and nothing leaves this browser.</p>
      </section>
    </div>
  )
}
