import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { useState } from 'react'
import { useApp } from '../context/AppContext'

export default function Quote() {
  const { notify } = useApp()
  const [submitted, setSubmitted] = useState(false)
  const submit = (e) => { e.preventDefault(); setSubmitted(true); notify('Custom quote request saved in demo mode.') }
  if (submitted) return <section className="page-section quote-page"><div className="container quote-success"><CheckCircle2 /><p className="eyebrow">REQUEST RECEIVED</p><h1>We have the outline.</h1><p>In the live service, a Travel X More expert would call within one business day to shape the route and confirm priorities.</p><button className="button primary" onClick={() => setSubmitted(false)}>Plan another trip</button></div></section>
  return <section className="page-section quote-page"><div className="container quote-layout"><div className="quote-copy"><p className="eyebrow light">CUSTOM MADE TRAVEL</p><h1>A route built around your world.</h1><p>Corporate movement, a multi-generational family trip, or a destination that doesn’t fit a template—give us the contours.</p><ul><li><CheckCircle2 /> One expert owns the request</li><li><CheckCircle2 /> Budget and pace discussed upfront</li><li><CheckCircle2 /> Domestic and global planning</li></ul></div><form className="quote-form" onSubmit={submit}><h2>Tell us what you’re imagining.</h2><div className="form-grid"><Field label="Full name" required /><Field label="Company (optional)" /><Field label="Email address" type="email" required /><Field label="Phone number" type="tel" required /><Field label="Destination(s) of interest" required /><Field label="Approximate traveler count" type="number" required /><Field label="Approximate dates" /><label className="field"><span>Budget range</span><select><option>Under ₹50,000</option><option>₹50,000–₹1,00,000</option><option>₹1,00,000–₹2,50,000</option><option>₹2,50,000+</option></select></label></div><label className="field"><span>What should we know?</span><textarea rows="5" /></label><button className="button accent" type="submit">Submit request <ArrowRight /></button><p className="form-disclaimer">Demo form — no request is transmitted.</p></form></div></section>
}

function Field({ label, type = 'text', required }) { return <label className="field"><span>{label}{required ? ' *' : ''}</span><input type={type} required={required} /></label> }
