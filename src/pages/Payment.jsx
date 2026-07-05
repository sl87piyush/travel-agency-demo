import { useMemo, useState } from 'react'
import { Building2, CheckCircle2, CreditCard, Landmark, LockKeyhole, QrCode, ShieldCheck } from 'lucide-react'
import { Navigate, useNavigate } from 'react-router-dom'
import SmartImage from '../components/SmartImage'
import { formatCurrency, getPackage } from '../data/packages'
import { useApp } from '../context/AppContext'

const methods = [{ id: 'card', label: 'Card', icon: CreditCard }, { id: 'upi', label: 'UPI', icon: QrCode }, { id: 'bank', label: 'Net Banking', icon: Landmark }]

export default function Payment() {
  const { booking, completeBooking } = useApp()
  const navigate = useNavigate()
  const [method, setMethod] = useState('card')
  const [card, setCard] = useState({ number: '', expiry: '', cvv: '', name: '' })
  const [upi, setUpi] = useState('')
  const [bank, setBank] = useState('')
  const [error, setError] = useState('')
  const [processing, setProcessing] = useState(false)
  const item = getPackage(booking?.packageId)

  const formatCard = (value) => value.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim()
  const formatExpiry = (value) => { const digits = value.replace(/\D/g, '').slice(0, 4); return digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits }
  const valid = useMemo(() => method === 'card' ? card.number.replaceAll(' ', '').length === 16 && /^\d{2}\/\d{2}$/.test(card.expiry) && card.cvv.length === 3 && card.name.trim().length > 2 : method === 'upi' ? /^[\w.-]+@[\w.-]+$/.test(upi) : Boolean(bank), [method, card, upi, bank])

  if (!booking || !item) return <Navigate to="/packages" replace />

  const pay = () => {
    if (!valid) { setError('Complete the selected demo payment details to continue.'); return }
    setError(''); setProcessing(true)
    window.setTimeout(() => {
      const code = `TXM-${new Date().getFullYear()}-${Math.random().toString(36).slice(2, 7).toUpperCase()}`
      completeBooking({ ...booking, status: 'confirmed', bookingId: code, paymentMethod: methods.find((m) => m.id === method).label, paidAt: new Date().toISOString() })
      navigate('/booking-confirmed')
    }, 2000)
  }

  return <section className="page-section payment-page"><div className="container narrow-container">
    <div className="progress-steps" aria-label="Booking progress"><span className="done"><i>✓</i>Traveler details</span><span className="active"><i>2</i>Simulated payment</span><span><i>3</i>Confirmed</span></div>
    <div className="payment-header"><div><p className="eyebrow">SIMULATED CHECKOUT</p><h1>Complete your demo booking.</h1><p>No charge will be made. Payment details remain only in this component and are never stored or sent.</p></div><div className="demo-chip"><LockKeyhole /> DEMO MODE</div></div>
    <div className="payment-layout"><div className="payment-card"><div className="payment-tabs" role="tablist">{methods.map(({ id, label, icon: Icon }) => <button key={id} role="tab" aria-selected={method === id} className={method === id ? 'active' : ''} onClick={() => { setMethod(id); setError('') }}><Icon />{label}</button>)}</div>
      {method === 'card' && <div className="payment-fields"><label className="field full"><span>Card number</span><input inputMode="numeric" autoComplete="off" value={card.number} onChange={(e) => setCard({ ...card, number: formatCard(e.target.value) })} placeholder="4242 4242 4242 4242" /></label><label className="field full"><span>Cardholder name</span><input autoComplete="off" value={card.name} onChange={(e) => setCard({ ...card, name: e.target.value })} /></label><label className="field"><span>Expiry</span><input inputMode="numeric" autoComplete="off" value={card.expiry} onChange={(e) => setCard({ ...card, expiry: formatExpiry(e.target.value) })} placeholder="MM/YY" /></label><label className="field"><span>CVV</span><input inputMode="numeric" type="password" autoComplete="off" value={card.cvv} onChange={(e) => setCard({ ...card, cvv: e.target.value.replace(/\D/g, '').slice(0, 3) })} placeholder="123" /></label></div>}
      {method === 'upi' && <div className="upi-panel"><div className="qr-placeholder"><QrCode /><span>DEMO QR</span></div><label className="field"><span>UPI ID</span><input value={upi} onChange={(e) => setUpi(e.target.value)} placeholder="name@bank" autoComplete="off" /><small className="helper">Use any validly formatted ID for this simulation.</small></label></div>}
      {method === 'bank' && <div className="bank-panel"><Building2 /><label className="field"><span>Select your bank</span><select value={bank} onChange={(e) => setBank(e.target.value)}><option value="">Choose a demo bank</option><option>State Bank of India</option><option>HDFC Bank</option><option>ICICI Bank</option><option>Axis Bank</option></select></label></div>}
      {error && <p className="payment-error" role="alert">{error}</p>}
      <button className="button accent pay-button" onClick={pay} disabled={processing}>{processing ? <><span className="spinner" /> Processing your payment securely…</> : <>Pay {formatCurrency(booking.total)} <ShieldCheck /></>}</button>
      <p className="hard-stop"><CheckCircle2 /> Simulation only. No Razorpay, Stripe, PayU or banking SDK is connected.</p>
    </div><aside className="order-summary"><SmartImage src={item.images[0]} alt={item.title} /><div className="order-content"><p className="eyebrow">ORDER SUMMARY</p><h2>{item.title}</h2><p>{booking.lead.date} · {booking.counts.adults + booking.counts.children} traveler{booking.counts.adults + booking.counts.children > 1 ? 's' : ''}</p><div className="ticket-divider" /><div><span>Package subtotal</span><strong>{formatCurrency(booking.subtotal)}</strong></div>{booking.groupDiscount > 0 && <div className="discount-line"><span>Group discount</span><strong>−{formatCurrency(booking.groupDiscount)}</strong></div>}<div className="order-total"><span>Total due</span><strong>{formatCurrency(booking.total)}</strong></div></div></aside></div>
  </div></section>
}
