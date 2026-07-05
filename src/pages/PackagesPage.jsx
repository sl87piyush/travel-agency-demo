import { useMemo, useState } from 'react'
import { Search, SlidersHorizontal, X } from 'lucide-react'
import { useSearchParams } from 'react-router-dom'
import PackageCard from '../components/PackageCard'
import { packages } from '../data/packages'

const categories = ['Heritage', 'Honeymoon', 'Family', 'Adventure', 'Group', 'Corporate', 'FIT']

export default function PackagesPage() {
  const [params] = useSearchParams()
  const [query, setQuery] = useState(params.get('q') || '')
  const [type, setType] = useState('all')
  const [category, setCategory] = useState('all')
  const [maxPrice, setMaxPrice] = useState(160000)
  const [duration, setDuration] = useState('all')
  const [sort, setSort] = useState('popular')
  const [filtersOpen, setFiltersOpen] = useState(false)

  const filtered = useMemo(() => {
    const list = packages.filter((item) => {
      const haystack = `${item.title} ${item.locations.join(' ')} ${item.category.join(' ')}`.toLowerCase()
      return haystack.includes(query.toLowerCase()) && (type === 'all' || item.destinationType === type) && (category === 'all' || item.category.includes(category)) && item.priceAdult <= maxPrice && (duration === 'all' || (duration === 'short' ? item.durationDays <= 5 : duration === 'medium' ? item.durationDays >= 6 && item.durationDays <= 8 : item.durationDays >= 9))
    })
    return [...list].sort((a, b) => sort === 'low' ? a.priceAdult - b.priceAdult : sort === 'high' ? b.priceAdult - a.priceAdult : b.rating - a.rating)
  }, [query, type, category, maxPrice, duration, sort])

  return <section className="page-section sandstone-page"><div className="container">
    <div className="page-intro"><p className="eyebrow">PACKAGES · INDIA & WORLDWIDE</p><h1>Find the route that fits.</h1><p>Browse ready-to-book journeys, then tune the dates, pace and room plan with our team.</p></div>
    <div className="package-toolbar"><label className="search-input"><Search /><span className="sr-only">Search packages</span><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search place or package" /></label><button className="button secondary filter-trigger" onClick={() => setFiltersOpen(true)}><SlidersHorizontal /> Filters</button><label className="sort-label"><span>Sort by</span><select value={sort} onChange={(e) => setSort(e.target.value)}><option value="popular">Most popular</option><option value="low">Price: low to high</option><option value="high">Price: high to low</option></select></label></div>
    <div className="browse-layout"><aside className="filter-sidebar"><FilterPanel {...{ type, setType, category, setCategory, duration, setDuration, maxPrice, setMaxPrice, setFiltersOpen }} /></aside><div><p className="result-count"><strong>{filtered.length}</strong> journeys found</p>{filtered.length ? <div className="package-grid browse-grid">{filtered.map((item) => <PackageCard key={item.id} item={item} />)}</div> : <div className="empty-state"><h2>No route matches those filters.</h2><p>Try a wider budget or clear one of the trip-style filters.</p></div>}</div></div>
  </div>{filtersOpen && <div className="filter-drawer-backdrop" onMouseDown={(e) => e.target === e.currentTarget && setFiltersOpen(false)}><aside className="filter-drawer"><FilterPanel {...{ type, setType, category, setCategory, duration, setDuration, maxPrice, setMaxPrice, setFiltersOpen }} /></aside></div>}</section>
}

function FilterPanel({ type, setType, category, setCategory, duration, setDuration, maxPrice, setMaxPrice, setFiltersOpen }) {
  return <>
    <div className="filter-head"><h2>Refine your route</h2><button className="icon-button filter-close" onClick={() => setFiltersOpen(false)} aria-label="Close filters"><X /></button></div>
    <fieldset><legend>Destination</legend>{['all', 'domestic', 'international'].map((item) => <label className="radio-row" key={item}><input type="radio" name="type" checked={type === item} onChange={() => setType(item)} /><span>{item === 'all' ? 'Everywhere' : item[0].toUpperCase() + item.slice(1)}</span></label>)}</fieldset>
    <fieldset><legend>Trip style</legend><select value={category} onChange={(e) => setCategory(e.target.value)}><option value="all">All categories</option>{categories.map((item) => <option key={item}>{item}</option>)}</select></fieldset>
    <fieldset><legend>Duration</legend><select value={duration} onChange={(e) => setDuration(e.target.value)}><option value="all">Any duration</option><option value="short">Up to 5 days</option><option value="medium">6–8 days</option><option value="long">9+ days</option></select></fieldset>
    <fieldset><legend>Budget up to <strong>₹{maxPrice.toLocaleString('en-IN')}</strong></legend><input type="range" min="15000" max="160000" step="5000" value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} /></fieldset>
    <button className="button secondary w-full" onClick={() => { setType('all'); setCategory('all'); setDuration('all'); setMaxPrice(160000) }}>Reset filters</button>
  </>
}
