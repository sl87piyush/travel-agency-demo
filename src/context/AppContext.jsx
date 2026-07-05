import { createContext, useContext, useEffect, useRef, useState } from 'react'

const AppContext = createContext(null)

const readStorage = (key, fallback = null) => {
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback } catch { return fallback }
}

export function AppProvider({ children }) {
  const [user, setUser] = useState(() => readStorage('txm_user'))
  const [booking, setBooking] = useState(() => readStorage('txm_booking'))
  const [lastBooking, setLastBooking] = useState(() => readStorage('txm_last_booking'))
  const [bookings, setBookings] = useState(() => {
    const saved = readStorage('txm_bookings', [])
    const legacy = readStorage('txm_last_booking')
    return saved.length ? saved : legacy ? [legacy] : []
  })
  const [authOpen, setAuthOpen] = useState(false)
  const [toast, setToast] = useState(null)
  const afterAuth = useRef(null)

  useEffect(() => {
    if (user) localStorage.setItem('txm_user', JSON.stringify(user))
    else localStorage.removeItem('txm_user')
  }, [user])

  useEffect(() => {
    if (booking) localStorage.setItem('txm_booking', JSON.stringify(booking))
  }, [booking])

  useEffect(() => {
    if (lastBooking) localStorage.setItem('txm_last_booking', JSON.stringify(lastBooking))
  }, [lastBooking])

  useEffect(() => {
    localStorage.setItem('txm_bookings', JSON.stringify(bookings))
  }, [bookings])

  const notify = (message, tone = 'success') => {
    setToast({ message, tone, id: Date.now() })
    window.setTimeout(() => setToast(null), 4000)
  }

  const openAuth = (callback) => {
    afterAuth.current = typeof callback === 'function' ? callback : null
    setAuthOpen(true)
  }

  const login = (mockUser) => {
    setUser(mockUser)
    setAuthOpen(false)
    notify(`Welcome${mockUser.name ? `, ${mockUser.name.split(' ')[0]}` : ''}. Your trip is ready.`)
    const callback = afterAuth.current
    afterAuth.current = null
    if (callback) window.setTimeout(callback, 0)
  }

  const logout = () => {
    setUser(null)
    notify('You have been logged out.', 'neutral')
  }

  const completeBooking = (payload) => {
    setLastBooking(payload)
    setBooking(payload)
    setBookings((current) => {
      const withoutDuplicate = current.filter((item) => item.bookingId !== payload.bookingId)
      return [payload, ...withoutDuplicate]
    })
  }

  const value = {
    user, booking, lastBooking, bookings, authOpen, toast,
    setBooking, setAuthOpen, openAuth, login, logout, notify, completeBooking,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export const useApp = () => useContext(AppContext)
