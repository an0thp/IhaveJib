# iHAVECPU visual specification

This specification records the measurements used to align the existing JIB-backed implementation with the iHAVECPU visual reference. Measurements are CSS pixels from the live pages and preserve the project's existing HTML, routes, and data.

## Design tokens

| Token | Value |
| --- | --- |
| Page background | `#f6f9fc` |
| Surface | `#ffffff` |
| Main text | `#2b3445` |
| Muted text | `#7d879c` |
| Accent red | `#d4001a` |
| Border | `#dae1e7` |
| Main font | `Noto Sans Thai`, `Noto Sans Thai Looped`, sans-serif |
| Base font size | `14px` |
| Content maximum width | `1440px` |
| Standard radius | `8px` |

## Desktop geometry

| Component | Measurement |
| --- | --- |
| Information bar | `40px` high |
| Main header | `80px` high |
| Navigation | `60px` high |
| Logo | `151 × 50px` reference footprint; JIB logo keeps its native aspect ratio inside the same row |
| Search | `740 × 44px`, pill radius |
| Category trigger | `189 × 40px` |
| Hero at 1920px | `1440 × 486px` container; image approximately `1440 × 480px` |
| Hero at 1440px | `1401 × 515px` including carousel controls |
| Intro panel | `125px` high |
| Brand showcase | `147px` high |
| Special-deal section | `357px` high; cards `314 × 224px` at 1440px viewport |
| New-arrival section | `300px` high; cards approximately `308 × 244px` |
| By-order section | `357px` high; cards approximately `415 × 245px` |
| YouTube section | `264px` high |
| DIY hero at 1440px | `1401 × 290px`; summary rail `320px`; builder gap `28px` |
| Blog feature at 1440px | `1377 × 392px`; lead card `905px`; feature top near `285px` |
| Footer | approximately `456px` high |

## Responsive rules

- Desktop keeps a centered 1440px container and the reference section proportions.
- Tablet collapses product columns while retaining the 24px content gutters and horizontal navigation access.
- Mobile uses a 40px black logo bar, a 64px search row, hides the desktop navigation, collapses product grids where required, and has no horizontal page overflow.
- Product images use `object-fit: contain`; promotional banners use their authored aspect ratio without stretching.

## Component hierarchy

1. Information bar
2. Main header with logo, search, and utility actions
3. Navigation with product-category dropdown
4. Hero and promotional banners
5. Introduction and brand showcase
6. Deals, arrivals, categories, and by-order products
7. Computer sets, notebook products, DIY promotion, and DIY products
8. Services, policy content, articles, and footer
