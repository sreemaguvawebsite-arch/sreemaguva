# Responsive Design System

## Overview
This project now uses a **Bootstrap-like responsive design system** with comprehensive utility classes for perfect alignment across all devices.

## Breakpoints

```css
--breakpoint-xs: 0px      /* Extra small devices (phones, <576px) */
--breakpoint-sm: 576px    /* Small devices (landscape phones, ≥576px) */
--breakpoint-md: 768px    /* Medium devices (tablets, ≥768px) */
--breakpoint-lg: 992px    /* Large devices (desktops, ≥992px) */
--breakpoint-xl: 1200px   /* Extra large devices (large desktops, ≥1200px) */
--breakpoint-xxl: 1400px  /* Extra extra large devices (≥1400px) */
```

## Container System

### `.container`
- Max-width: 1200px
- Responsive padding
- Centered with auto margins

### `.container-fluid`
- Full width
- Responsive padding
- No max-width constraint

## Spacing System

```css
--spacing-xs: 0.25rem   /* 4px */
--spacing-sm: 0.5rem    /* 8px */
--spacing-md: 1rem      /* 16px */
--spacing-lg: 1.5rem    /* 24px */
--spacing-xl: 2rem      /* 32px */
--spacing-2xl: 3rem     /* 48px */
--spacing-3xl: 4rem     /* 64px */
--spacing-4xl: 6rem     /* 96px */
```

## Grid System

### Basic Row & Column
```jsx
<div className="row">
  <div className="col">Column 1</div>
  <div className="col">Column 2</div>
  <div className="col">Column 3</div>
</div>
```

### Fixed Width Columns
```jsx
<div className="row">
  <div className="col-6">50% width</div>
  <div className="col-3">25% width</div>
  <div className="col-3">25% width</div>
</div>
```

### Responsive Columns
```jsx
<div className="row">
  <div className="col-12 col-md-6 col-lg-4">
    <!-- 100% on mobile, 50% on tablet, 33.33% on desktop -->
  </div>
</div>
```

## Utility Classes

### Display
- `.d-none`, `.d-block`, `.d-flex`, `.d-grid`
- Responsive: `.d-md-none`, `.d-sm-flex`, etc.

### Text Alignment
- `.text-center`, `.text-left`, `.text-right`
- Responsive: `.text-md-center`, `.text-sm-left`

### Flexbox
- **Direction**: `.flex-row`, `.flex-column`
- **Wrap**: `.flex-wrap`, `.flex-nowrap`
- **Justify**: `.justify-start`, `.justify-center`, `.justify-end`, `.justify-between`, `.justify-around`
- **Align**: `.align-start`, `.align-center`, `.align-end`, `.align-stretch`
- **Gap**: `.gap-1`, `.gap-2`, `.gap-3`, `.gap-4`

### Spacing (Margin & Padding)

**Margin:**
- `.mt-1` to `.mt-5` (margin-top)
- `.mb-1` to `.mb-5` (margin-bottom)
- `.ml-1` to `.ml-4` (margin-left)
- `.mr-1` to `.mr-4` (margin-right)
- `.mx-auto` (center horizontally)

**Padding:**
- `.pt-1` to `.pt-5` (padding-top)
- `.pb-1` to `.pb-5` (padding-bottom)
- `.pl-1` to `.pl-4` (padding-left)
- `.pr-1` to `.pr-4` (padding-right)

### Width
- `.w-25`, `.w-50`, `.w-75`, `.w-100`, `.w-auto`
- `.mw-100` (max-width: 100%)

## Responsive Section Padding

The `--section-padding` automatically adjusts:
- **Desktop (≥1200px)**: 6rem (96px)
- **Laptop (992-1199px)**: 5rem (80px)
- **Tablet (768-991px)**: 4rem (64px)
- **Mobile (576-767px)**: 3rem (48px)
- **Small Mobile (<576px)**: 2rem (32px)

## Best Practices

### 1. Mobile-First Approach
```jsx
// ✅ Good: Start with mobile, add larger breakpoints
<div className="col-12 col-md-6 col-lg-4">

// ❌ Bad: Desktop-first requires overriding
<div className="col-lg-4 col-md-6 col-12">
```

### 2. Use Container
```jsx
// ✅ Good: Wrap sections with container
<section className="section">
  <div className="container">
    {/* Content */}
  </div>
</section>
```

### 3. Consistent Spacing
```jsx
// ✅ Good: Use spacing utilities
<div className="mb-4 pt-3">

// ❌ Bad: Inline styles
<div style={{ marginBottom: '35px', paddingTop: '21px' }}>
```

### 4. Responsive Display
```jsx
// ✅ Good: Hide/show based on device
<div className="d-none d-md-block">Desktop only</div>
<div className="d-block d-md-none">Mobile only</div>
```

## Common Patterns

### Two-Column Layout (Responsive)
```jsx
<div className="row">
  <div className="col-12 col-md-6">
    <h3>Left Column</h3>
    <p>Content here</p>
  </div>
  <div className="col-12 col-md-6">
    <h3>Right Column</h3>
    <p>Content here</p>
  </div>
</div>
```

### Three-Column Grid
```jsx
<div className="row">
  <div className="col-12 col-sm-6 col-lg-4 mb-4">Item 1</div>
  <div className="col-12 col-sm-6 col-lg-4 mb-4">Item 2</div>
  <div className="col-12 col-sm-6 col-lg-4 mb-4">Item 3</div>
</div>
```

### Centered Content
```jsx
<div className="d-flex justify-center align-center">
  <div className="text-center">
    <h2>Centered Content</h2>
  </div>
</div>
```

### Card Grid
```jsx
<div className="row gap-3">
  <div className="col-12 col-md-6 col-lg-4">
    <div className="card">...</div>
  </div>
  <!-- Repeat cards -->
</div>
```

## Testing Responsive Design

1. **Chrome DevTools**: F12 → Toggle device toolbar (Ctrl+Shift+M)
2. **Test breakpoints**:
   - 375px (iPhone SE)
   - 768px (iPad)
   - 1024px (iPad Pro)
   - 1920px (Desktop)
3. **Check alignment** at each breakpoint
4. **Verify scroll** (no horizontal overflow)

## Migration Guide

### Old Code → New Code

**Before:**
```jsx
<div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
```

**After:**
```jsx
<div className="container">
```

---

**Before:**
```jsx
<div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px' }}>
```

**After:**
```jsx
<div className="d-flex justify-between gap-2">
```

---

**Before:**
```jsx
<div style={{ marginBottom: '32px', paddingTop: '24px' }}>
```

**After:**
```jsx
<div className="mb-4 pt-3">
```

## Support

For questions or issues with the responsive system, refer to this documentation or check the `App.css` file for the complete utility class definitions.
