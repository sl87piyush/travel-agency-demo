import { ArrowRight, BadgeCheck, Globe2, Handshake, Map } from 'lucide-react'
import { Link } from 'react-router-dom'
import SmartImage from '../components/SmartImage'

export default function About() {
  return <>
    <section className="about-hero"><SmartImage src="/assets/jodhpur-hero.png" alt="Mehrangarh Fort and Jodhpur" className="about-image" eager /><div className="about-overlay" /><div className="container"><p className="eyebrow light">ABOUT TRAVEL X MORE</p><h1>Local to Jodhpur.<br />Connected to the world.</h1><p>We are a Jodhpur-based travel agency helping domestic and international travelers move from a good idea to a well-held journey.</p></div></section>
    <section className="section"><div className="container about-grid"><div><p className="eyebrow">OUR POINT OF VIEW</p><h2>Good travel planning is equal parts imagination and follow-through.</h2></div><div className="prose"><p>Travel X More combines a local understanding of Rajasthan with a practical network across India and international destinations. We plan holidays, independent itineraries, group movements, transport and managed corporate travel.</p><p>Our role is simple: listen carefully, make the moving parts clear, and remain reachable when the real journey begins. This demo shows how that service could translate into a modern online booking experience.</p></div></div></section>
    <section className="section sandstone-page"><div className="container value-grid"><article><Map /><h3>Grounded recommendations</h3><p>Advice shaped by season, pace and who is actually traveling.</p></article><article><Handshake /><h3>A person to call</h3><p>Clear ownership from the first quote through on-trip support.</p></article><article><Globe2 /><h3>Global reach</h3><p>Domestic expertise and carefully managed international journeys.</p></article><article><BadgeCheck /><h3>Clear next steps</h3><p>No mystery handoffs; each stage says what happens next.</p></article></div></section>
    <section className="container cta-banner"><div><p className="eyebrow light">PLAN WITH US</p><h2>Bring us the rough idea.</h2></div><div><Link className="button accent" to="/quote">Request a custom quote <ArrowRight /></Link></div></section>
  </>
}
