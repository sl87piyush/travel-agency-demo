import { useState } from 'react'
import { CalendarDays, ChevronRight, CircleUserRound, Clock3, CreditCard, Download, Luggage, Mail, MapPin, Phone, ShieldCheck, TicketCheck, UserRound, UsersRound } from 'lucide-react'
import { Link, useSearchParams } from 'react-router-dom'
import SmartImage from '../components/SmartImage'
import { useApp } from '../context/AppContext'
import { formatCurrency, getPackage } from '../data/packages'

const formatDate = (value) => {
  if (!value) return 'Date to be confirmed'
  return new Intl.DateTimeFormat('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(`${value}T00:00:00`))
}

const addDays = (value, days) => {
  if (!value) return null
  const date = new Date(`${value}T00:00:00`)
  date.setDate(date.getDate() + days)
  return date.toISOString().slice(0, 10)
}

export default function Profile() {
  const { user, bookings, openAuth } = useApp()
  const [params] = useSearchParams()
  const [tab, setTab] = useState(params.get('tab') === 'profile' ? 'profile' : 'trips')

  if (!user) return <section className="page-section profile-page"><div className="container login-gate"><CircleUserRound /><p className="eyebrow">YOUR TRAVEL DESK</p><h1>Log in to see your trips.</h1><p>Your demo bookings, departure dates, traveler details and vouchers stay available on this device.</p><button className="button primary" onClick={() => openAuth()}>Log in to continue</button></div></section>

  return <section className="page-section profile-page"><div className="container">
    <header className="profile-header"><div className="profile-avatar">{(user.name || 'T').slice(0, 1).toUpperCase()}</div><div><p className="eyebrow">MY TRAVEL X MORE</p><h1>Welcome back, {user.name?.split(' ')[0] || 'Traveler'}.</h1><p>Everything you’ve booked and everything we need for your journey, in one place.</p></div></header>
    <div className="profile-shell"><aside className="profile-nav" aria-label="Profile sections"><button className={tab === 'trips' ? 'active' : ''} onClick={() => setTab('trips')}><TicketCheck /> My trips <span>{bookings.length}</span></button><button className={tab === 'profile' ? 'active' : ''} onClick={() => setTab('profile')}><UserRound /> Personal details</button><div className="profile-help"><ShieldCheck /><strong>Need help?</strong><p>Call the Jodhpur desk directly for changes or support.</p><a href="tel:+919782940402">+91 97829 40402</a></div></aside>
      <div className="profile-content">
        {tab === 'trips' && <Trips bookings={bookings} />}
        {tab === 'profile' && <PersonalDetails user={user} />}
      </div>
    </div>
  </div></section>
}

function Trips({ bookings }) {
  if (!bookings.length) return <div className="trips-empty"><Luggage /><h2>No trips booked yet.</h2><p>When you complete a demo booking, the itinerary, traveler information and voucher will appear here automatically.</p><Link className="button accent" to="/packages">Browse packages</Link></div>
  return <div><div className="profile-section-title"><div><p className="eyebrow">MY TRIPS</p><h2>Upcoming journeys</h2></div><span>{bookings.length} booking{bookings.length > 1 ? 's' : ''}</span></div><div className="trip-list">{bookings.map((booking) => <TripCard key={booking.bookingId || booking.paidAt} booking={booking} />)}</div></div>
}

function TripCard({ booking }) {
  const item = getPackage(booking.packageId)
  if (!item) return null
  const endDate = addDays(booking.lead?.date, item.durationDays - 1)
  const travelerCount = (booking.counts?.adults || 0) + (booking.counts?.children || 0)
  return <article className="trip-card">
    <div className="trip-card-image"><SmartImage src={item.images[0]} alt={item.title} /><span><i /> Confirmed</span></div>
    <div className="trip-card-main"><div className="trip-card-top"><div><p className="trip-code">{booking.bookingId}</p><h3>{item.title}</h3><p><MapPin /> {item.locations.join(' → ')}</p></div><span className="trip-duration"><Clock3 /> {item.durationDays}D / {item.durationNights}N</span></div>
      <div className="trip-facts"><div><CalendarDays /><span>Travel dates<strong>{formatDate(booking.lead?.date)} – {formatDate(endDate)}</strong></span></div><div><UsersRound /><span>Travelers<strong>{travelerCount} · {booking.counts?.adults || 0} adult{booking.counts?.adults === 1 ? '' : 's'}{booking.counts?.children ? ` · ${booking.counts.children} child` : ''}</strong></span></div><div><CreditCard /><span>Payment<strong>{formatCurrency(booking.total || 0)} · {booking.paymentMethod || 'Demo payment'}</strong></span></div></div>
      <div className="trip-card-actions"><Link className="button primary" to={`/packages/${item.id}`}>View full itinerary <ChevronRight /></Link><Link className="button secondary" to="/booking-confirmed"><Download /> View voucher</Link></div>
    </div>
  </article>
}

function PersonalDetails({ user }) {
  return <div><div className="profile-section-title"><div><p className="eyebrow">PERSONAL DETAILS</p><h2>Your booking contact</h2></div></div><div className="personal-card"><div><CircleUserRound /><span>Full name<strong>{user.name || 'Traveler'}</strong></span></div><div><Mail /><span>Email address<strong>{user.email || 'Not added'}</strong></span></div><div><Phone /><span>Phone number<strong>{user.phone || 'Not added'}</strong></span></div></div><p className="profile-note">These details are stored only in this browser for the demo. A production account would include verified contact details, saved travelers and secure preferences.</p></div>
}
