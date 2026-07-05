import { Compass } from 'lucide-react'

export default function Brand({ inverse = false }) {
  return (
    <span className={`brand ${inverse ? 'brand-inverse' : ''}`} aria-label="Travel X More">
      <span className="brand-mark"><Compass size={19} aria-hidden="true" /></span>
      <span><strong>Travel X</strong><em>More</em></span>
    </span>
  )
}
