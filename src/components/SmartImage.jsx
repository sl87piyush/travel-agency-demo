import { useState } from 'react'

export default function SmartImage({ src, alt, className = '', eager = false }) {
  const [current, setCurrent] = useState(src)
  return (
    <img
      src={current}
      alt={alt}
      className={className}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      onError={() => setCurrent('/assets/jodhpur-hero.png')}
    />
  )
}
