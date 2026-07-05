import { ArrowRight, Check, Home, Printer, UserRound } from 'lucide-react'
import { Link, Navigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { formatCurrency, getPackage } from '../data/packages'

export default function Confirmation() {
  const { lastBooking } = useApp()
  const item = getPackage(lastBooking?.packageId)
  if (!lastBooking || !item) return <Navigate to="/packages" replace />
  const names = [lastBooking.lead.name, ...(lastBooking.travelerNames || [])].join(', ')
  const routeCode = item.locations.length > 1 ? `${item.locations[0].slice(0, 3).toUpperCase()} → ${item.locations.at(-1).slice(0, 3).toUpperCase()}` : item.locations[0].slice(0, 3).toUpperCase()

  return <section className="confirmation-page"><div className="container confirmation-shell">
    <div className="confirmation-heading"><span className="success-orbit"><Check /></span><p className="eyebrow">BOOKING CONFIRMED</p><h1>Your next chapter has a departure date.</h1><p>Your itinerary, traveler details, payment summary and voucher are now saved in My Trips. You only need to contact us if you want a change.</p></div>
    <article className="boarding-pass">
      <div className="pass-main">
        <div className="pass-brand"><span>TRAVEL X MORE</span><small>JODHPUR · INDIA</small></div>
        <div className="pass-route"><div><small>ROUTE</small><strong>{routeCode}</strong></div><span className="route-line"><i /><i /><i /></span><div className="text-right"><small>DURATION</small><strong>{item.durationDays}D / {item.durationNights}N</strong></div></div>
        <h2>{item.title}</h2>
        <div className="pass-fields"><div><small>LEAD TRAVELER</small><strong>{lastBooking.lead.name}</strong></div><div><small>DEPARTURE</small><strong>{lastBooking.lead.date}</strong></div><div><small>TRAVELERS</small><strong>{lastBooking.counts.adults + lastBooking.counts.children}</strong></div><div><small>PAYMENT</small><strong>{lastBooking.paymentMethod}</strong></div></div>
        {names && <p className="pass-names"><small>TRAVELER NAMES</small>{names}</p>}
      </div>
      <div className="pass-stub">
        <span className="stub-label">BOOKING CODE</span><strong className="booking-code">{lastBooking.bookingId}</strong><div className="barcode" aria-label="Decorative barcode" /><div className="stub-amount"><small>DEMO AMOUNT PAID</small><strong>{formatCurrency(lastBooking.total)}</strong></div><span className="stub-status"><Check /> CONFIRMED</span>
      </div>
    </article>
    <div className="confirmation-actions"><Link className="button primary" to="/profile?tab=trips"><UserRound /> Open My Trips</Link><button className="button secondary" onClick={() => window.print()}><Printer /> Download voucher</button><Link className="button secondary" to="/"><Home /> Home</Link><Link className="text-link" to="/packages">Browse more <ArrowRight /></Link></div>
    <div className="next-steps"><h2>Everything stays organised.</h2><div><article><span>01</span><h3>Review anytime</h3><p>Dates, travelers, route and payment status remain visible in My Trips.</p></article><article><span>02</span><h3>Keep the voucher</h3><p>Open or print the booking voucher whenever you need it.</p></article><article><span>03</span><h3>Travel with support</h3><p>The Jodhpur team is available when you want help—no message is required to keep the booking.</p></article></div></div>
  </div></section>
}
