import { useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { ChevronDown, LogOut, Menu, Phone, TicketCheck, UserRound, X } from 'lucide-react'
import Brand from './Brand'
import AuthModal from './AuthModal'
import { business, services } from '../data/services'
import { useApp } from '../context/AppContext'

const nav = [['Home', '/'], ['Packages', '/packages'], ['Services', '/services'], ['About', '/about'], ['Contact', '/contact']]

export default function Layout() {
  const { user, logout, openAuth, toast } = useApp()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [accountOpen, setAccountOpen] = useState(false)
  const location = useLocation()

  return (
    <div className="min-h-dvh bg-white text-ink">
      <header className="site-header">
        <div className="nav-shell">
          <Link to="/" onClick={() => setMobileOpen(false)}><Brand /></Link>
          <nav className="desktop-nav" aria-label="Main navigation">
            {nav.map(([label, to]) => <NavLink key={to} to={to} className={({ isActive }) => isActive ? 'active' : ''}>{label}</NavLink>)}
          </nav>
          <div className="nav-actions">
            <a className="nav-call" href={`tel:${business.phoneLinks[0]}`}><Phone size={16} /> <span>+91 97829 40402</span></a>
            {user ? (
              <div className="account-menu">
                <button className="account-button" onClick={() => setAccountOpen(!accountOpen)} aria-expanded={accountOpen}>{user.name?.split(' ')[0] || 'Traveler'} <ChevronDown size={16} /></button>
                {accountOpen && <div className="account-popover"><Link to="/profile" onClick={() => setAccountOpen(false)}><UserRound /> My profile</Link><Link to="/profile?tab=trips" onClick={() => setAccountOpen(false)}><TicketCheck /> My trips</Link><button onClick={() => { logout(); setAccountOpen(false) }}><LogOut /> Log out</button></div>}
              </div>
            ) : <button className="button nav-login" onClick={() => openAuth()}>Log in</button>}
            <button className="icon-button mobile-menu" onClick={() => setMobileOpen(!mobileOpen)} aria-label={mobileOpen ? 'Close menu' : 'Open menu'}>{mobileOpen ? <X /> : <Menu />}</button>
          </div>
        </div>
        {mobileOpen && (
          <nav className="mobile-nav" aria-label="Mobile navigation">
            {nav.map(([label, to]) => <NavLink key={to} to={to} onClick={() => setMobileOpen(false)} className={location.pathname === to ? 'active' : ''}>{label}</NavLink>)}
            {user && <NavLink to="/profile" onClick={() => setMobileOpen(false)}>My profile & trips</NavLink>}
            {!user && <button className="button primary" onClick={() => { setMobileOpen(false); openAuth() }}>Log in</button>}
          </nav>
        )}
      </header>

      <main id="main-content"><Outlet /></main>

      <footer className="footer">
        <div className="container footer-grid">
          <div><Brand inverse /><p className="mt-5 max-w-sm text-white/70">Jodhpur-rooted travel planning for India and the world—clear advice, considered routes, and a person to call.</p><address>{business.address}</address></div>
          <div><h2>Quick links</h2>{nav.slice(1).map(([label, to]) => <Link key={to} to={to}>{label}</Link>)}<Link to="/quote">Request a custom quote</Link></div>
          <div className="footer-services"><h2>Services</h2>{services.map((service) => <Link key={service.title} to={`/services#${service.title.toLowerCase().replaceAll(' ', '-')}`}>{service.title}</Link>)}</div>
          <div><h2>Talk to us</h2>{business.phones.map((phone, i) => <a key={phone} href={`tel:${business.phoneLinks[i]}`}>{phone}</a>)}<a href={`mailto:${business.email}`}>{business.email}</a><form className="newsletter" onSubmit={(e) => e.preventDefault()}><label htmlFor="newsletter">Occasional travel notes</label><div><input id="newsletter" type="email" placeholder="you@example.com" aria-label="Email for newsletter" /><button type="submit">Join</button></div></form></div>
        </div>
        <div className="container footer-bottom"><span>© {new Date().getFullYear()} Travel X More</span><span>Client demonstration · Auth & payment are simulated</span></div>
      </footer>

      <a className="whatsapp" href="https://wa.me/919782940402?text=Hello%20Travel%20X%20More%2C%20I%27d%20like%20help%20planning%20a%20trip." target="_blank" rel="noreferrer" aria-label="Chat with Travel X More on WhatsApp"><svg viewBox="0 0 32 32" aria-hidden="true"><path d="M16 3a12.5 12.5 0 0 0-10.7 19L3.6 28.4l6.6-1.7A12.5 12.5 0 1 0 16 3Zm6.9 17.6c-.3.9-1.8 1.7-2.5 1.8-.7.1-1.5.2-2.5-.1a22.5 22.5 0 0 1-2.3-.9c-4.1-1.8-6.7-6-6.9-6.3-.2-.3-1.7-2.3-1.7-4.4 0-2.1 1.1-3.2 1.5-3.6.4-.4.9-.5 1.2-.5h.9c.3 0 .7-.1 1 .8l1.2 2.9c.1.2.1.5 0 .7l-.4.7-.6.7c-.2.2-.4.5-.2.9.2.4 1.1 1.8 2.4 2.9 1.6 1.4 3 1.9 3.4 2.1.4.2.7.2.9-.1l1.3-1.6c.3-.4.6-.3 1-.2l2.7 1.3c.4.2.7.3.8.5.1.2.1.9-.2 1.8Z" /></svg></a>
      <AuthModal />
      {toast && <div className={`toast ${toast.tone}`} role="status" aria-live="polite">{toast.message}</div>}
    </div>
  )
}
