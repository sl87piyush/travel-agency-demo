import { ArrowUpRight, Clock3, MapPin, Star } from 'lucide-react'
import { Link } from 'react-router-dom'
import { formatCurrency } from '../data/packages'
import SmartImage from './SmartImage'

export default function PackageCard({ item }) {
  return (
    <article className="package-card group">
      <Link to={`/packages/${item.id}`} className="package-image-wrap" aria-label={`View ${item.title}`}>
        <SmartImage src={item.images[0]} alt={`${item.locations[0]} — ${item.title}`} className="package-image" />
        <div className="package-badges">
          {item.badges.slice(0, 2).map((badge) => <span key={badge}>{badge}</span>)}
        </div>
      </Link>
      <div className="package-card-body">
        <div className="flex items-center justify-between gap-3 text-sm text-cerulean">
          <span className="flex items-center gap-1.5"><MapPin size={15} />{item.locations.join(' · ')}</span>
          <span className="flex items-center gap-1 text-ink"><Star size={14} className="fill-marigold text-marigold" /> {item.rating}</span>
        </div>
        <h3><Link to={`/packages/${item.id}`}>{item.title}</Link></h3>
        <div className="ticket-divider" aria-hidden="true" />
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="meta"><Clock3 size={15} /> {item.durationDays} days / {item.durationNights} nights</p>
            <p className="price"><small>from</small> {formatCurrency(item.priceAdult)} <small>/ person</small></p>
          </div>
          <Link className="round-link" to={`/packages/${item.id}`} aria-label={`View details for ${item.title}`}><ArrowUpRight size={20} /></Link>
        </div>
      </div>
    </article>
  )
}
