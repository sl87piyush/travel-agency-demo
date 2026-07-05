import { useMemo, useState } from 'react'
import { BadgeCheck, BedDouble, CalendarCheck, CarFront, Check, ChevronRight, Clock3, Coffee, Headphones, MapPin, MapPinned, Plane, ShieldCheck, Star, Utensils, X } from 'lucide-react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import SmartImage from '../components/SmartImage'
import PackageCard from '../components/PackageCard'
import { formatCurrency, getPackage, packages } from '../data/packages'

const tabs = ['Overview', 'Day-wise Itinerary', 'Inclusions & Exclusions', 'Terms']

export default function PackageDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const item = getPackage(id)
  const [tab, setTab] = useState(tabs[1])
  const [travelers, setTravelers] = useState({ adults: 2, children: 0 })
  const total = item ? item.priceAdult * travelers.adults + item.priceChild * travelers.children : 0
  const related = useMemo(() => packages.filter((p) => p.id !== id && p.destinationType === item?.destinationType).slice(0, 3), [id, item])

  if (!item) return <section className="page-section"><div className="container empty-state"><h1>Journey not found</h1><Link className="button primary" to="/packages">Browse packages</Link></div></section>

  return <>
    <section className="details-hero"><div className="container"><div className="breadcrumbs"><Link to="/packages">Packages</Link><ChevronRight /><span>{item.title}</span></div><div className="details-title-row"><div><div className="flex flex-wrap gap-2">{item.badges.map((badge) => <span key={badge} className="badge">{badge}</span>)}</div><h1>{item.title}</h1><p><MapPin />{item.locations.join(' → ')} <span>·</span> {item.durationDays} days / {item.durationNights} nights <span>·</span> <Star className="fill-marigold text-marigold" /> {item.rating}</p></div></div></div></section>
    <section className="container gallery"><div className="gallery-main"><SmartImage src={item.images[0]} alt={`${item.title} main view`} eager /></div>{item.images.slice(1, 5).map((image, i) => <div key={image} className="gallery-thumb"><SmartImage src={image} alt={`${item.title} gallery view ${i + 2}`} /></div>)}</section>

    <section className="container detail-layout">
      <div className="detail-content">
        <div className="tabs detail-tabs" role="tablist">{tabs.map((name) => <button key={name} role="tab" aria-selected={tab === name} className={tab === name ? 'active' : ''} onClick={() => setTab(name)}>{name}</button>)}</div>
        <div className="tab-panel">
          {tab === 'Overview' && <div><p className="lead">{item.overview}</p><h2>What makes this route work</h2><div className="highlight-grid"><article><BadgeCheck /><h3>Local eyes on the plan</h3><p>Our Jodhpur team checks connections, pacing and seasonal realities before you travel.</p></article><article><CalendarCheck /><h3>Room to personalise</h3><p>Dates, hotel category and transfer style can all be adjusted before confirmation.</p></article></div></div>}
          {tab === 'Day-wise Itinerary' && <ItineraryPlanner item={item} />}
          {tab === 'Inclusions & Exclusions' && <div className="include-grid"><div><h2>Included</h2>{item.inclusions.map((text) => <p key={text}><Check />{text}</p>)}</div><div><h2>Not included</h2>{item.exclusions.map((text) => <p key={text}><X />{text}</p>)}</div></div>}
          {tab === 'Terms' && <div className="prose"><h2>Flexible demo terms</h2><p>Hold this package without payment while a Travel X More expert reconfirms availability. Cancellations are free within 24 hours of a simulated booking. In a production build, final supplier-specific terms would be shown before payment.</p><p>Prices shown are illustrative per-person starting rates and can change with dates, room category, flights and availability.</p></div>}
        </div>
        <div className="trust-row"><span><CalendarCheck />24-hour demo cancellation</span><span><ShieldCheck />Best-price review</span><span><Headphones />24×7 trip support</span><span><BadgeCheck />Verified local agency</span></div>
      </div>
      <aside className="booking-sidebar"><p className="eyebrow">YOUR TRIP PREVIEW</p><div className="sidebar-price"><span>From</span><strong>{formatCurrency(item.priceAdult)}</strong><small>per adult</small></div><div className="count-row"><span>Adults</span><div className="mini-stepper"><button onClick={() => setTravelers({ ...travelers, adults: Math.max(1, travelers.adults - 1) })}>−</button><strong>{travelers.adults}</strong><button onClick={() => setTravelers({ ...travelers, adults: travelers.adults + 1 })}>+</button></div></div><div className="count-row"><span>Children</span><div className="mini-stepper"><button onClick={() => setTravelers({ ...travelers, children: Math.max(0, travelers.children - 1) })}>−</button><strong>{travelers.children}</strong><button onClick={() => setTravelers({ ...travelers, children: travelers.children + 1 })}>+</button></div></div><div className="sidebar-total"><span>Estimated total</span><strong>{formatCurrency(total)}</strong></div><button className="button accent w-full" onClick={() => navigate(`/booking/${item.id}`, { state: travelers })}>Book this journey</button><Link className="button secondary w-full" to="/quote">Customise this route</Link><p className="sidebar-note">No real payment is taken in this client demo.</p></aside>
    </section>
    <section className="section related"><div className="container"><div className="section-heading"><div><p className="eyebrow">KEEP EXPLORING</p><h2>Similar journeys.</h2></div></div><div className="package-grid">{related.map((pkg) => <PackageCard key={pkg.id} item={pkg} />)}</div></div></section>
  </>
}

