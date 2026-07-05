const picsum = (seed) => `https://picsum.photos/seed/${seed}/1200/800`
const gallery = (seed, local) => [local || picsum(`${seed}-hero`), ...[1, 2, 3, 4].map((n) => picsum(`${seed}-${n}`))]

const standardItinerary = (places) => places.map((place, index) => ({
  day: index + 1,
  title: index === 0 ? `Arrive in ${place}` : index === places.length - 1 ? `A last look at ${place}` : `Discover ${place}`,
  description: index === 0
    ? `Meet your local representative, settle in, and ease into ${place} with an orientation walk.`
    : `A paced day of signature sights, local food stops, and time to explore ${place} independently.`,
}))

export const packages = [
  {
    id: 'royal-rajasthan', title: 'Royal Rajasthan Heritage Trail', destinationType: 'domestic',
    locations: ['Jodhpur', 'Udaipur', 'Jaisalmer'], durationDays: 6, durationNights: 5,
    category: ['Heritage', 'Family'], priceAdult: 18999, priceChild: 13999, rating: 4.9,
    badges: ['Family Discount', 'Best Seller'], images: gallery('rajasthan-fort', '/assets/jodhpur-hero.png'),
    overview: 'A well-paced circuit through Rajasthan’s blue lanes, lake palaces and living desert. Private transfers and local storytelling keep the journey comfortable without sanding away its character.',
    itinerary: [
      { day: 1, title: 'Arrive in the Blue City', description: 'Airport or station pickup, hotel check-in and an evening walk through Jodhpur’s indigo old-town lanes.' },
      { day: 2, title: 'Mehrangarh & the old city', description: 'Explore Mehrangarh Fort with a local guide, Jaswant Thada and the lanes around the clock tower.' },
      { day: 3, title: 'Road to Udaipur', description: 'Drive to Udaipur via Ranakpur, with time for a calm sunset by Lake Pichola.' },
      { day: 4, title: 'The City of Lakes', description: 'City Palace, Saheliyon-ki-Bari and a shared evening boat ride on Lake Pichola.' },
      { day: 5, title: 'Into the Thar', description: 'Transfer toward Jaisalmer and arrive at a desert camp for a camel safari and folk performance.' },
      { day: 6, title: 'Golden Fort farewell', description: 'Visit Jaisalmer Fort and havelis before your scheduled departure transfer.' },
    ],
    inclusions: ['5 nights accommodation', 'Daily breakfast', 'Private intercity transfers', 'Local guides in key cities', 'Lake Pichola boat ride', 'Desert camp experience'],
    exclusions: ['Air or rail tickets', 'Lunches and dinners unless listed', 'Personal expenses', 'Monument camera fees'],
  },
  {
    id: 'bali-bliss', title: 'Bali Bliss Getaway', destinationType: 'international', locations: ['Ubud', 'Seminyak', 'Nusa Penida'],
    durationDays: 5, durationNights: 4, category: ['Honeymoon'], priceAdult: 42999, priceChild: 35999, rating: 4.8,
    badges: ['Global Destination Management'], images: gallery('bali-island', '/assets/bali-terraces.png'),
    overview: 'A sun-warmed Bali escape balancing Ubud’s green interior with island time, temple sunsets and flexible evenings by the coast.',
    itinerary: standardItinerary(['Ubud', 'Ubud rice terraces', 'Nusa Penida', 'Seminyak', 'Uluwatu']),
    inclusions: ['4 nights accommodation', 'Daily breakfast', 'Airport transfers', 'Nusa Penida day trip', 'Uluwatu Temple visit'],
    exclusions: ['Flights', 'Visa charges', 'Travel insurance', 'Meals not listed'],
  },
  {
    id: 'kerala-backwaters', title: 'Kerala Backwaters & Munnar Escape', destinationType: 'domestic', locations: ['Munnar', 'Thekkady', 'Alleppey'],
    durationDays: 5, durationNights: 4, category: ['Family', 'Honeymoon'], priceAdult: 16499, priceChild: 11999, rating: 4.8,
    badges: ['Family Discount'], images: gallery('kerala-houseboat', '/assets/kerala-backwaters.png'),
    overview: 'Cool tea country, spice-scented forests and an unhurried night aboard a traditional houseboat make this Kerala route feel wonderfully varied.',
    itinerary: standardItinerary(['Munnar', 'Munnar tea gardens', 'Periyar', 'Alleppey houseboat', 'Kochi']),
    inclusions: ['3 hotel nights', '1 houseboat night with meals', 'Breakfast', 'Private transfers', 'Periyar nature walk'],
    exclusions: ['Flights', 'Optional activities', 'Personal expenses', 'Meals not listed'],
  },
  {
    id: 'goa-coast', title: 'Goa Coast & Culture Break', destinationType: 'domestic', locations: ['Panaji', 'North Goa', 'South Goa'],
    durationDays: 4, durationNights: 3, category: ['Family', 'Group'], priceAdult: 12999, priceChild: 8999, rating: 4.6,
    badges: ['Group Special'], images: gallery('goa-beach'), overview: 'A relaxed coastal break with heritage quarters, uncrowded beach time and easy private transfers.',
    itinerary: standardItinerary(['Panaji', 'North Goa', 'South Goa', 'Panaji']), inclusions: ['3 nights stay', 'Breakfast', 'Airport transfers', 'North Goa tour'], exclusions: ['Flights', 'Water sports', 'Meals not listed'],
  },
  {
    id: 'himalayan-week', title: 'Manali & Shimla Mountain Week', destinationType: 'domestic', locations: ['Shimla', 'Manali', 'Solang'],
    durationDays: 7, durationNights: 6, category: ['Family', 'Adventure'], priceAdult: 22999, priceChild: 16999, rating: 4.7,
    badges: ['Kids Save More'], images: gallery('manali-mountains'), overview: 'A classic Himalayan road journey with pine forests, high-valley views and flexible adventure time.',
    itinerary: standardItinerary(['Shimla', 'Kufri', 'Manali', 'Solang Valley', 'Naggar', 'Manali', 'Chandigarh']), inclusions: ['6 nights stay', 'Breakfast and dinner', 'Private transfers', 'Local sightseeing'], exclusions: ['Flights', 'Snow activities', 'Lunches'],
  },
  {
    id: 'kashmir-valley', title: 'Kashmir Valley & Houseboat', destinationType: 'domestic', locations: ['Srinagar', 'Gulmarg', 'Pahalgam'],
    durationDays: 6, durationNights: 5, category: ['Family', 'Honeymoon'], priceAdult: 26999, priceChild: 19999, rating: 4.9,
    badges: ['Season Favourite'], images: gallery('kashmir-valley'), overview: 'Mughal gardens, alpine day trips and a night on Dal Lake, arranged around the valley’s changing seasonal rhythms.',
    itinerary: standardItinerary(['Srinagar', 'Gulmarg', 'Pahalgam', 'Betaab Valley', 'Dal Lake', 'Srinagar']), inclusions: ['4 hotel nights', '1 houseboat night', 'Breakfast and dinner', 'Shikara ride', 'Private transfers'], exclusions: ['Flights', 'Gondola tickets', 'Pony rides'],
  },
  {
    id: 'andaman-blue', title: 'Andaman Blue Water Escape', destinationType: 'domestic', locations: ['Port Blair', 'Havelock', 'Neil Island'],
    durationDays: 6, durationNights: 5, category: ['Honeymoon', 'Adventure'], priceAdult: 31999, priceChild: 24999, rating: 4.7,
    badges: ['Island Pick'], images: gallery('andaman-island'), overview: 'Clear-water island days, historic Port Blair and a comfortably timed ferry circuit across Havelock and Neil.',
    itinerary: standardItinerary(['Port Blair', 'Havelock', 'Radhanagar Beach', 'Neil Island', 'Port Blair', 'Port Blair']), inclusions: ['5 nights stay', 'Breakfast', 'Ferry tickets', 'Airport transfers'], exclusions: ['Flights', 'Scuba diving', 'Meals not listed'],
  },
  {
    id: 'dubai-city', title: 'Dubai Skyline & Desert', destinationType: 'international', locations: ['Dubai', 'Abu Dhabi'],
    durationDays: 5, durationNights: 4, category: ['Family', 'Corporate'], priceAdult: 49999, priceChild: 39999, rating: 4.6,
    badges: ['Corporate Travel'], images: gallery('dubai-skyline'), overview: 'A crisp city itinerary combining modern Dubai, an evening desert safari and an optional Abu Dhabi extension.',
    itinerary: standardItinerary(['Dubai', 'Old Dubai', 'Desert Safari', 'Abu Dhabi', 'Dubai']), inclusions: ['4 nights stay', 'Breakfast', 'Airport transfers', 'Desert safari', 'City tour'], exclusions: ['Flights', 'Visa', 'Tourism tax', 'Optional attractions'],
  },
  {
    id: 'thai-duo', title: 'Phuket & Bangkok Duo', destinationType: 'international', locations: ['Phuket', 'Phi Phi', 'Bangkok'],
    durationDays: 6, durationNights: 5, category: ['Group', 'Adventure'], priceAdult: 38999, priceChild: 30999, rating: 4.6,
    badges: ['Group Travel 8+'], images: gallery('thailand-islands'), overview: 'An energetic twin-city route with island scenery, lively markets and a smooth domestic connection.',
    itinerary: standardItinerary(['Phuket', 'Phi Phi Islands', 'Phuket', 'Bangkok', 'Bangkok temples', 'Bangkok']), inclusions: ['5 nights stay', 'Breakfast', 'Phi Phi tour', 'Airport transfers'], exclusions: ['International flights', 'Visa', 'Domestic flight', 'Meals not listed'],
  },
  {
    id: 'singapore-city', title: 'Singapore Family Discovery', destinationType: 'international', locations: ['Singapore', 'Sentosa'],
    durationDays: 5, durationNights: 4, category: ['Family'], priceAdult: 54999, priceChild: 42999, rating: 4.8,
    badges: ['Family Discount'], images: gallery('singapore-gardens'), overview: 'A family-friendly city break with efficient transfers, hands-on attractions and evenings free for hawker-centre discoveries.',
    itinerary: standardItinerary(['Singapore', 'Sentosa', 'Mandai', 'Marina Bay', 'Singapore']), inclusions: ['4 nights stay', 'Breakfast', 'Airport transfers', 'City tour', 'Sentosa admission'], exclusions: ['Flights', 'Visa', 'Meals not listed'],
  },
  {
    id: 'maldives-horizon', title: 'Maldives Overwater Pause', destinationType: 'international', locations: ['Malé', 'South Malé Atoll'],
    durationDays: 4, durationNights: 3, category: ['Honeymoon'], priceAdult: 72999, priceChild: 55999, rating: 4.9,
    badges: ['Honeymoon Pick'], images: gallery('maldives-water-villa'), overview: 'A short, restorative island stay with transfers, full-board meals and nothing overscheduled.',
    itinerary: standardItinerary(['Malé', 'South Malé Atoll', 'South Malé Atoll', 'Malé']), inclusions: ['3 nights resort stay', 'Full-board meals', 'Speedboat transfers', 'Snorkelling equipment'], exclusions: ['Flights', 'Green tax', 'Premium activities'],
  },
  {
    id: 'swiss-europe', title: 'Swiss Peaks & European Rails', destinationType: 'international', locations: ['Zurich', 'Lucerne', 'Interlaken', 'Paris'],
    durationDays: 9, durationNights: 8, category: ['Honeymoon', 'FIT'], priceAdult: 149999, priceChild: 119999, rating: 4.9,
    badges: ['FIT Travel Package'], images: gallery('switzerland-alps'), overview: 'A flexible rail-first itinerary pairing Swiss mountain towns with a polished Paris finale.',
    itinerary: standardItinerary(['Zurich', 'Lucerne', 'Mt Titlis', 'Interlaken', 'Jungfrau region', 'Interlaken', 'Paris', 'Paris', 'Paris']), inclusions: ['8 nights stay', 'Breakfast', 'Swiss rail pass', 'Paris transfer', 'Selected excursions'], exclusions: ['Flights', 'Schengen visa', 'City taxes', 'Meals not listed'],
  },
]

export const getPackage = (id) => packages.find((item) => item.id === id)
export const formatCurrency = (value) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value)

