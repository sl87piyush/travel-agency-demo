import { Mail, MapPin, Phone } from 'lucide-react'
import { business } from '../data/services'
import { useApp } from '../context/AppContext'

export default function Contact() {
  const { notify } = useApp()
  const submit = (e) => { e.preventDefault(); e.currentTarget.reset(); notify('Message sent in demo mode. Our team would reply shortly.') }
  return <section className="page-section"><div className="container"><div className="page-intro"><p className="eyebrow">CONTACT</p><h1>Let’s talk through the trip.</h1><p>Visit the Sardarpura office, call directly, or leave the outline here.</p></div><div className="contact-layout"><div className="contact-details"><article><MapPin /><div><h2>Visit</h2><p>{business.address}</p></div></article><article><Phone /><div><h2>Call or WhatsApp</h2>{business.phones.map((phone, i) => <a key={phone} href={`tel:${business.phoneLinks[i]}`}>{phone}</a>)}</div></article><article><Mail /><div><h2>Email</h2><a href={`mailto:${business.email}`}>{business.email}</a></div></article><iframe title="Travel X More office map" src="https://www.google.com/maps?q=478%2C%205th%20B%20Rd%2C%20Sardarpura%2C%20Jodhpur%2C%20Rajasthan%20342003&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade" /></div><form className="contact-form" onSubmit={submit}><p className="eyebrow">SEND A NOTE</p><h2>How can we help?</h2><div className="form-grid"><Field label="Full name" required /><Field label="Email address" type="email" required /><Field label="Phone number" type="tel" required /><Field label="Destination" /></div><label className="field"><span>Message *</span><textarea rows="6" required placeholder="Tell us what you have in mind…" /></label><button className="button accent" type="submit">Send message</button><p className="form-disclaimer">Demo form — no message is transmitted.</p></form></div></div></section>
}

function Field({ label, type = 'text', required }) { return <label className="field"><span>{label}{required ? ' *' : ''}</span><input type={type} required={required} /></label> }
