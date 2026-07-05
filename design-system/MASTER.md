# Travel X More design system

## Direction

Blue City departure lounge: a clean travel-tech interface grounded in Jodhpur's indigo cityscape and Rajasthan's warm sandstone. The signature motif is a restrained ticket perforation, culminating in the booking-confirmation boarding pass.

## Tokens

- Primary: `#163A5C` Jodhpur indigo
- Secondary: `#2F6690` dusk cerulean
- Accent: `#E8A33D` marigold
- Alert/detail: `#B0532E` desert rust
- Warm surface: `#F6EFE2` sandstone
- Text: `#211F1B` ink
- Display: Sora; body: Manrope; ticket codes: IBM Plex Mono

## Interaction and accessibility

- Controls are at least 44px high with visible keyboard focus.
- Motion uses opacity/transform only and is disabled for reduced-motion users.
- Forms use persistent labels and nearby errors.
- Images reserve aspect ratio and fall back to a local generated Jodhpur image.
- Mobile layouts are single-column with no horizontal page scroll.

## Anti-patterns

- No generic purple SaaS gradients, floating blobs, or glass everywhere.
- No fake awards or unlabelled invented reviews.
- No emoji icons; Lucide outline icons only.
- No real auth, payment gateway, API keys, or card-data transmission.
