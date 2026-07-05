import { Link } from 'react-router-dom'

export default function NotFound() { return <section className="page-section"><div className="container empty-state"><p className="eyebrow">404 · ROUTE MISSED</p><h1>This journey isn’t on the map.</h1><Link className="button primary" to="/">Back to home</Link></div></section> }
