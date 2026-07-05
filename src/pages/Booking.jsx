import { useState } from 'react'
import { ArrowRight, BedDouble, CalendarCheck, CarFront, CheckCircle2, MapPinned, Minus, Plane, Plus, ShieldCheck, Utensils } from 'lucide-react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import SmartImage from '../components/SmartImage'
import { formatCurrency, getPackage } from '../data/packages'
import { useApp } from '../context/AppContext'

export default function Booking() {
  const { id } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const item = getPackage(id)
  const { user, setBooking, openAuth } = useApp()
  const initial = location.state || { adults: 2, children: 0 }
  const [counts, setCounts] = useState({ adults: initial.adults || 2, children: initial.children || 0 })
  const [lead, setLead] = useState({ name: user?.name || '', email: user?.email || '', phone: user?.phone || '', requests: '', date: '' })
  const [travelers, setTravelers] = useState([])
  const [errors, setErrors] = useState({})
  const subtotal = item ? item.priceAdult * counts.adults + item.priceChild * counts.children : 0
  const groupDiscount = counts.adults + counts.children >= 6 ? Math.round(subtotal * 0.08) : 0
  const total = subtotal - groupDiscount
  const travelerSlots = Math.max(0, counts.adults + counts.children - 1)
  const hasKidsDiscount = item?.badges.some((b) => b.toLowerCase().includes('family') || b.toLowerCase().includes('kids')) && counts.children > 0

  const updateCount = (key, delta) => setCounts((current) => ({ ...current, [key]: Math.max(key === 'adults' ? 1 : 0, Math.min(12, current[key] + delta)) }))
  const setTraveler = (index, value) => { const next = [...travelers]; next[index] = value; setTravelers(next) }

  const continueToPayment = () => {
    const next = {}
    if (lead.name.trim().length < 2) next.name = 'Enter the lead traveler’s full name.'
    if (!/\S+@\S+\.\S+/.test(lead.email)) next.email = 'Enter a valid email address.'
    if (lead.phone.replace(/\D/g, '').length < 10) next.phone = 'Enter a valid 10-digit phone number.'
    if (!lead.date) next.date = 'Choose a preferred departure date.'
    setErrors(next)
    if (Object.keys(next).length) return
    const payload = { packageId: item.id, counts, lead, travelerNames: travelers.slice(0, travelerSlots).filter(Boolean), subtotal, groupDiscount, total }
    setBooking(payload)
    if (!user) openAuth(() => navigate('/payment'))
    else navigate('/payment')
  }

  if (!item) return null
  return <section className="page-section booking-page"><div className="container narrow-container">
    <div className="progress-steps" aria-label="Booking progress"><span className="active"><i>1</i>Traveler details</span><span><i>2</i>Simulated payment</span><span><i>3</i>Confirmed</span></div>
    <div className="booking-summary-top"><SmartImage src={item.images[0]} alt={item.title} /><div><p className="eyebrow">YOUR SELECTED JOURNEY</p><h1>{item.title}</h1><p>{item.locations.join(' → ')} · {item.durationDays}D/{item.durationNights}N</p></div><strong>{formatCurrency(item.priceAdult)}<small> / adult</small></strong></div>
    <div className="booking-layout"><div className="booking-form">
      <section className="form-card"><div className="form-card-head"><span>01</span><div><h2>Who’s traveling?</h2><p>Set the group size to calculate your live total.</p></div></div><div className="traveler-counts"><div><div><strong>Adults</strong><span>12 years and above</span></div><div className="stepper"><button onClick={() => updateCount('adults', -1)} aria-label="Remove adult"><Minus /></button><strong>{counts.adults}</strong><button onClick={() => updateCount('adults', 1)} aria-label="Add adult"><Plus /></button></div></div><div><div><strong>Children</strong><span>2–11 years</span></div><div className="stepper"><button onClick={() => updateCount('children', -1)} aria-label="Remove child"><Minus /></button><strong>{counts.children}</strong><button onClick={() => updateCount('children', 1)} aria-label="Add child"><Plus /></button></div></div></div>{hasKidsDiscount && <div className="discount-note"><CheckCircle2 /> Kids discount applied to this package.</div>}{groupDiscount > 0 && <div className="discount-note"><CheckCircle2 /> 8% demo group discount applied.</div>}</section>
      <section className="form-card"><div className="form-card-head"><span>02</span><div><h2>Lead traveler</h2><p>We’ll use these details for your voucher and follow-up.</p></div></div><div className="form-grid"><Field label="Full name" required value={lead.name} error={errors.name} onChange={(v) => setLead({ ...lead, name: v })} autoComplete="name" /><Field label="Email address" type="email" required value={lead.email} error={errors.email} onChange={(v) => setLead({ ...lead, email: v })} autoComplete="email" /><Field label="Phone number" type="tel" required value={lead.phone} error={errors.phone} onChange={(v) => setLead({ ...lead, phone: v })} autoComplete="tel" /><Field label="Preferred departure" type="date" required value={lead.date} error={errors.date} onChange={(v) => setLead({ ...lead, date: v })} /></div></section>
      {travelerSlots > 0 && <section className="form-card"><div className="form-card-head"><span>03</span><div><h2>Other travelers</h2><p>Names are optional for the demo and can be confirmed later.</p></div></div><div className="form-grid">{Array.from({ length: travelerSlots }).map((_, index) => <Field key={index} label={`Traveler ${index + 2} name`} value={travelers[index] || ''} onChange={(v) => setTraveler(index, v)} />)}</div></section>}
      <section className="form-card"><div className="form-card-head"><span>04</span><div><h2>Anything we should know?</h2><p>Dietary, mobility, room or celebration notes.</p></div></div><label className="field"><span>Special requests</span><textarea value={lead.requests} onChange={(e) => setLead({ ...lead, requests: e.target.value })} rows="4" placeholder="Optional" /></label></section>
      <section className="form-card package-review-card"><div className="form-card-head"><span>05</span><div><h2>Review package</h2><p>Everything included in the route before you continue.</p></div></div><div className="review-feature-strip"><span><Plane /> Arrival planning</span><span><CarFront /> Private transfers</span><span><BedDouble /> {item.durationNights} hotel nights</span><span><MapPinned /> Guided activities</span><span><Utensils /> Daily breakfast</span></div><div className="review-days">{item.itinerary.map((day) => <div key={day.day}><strong>Day {day.day}</strong><span>{day.title}</span><small>{item.locations[Math.min(day.day - 1, item.locations.length - 1)]}</small></div>)}</div></section>
    </div><aside className="price-card"><p className="eyebrow">PRICE SUMMARY</p><div><span>{counts.adults} adult{counts.adults > 1 ? 's' : ''}</span><strong>{formatCurrency(item.priceAdult * counts.adults)}</strong></div>{counts.children > 0 && <div><span>{counts.children} child{counts.children > 1 ? 'ren' : ''}</span><strong>{formatCurrency(item.priceChild * counts.children)}</strong></div>}{groupDiscount > 0 && <div className="discount-line"><span>Group discount</span><strong>−{formatCurrency(groupDiscount)}</strong></div>}<div><span>Taxes & booking fees</span><strong>Included</strong></div><div className="price-total"><span>Grand total</span><strong>{formatCurrency(total)}</strong></div><div className="price-assurance"><CalendarCheck /> Free demo cancellation for 24 hours</div><button className="button accent w-full" onClick={continueToPayment}>Continue to payment <ArrowRight /></button><p><ShieldCheck /> Secure demo flow. No real payment yet.</p></aside></div>
  </div></section>
}

function Field({ label, required, error, onChange, value, type = 'text', autoComplete }) {
  return <label className="field"><span>{label}{required && ' *'}</span><input type={type} value={value} autoComplete={autoComplete} onChange={(e) => onChange(e.target.value)} aria-invalid={Boolean(error)} />{error && <small role="alert">{error}</small>}</label>
}