function ItineraryPlanner({ item }) {
  const [selectedDay, setSelectedDay] = useState(1)
  const day = item.itinerary.find((entry) => entry.day === selectedDay) || item.itinerary[0]
  const location = item.locations[Math.min(day.day - 1, item.locations.length - 1)] || item.locations[0]
  const isFirst = day.day === 1
  const isLast = day.day === item.itinerary.length
  const events = [
    ...(isFirst ? [{ type: 'Flight', icon: Plane, title: `Arrival connection to ${location}`, meta: 'Suggested arrival · timing confirmed after booking', copy: 'Your arrival is monitored and matched with the first transfer window.', accent: 'blue' }] : []),
    { type: 'Transfer', icon: CarFront, title: isLast ? 'Hotel to departure point' : `Private transfer in ${location}`, meta: 'Private vehicle · luggage assistance included', copy: isLast ? 'A comfortable departure transfer timed around your onward journey.' : 'A dedicated, air-conditioned vehicle connects today’s planned stops.', accent: 'sand' },
    ...(!isLast ? [{ type: 'Activity', icon: MapPinned, title: day.title, meta: 'Guided experience · approximately 3–5 hours', copy: day.description, image: item.images[day.day % item.images.length], accent: 'photo' }] : []),
    ...(!isLast ? [{ type: 'Hotel', icon: BedDouble, title: `${location} stay`, meta: 'Comfort category room · breakfast included', copy: 'A well-reviewed stay selected for location, cleanliness and reliable service.', accent: 'blue' }] : []),
    { type: 'Meal', icon: Utensils, title: isFirst ? 'Welcome meal recommendation' : 'Breakfast included', meta: 'Meal plan shown in your final voucher', copy: 'Dietary preferences can be added during traveler details.', accent: 'plain' },
  ]

  return <div className="itinerary-planner">
    <div className="package-features"><strong>{item.durationDays} day plan</strong><span><Plane /> 2 connections</span><span><CarFront /> {Math.max(3, item.durationDays - 1)} transfers</span><span><BedDouble /> {item.durationNights} hotel nights</span><span><MapPinned /> {Math.max(3, item.durationDays - 2)} activities</span><span><Coffee /> Daily breakfast</span></div>
    <div className="itinerary-workspace">
      <aside className="day-rail" aria-label="Choose itinerary day"><h3>Day plan</h3>{item.itinerary.map((entry) => <button key={entry.day} className={entry.day === selectedDay ? 'active' : ''} onClick={() => setSelectedDay(entry.day)}><i /> <span>Day {entry.day}</span><small>{item.locations[Math.min(entry.day - 1, item.locations.length - 1)]}</small></button>)}</aside>
      <div className="day-content"><header><span>Day {day.day}</span><div><h2>{day.title}</h2><p>{location} · {events.length} planned items</p></div></header><div className="event-stack">{events.map(({ type, icon: Icon, title, meta, copy, image, accent }) => <article className={`itinerary-event ${accent}`} key={`${day.day}-${type}`}><div className="event-type"><Icon /><span>{type}</span></div>{image && <SmartImage src={image} alt={`${title} in ${location}`} />}<div className="event-copy"><h3>{title}</h3><p className="event-meta"><Clock3 /> {meta}</p><p>{copy}</p>{type === 'Hotel' && <div className="event-includes"><Check /> Breakfast included <Check /> Verified property <Check /> 24-hour support</div>}</div></article>)}</div></div>
    </div>
  </div>
}
