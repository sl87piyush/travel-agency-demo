import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { services } from '../data/services'

export default function Services() {
  return <section className="page-section sandstone-page"><div className="container"><div className="page-intro"><p className="eyebrow">SERVICES</p><h1>Travel support that joins the dots.</h1><p>From a one-hour planning appointment to a full company movement program, start with the level of help you actually need.</p></div><div className="service-list">{services.map(({ title, icon: Icon, copy, action }, index) => <article id={title.toLowerCase().replaceAll(' ', '-')} key={title}><div className="service-index">{String(index + 1).padStart(2, '0')}</div><Icon /><div><h2>{title}</h2><p>{copy} We shape each request around your destination, group, pace and practical constraints.</p></div><Link className="round-link" to={action} aria-label={`Explore ${title}`}><ArrowRight /></Link></article>)}</div></div></section>
}
