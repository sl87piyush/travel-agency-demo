import { CalendarCheck, Users, Baby, Car, UsersRound, MapPinned, BriefcaseBusiness, Luggage, WandSparkles, Route, Globe2 } from 'lucide-react'

export const services = [
  { title: 'Online Appointments', icon: CalendarCheck, copy: 'Book a focused slot with a travel expert before you commit.', action: '/contact' },
  { title: 'Family Discount', icon: Users, copy: 'Reduced per-person pricing for families of four or more.', action: '/packages' },
  { title: 'Discounts For Kids', icon: Baby, copy: 'Reduced pricing for children under 12 on eligible departures.', action: '/packages' },
  { title: 'Car Rental', icon: Car, copy: 'Self-drive and chauffeur-driven cars at your destination.', action: '/quote' },
  { title: 'Group Travel', icon: UsersRound, copy: 'Custom pricing and itineraries for groups of eight or more.', action: '/quote' },
  { title: 'Sight Seeing Planning', icon: MapPinned, copy: 'Curated local and day-trip itineraries paced around you.', action: '/quote' },
  { title: 'Corporate Travel', icon: BriefcaseBusiness, copy: 'Managed travel programs and movement plans for businesses.', action: '/quote' },
  { title: 'Tours', icon: Luggage, copy: 'Guided domestic and international tours with local support.', action: '/packages' },
  { title: 'Custom Made Travel', icon: WandSparkles, copy: 'Fully bespoke routes built around your priorities and budget.', action: '/quote' },
  { title: 'FIT Travel Packages', icon: Route, copy: 'Flexible plans for solo travelers and independent explorers.', action: '/packages' },
  { title: 'Global Destination Management', icon: Globe2, copy: 'End-to-end international planning, from arrival to departure.', action: '/quote' },
]

export const business = {
  name: 'Travel X More',
  email: 'info@travelxmore.com',
  phones: ['+91 97829 40402', '+91 98291 40402'],
  phoneLinks: ['+919782940402', '+919829140402'],
  address: '478, 5th B Rd, near Kalyan Jewellers, Sardarpura, Jodhpur, Rajasthan 342003',
}
