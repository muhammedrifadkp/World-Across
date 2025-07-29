ir n# World Across Logo Usage Guide

## Available Logo Assets

The following logo files are available in the `public/` directory:

### Logo with Name
- `world-across-logo-and-name.jpg` - Full logo with name on white background
- `world-across-logo-and-name-without-bg.png` - Full logo with name, transparent background

### Name Only
- `world-across-name.jpg` - Text logo only on white background  
- `world-across-name-without-bg.png` - Text logo only, transparent background

### Logo Only
- `wa-only-logo.jpg` - Icon/symbol only on white background
- `wa-only-logo-without-bg.png` - Icon/symbol only, transparent background

## Current Implementation

### Navbar
- **File Used**: `world-across-logo-and-name-without-bg.png`
- **Size**: 200x60px (h-12 w-auto)
- **Reason**: Full branding visibility with transparent background for clean integration

### Footer
- **File Used**: `world-across-logo-and-name-without-bg.png`
- **Size**: 160x48px (h-10 w-auto)
- **Styling**: `brightness-0 invert` for white appearance on dark background
- **Reason**: Consistent branding with navbar, inverted for dark theme

### Favicon
- **File Used**: `wa-only-logo-without-bg.png`
- **Sizes**: 16x16, 32x32, 180x180 (Apple touch icon)
- **Reason**: Compact logo works better in small favicon sizes

## Recommended Usage

### When to use Logo + Name (`world-across-logo-and-name-without-bg.png`)
- Main navigation/header
- Footer branding
- Landing page headers
- Email signatures
- Business cards

### When to use Name Only (`world-across-name-without-bg.png`)
- Secondary headers
- Subpage headers where space is limited
- Social media covers
- Letterheads

### When to use Logo Only (`wa-only-logo-without-bg.png`)
- Favicons
- Social media profile pictures
- App icons
- Compact spaces where text would be unreadable
- Loading screens

## Technical Implementation Notes

### Next.js Image Optimization
- All logos are configured for Next.js Image optimization
- WebP and AVIF formats are automatically generated
- Multiple device sizes supported (640px to 3840px)
- External image domains configured with `remotePatterns` for Vercel deployment

### External Image Domains Configured
- `images.unsplash.com` - Main image provider
- `plus.unsplash.com` - Premium Unsplash images
- `cabinsinsweden.com` - Featured offer images
- `blog.sothebysrealty.co.uk` - Luxury travel images
- `assets.insuremytrip.com` - Travel-related images
- `via.placeholder.com` - Placeholder images

### CSS Classes Applied
- `object-contain` - Maintains aspect ratio
- `w-auto` - Allows width to scale with height
- `brightness-0 invert` - For white logos on dark backgrounds

### Accessibility
- All logo images include proper `alt` attributes
- Logo images have `priority` loading for above-the-fold content
