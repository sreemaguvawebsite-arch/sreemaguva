# Social Floating Buttons Guide

## Overview
The website now has beautiful floating WhatsApp and Instagram buttons in the bottom-right corner of all public pages.

## Features

### WhatsApp Button (Green)
- **Icon**: WhatsApp logo
- **Color**: Green gradient (#25D366 → #128C7E)
- **Action**: Opens WhatsApp chat with pre-filled message
- **Hover**: Elevates with shadow effect and color change

### Instagram Button (Pink/Purple Gradient)
- **Icon**: Instagram logo  
- **Color**: Instagram gradient (#E1306C → #C13584 → #833AB4)
- **Action**: Opens your Instagram profile in new tab
- **URL**: https://www.instagram.com/sreemaguva04/
- **Hover**: Elevates with shadow effect and gradient shift

## Visual Effects

1. **Pulse Animation**: Subtle pulsing effect to draw attention
2. **Hover Effect**: Buttons lift up and scale slightly on hover
3. **Shadow**: Drop shadow increases on hover for depth
4. **Smooth Transitions**: All animations use cubic-bezier for smooth feel

## Customization

### Change WhatsApp Number

Edit `src/components/SocialFloatingButtons.jsx`:

```javascript
const whatsappNumber = '+919876543210' // Replace with your number
```

**Format**: Include country code with + (e.g., +91 for India)

### Change WhatsApp Message

Edit the default message:

```javascript
const whatsappMessage = 'Hi! I would like to know more about your services.'
```

### Change Instagram URL

Already set to: `https://www.instagram.com/sreemaguva04/`

To change:

```javascript
const instagramUrl = 'https://www.instagram.com/YOUR_USERNAME/'
```

## Responsive Behavior

### Desktop (>768px)
- Button size: 60x60px
- Icon size: 32x32px
- Position: 2rem from bottom-right

### Tablet (≤768px)
- Button size: 56x56px
- Icon size: 28x28px
- Position: 1.5rem from bottom-right

### Mobile (≤480px)
- Button size: 52x52px
- Icon size: 26x26px
- Position: 1rem from bottom-right

## Accessibility Features

- ✅ Keyboard accessible (can tab to buttons)
- ✅ Focus indicators for keyboard navigation
- ✅ ARIA labels for screen readers
- ✅ Tooltips on hover
- ✅ High contrast for visibility

## Browser Support

Works on all modern browsers:
- ✅ Chrome/Edge
- ✅ Firefox
- ✅ Safari
- ✅ Mobile browsers

## Performance

- **Lightweight**: ~2KB total (CSS + JSX)
- **No external dependencies**: Pure CSS animations
- **GPU accelerated**: Uses transform for smooth animations
- **Z-index**: 9999 (appears above all content)

## Behavior

### Shows On:
- ✅ Homepage
- ✅ Service detail pages
- ✅ All public routes

### Hidden On:
- ❌ Admin pages
- ❌ Print view
- ❌ Login pages

## Testing

1. **Desktop**: Hover to see lift effect and pulse animation
2. **Mobile**: Tap buttons to ensure they open correctly
3. **WhatsApp**: Should open chat with your number and message
4. **Instagram**: Should open profile in new tab
5. **Keyboard**: Tab to buttons and press Enter

## Future Enhancements (Optional)

You can add more social platforms:
- Facebook
- YouTube
- Twitter/X
- LinkedIn
- Phone call button

To add more buttons, edit `SocialFloatingButtons.jsx` and add new button elements following the same pattern.

## Support

If buttons don't appear:
1. Check browser console for errors
2. Verify `SocialFloatingButtons` is imported in `App.jsx`
3. Clear browser cache (Ctrl+F5)
4. Ensure CSS file is loaded

## Notes

- Buttons are fixed positioned (stick to viewport)
- They don't interfere with scrolling
- They stay above all other content
- Mobile users can easily reach them with thumb
