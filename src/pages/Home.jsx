import { useState } from 'react'
import { ArrowRight, CalendarDays, Check, Headphones, MapPin, Minus, Plus, Search, ShieldCheck, Sparkles, Users } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import PackageCard from '../components/PackageCard'
import SmartImage from '../components/SmartImage'
import { packages, formatCurrency } from '../data/packages'
import { services } from '../data/services'

const destinations = [
  ['Jodhpur', '/assets/jodhpur-hero.png', 18999], ['Kerala', '/assets/kerala-backwaters.png', 16499], ['Bali', '/assets/bali-terraces.png', 42999],
  ['Kashmir', 'https://picsum.photos/seed/kashmir-snow-valley/800/900', 26999], ['Dubai', 'https://picsum.photos/seed/dubai-city-skyline/800/900', 49999], ['Maldives', 'https://picsum.photos/seed/maldives-lagoon-villa/800/900', 72999],
]

export default function Home() {
  const navigate = useNavigate()
  const [search, setSearch] = useState({ destination: 'Rajasthan', from: '', to: '', travelers: 2 })
  const submit = (e) => { e.preventDefault(); navigate(`/packages?q=${encodeURIComponent(search.destination)}`) }

  return <>
    <section className="hero">
      <SmartImage src="/assets/jodhpur-hero.png" alt="Mehrangarh Fort above Jodhpur's blue old city" className="hero-image" eager />
      <div className="hero-overlay" />
      <div className="container hero-content">
        <p className="hero-kicker"><span>JDH</span><i />INDIA & BEYOND</p>
        <h1>Journeys with a sense<br className="hidden md:block" /> of place.</h1>
        <p>From Jodhpur’s blue lanes to Bali’s green terraces, plan with a local team who stays close from first idea to homecoming.</p>
        <div className="hero-actions"><Link className="button accent" to="/packages">Explore packages <ArrowRight size={18} /></Link><a className="text-link light" href="tel:+919782940402">Speak to an expert</a></div>
      </div>
      <form className="search-panel" onSubmit={submit}>
        <label><span>Where to?</span><div><MapPin /><select value={search.destination} onChange={(e) => setSearch({ ...search, destination: e.target.value })}><option>Rajasthan</option><option>Kerala</option><option>Bali</option><option>Kashmir</option><option>Dubai</option><option>Maldives</option></select></div></label>
        <label><span>Check in</span><div><CalendarDays /><input type="date" value={search.from} onChange={(e) => setSearch({ ...search, from: e.target.value })} /></div></label>
        <label><span>Check out</span><div><CalendarDays /><input type="date" value={search.to} onChange={(e) => setSearch({ ...search, to: e.target.value })} /></div></label>
        <label><span>Travelers</span><div className="stepper"><button type="button" aria-label="Remove traveler" onClick={() => setSearch({ ...search, travelers: Math.max(1, search.travelers - 1) })}><Minus /></button><strong>{search.travelers}</strong><button type="button" aria-label="Add traveler" onClick={() => setSearch({ ...search, travelers: Math.min(12, search.travelers + 1) })}><Plus /></button></div></label>
        <button className="search-button" type="submit"><Search /> <span>Search packages</span></button>
      </form>
    </section>

    <section className="section destinations-section">
      <div className="container">
        <div className="section-heading"><div><p className="eyebrow">START WITH A PLACE</p><h2>Where are you drawn to?</h2></div><Link className="text-link" to="/packages">See every destination <ArrowRight /></Link></div>
        <div className="destination-grid">{destinations.map(([name, image, price]) => <Link key={name} to={`/packages?q=${name}`} className="destination-card"><SmartImage src={image} alt={`${name} travel destination`} /><div><h3>{name}</h3><p>Packages from {formatCurrency(price)}</p></div></Link>)}</div>
      </div>
    </section>

    <section className="section featured-section">
      <div className="container"><div className="section-heading"><div><p className="eyebrow">CURATED DEPARTURES</p><h2>Routes worth taking slowly.</h2></div><p className="section-copy">Flexible starting points, reliable local support, and enough free time to make the trip your own.</p></div><div className="package-grid">{packages.slice(0, 3).map((item) => <PackageCard key={item.id} item={item} />)}</div></div>
    </section>

    <section className="trust-section">
      <div className="container trust-grid">
        <div className="trust-copy"><p className="eyebrow light">WHY TRAVEL X MORE</p><h2>A travel expert in your corner.</h2><p>Plans change. Trains run late. The best local café isn’t always on a list. We design for the real journey, with a Jodhpur team you can reach.</p><Link to="/about" className="button outline-light">Meet the local team <ArrowRight /></Link></div>
        {/* Placeholder figures: replace with verified client metrics before production launch. */}
        <div className="stats-grid"><article><strong>12+</strong><span>years planning journeys</span></article><article><strong>4.8/5</strong><span>traveler satisfaction</span></article><article><strong>35+</strong><span>destinations covered</span></article><article><strong>24×7</strong><span>on-trip assistance</span></article></div>
      </div>
    </section>

    <section className="section services-preview">
      <div className="container"><div className="section-heading"><div><p className="eyebrow">HOW WE HELP</p><h2>One desk, every kind of journey.</h2></div><Link className="text-link" to="/services">View all services <ArrowRight /></Link></div>
        <div className="services-grid">{services.map(({ title, icon: Icon, copy, action }) => <Link to={action} key={title} className="service-card"><Icon /><div><h3>{title}</h3><p>{copy}</p></div><ArrowRight className="service-arrow" /></Link>)}</div>
      </div>
    </section>

    <section className="section testimonial-section"><div className="container"><p className="eyebrow">TRAVELER NOTES</p><h2>Small details, remembered.</h2>
      {/* Placeholder testimonials for demo presentation; replace with approved client reviews. */}
      <div className="quote-grid"><blockquote>“The route felt considered, not rushed. Even our free evening in Udaipur came with three very good local suggestions.”<cite>— Aditi, family traveler · Sample review</cite></blockquote><blockquote>“We had one person to call throughout the trip. That made a big difference with grandparents and two children.”<cite>— Rohan, Rajasthan · Sample review</cite></blockquote><blockquote>“Our Bali plan had structure without feeling like a checklist. Transfers were always clear and on time.”<cite>— Meera, honeymoon traveler · Sample review</cite></blockquote></div>
    </div></section>

    <section className="container cta-banner"><div><p className="eyebrow light">READY WHEN YOU ARE</p><h2>Pack the idea. We’ll plan the route.</h2></div><div><Link className="button accent" to="/packages">Browse packages <ArrowRight /></Link><Link className="button outline-light" to="/quote">Build a custom trip</Link></div></section>
  </>
}
