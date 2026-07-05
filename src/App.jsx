import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { AppProvider } from './context/AppContext'
import Layout from './components/Layout'
import Home from './pages/Home'
import PackagesPage from './pages/PackagesPage'
import PackageDetails from './pages/PackageDetails'
import Booking from './pages/Booking'
import Payment from './pages/Payment'
import Confirmation from './pages/Confirmation'
import Services from './pages/Services'
import About from './pages/About'
import Contact from './pages/Contact'
import Quote from './pages/Quote'
import NotFound from './pages/NotFound'
import Profile from './pages/Profile'

function ScrollAndFocus() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
    window.setTimeout(() => document.querySelector('#main-content')?.focus({ preventScroll: true }), 0)
  }, [pathname])
  return null
}

export default function App() {
  return <BrowserRouter><AppProvider><ScrollAndFocus /><Routes><Route element={<Layout />}><Route path="/" element={<Home />} /><Route path="/packages" element={<PackagesPage />} /><Route path="/packages/:id" element={<PackageDetails />} /><Route path="/booking/:id" element={<Booking />} /><Route path="/payment" element={<Payment />} /><Route path="/booking-confirmed" element={<Confirmation />} /><Route path="/profile" element={<Profile />} /><Route path="/services" element={<Services />} /><Route path="/about" element={<About />} /><Route path="/contact" element={<Contact />} /><Route path="/quote" element={<Quote />} /><Route path="*" element={<NotFound />} /></Route></Routes></AppProvider></BrowserRouter>
}
