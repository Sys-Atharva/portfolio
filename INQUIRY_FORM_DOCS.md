# InquiryForm Component Documentation

## Overview
A premium, ultra-minimalist inquiry form component built for developer portfolios. Features glassmorphism design, smooth animations, and comprehensive form validation.

## Features

### Design
- **Color Palette**: Obsidian Black (#0B0B0B) and Titanium Silver (#A1A1A1)
- **Glassmorphism Effect**: Frosted glass appearance with subtle border glow
- **Ultra-Minimalist**: Clean, spacious layout with premium aesthetics
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop

### Animations
- **Entrance Animation**: Fade in and slide up using Framer Motion
- **Staggered Fields**: Each form field animates sequentially
- **Interactive Elements**: Smooth transitions and hover effects

### Form Fields
1. **Full Name** - Text input with validation (min 2 characters)
2. **Phone Number** - Tel input with validation (min 10 characters)
3. **Email Address** - Email input with format validation
4. **Description/Query** - Textarea with 4-5 rows, min 10 and max 500 characters

### Focus States
- Input borders transition from dark grey to Titanium Silver on focus
- Ring effect adds subtle glow for better visual feedback
- Smooth transitions for all interactive states

### Submit Button
- Gradient background (Titanium Silver)
- Hover effects: 
  - Enhanced shadow with silver glow
  - Reversed gradient on hover
  - Slight scale increase
- Disabled state during submission
- Loading text feedback

### Validation
- Real-time error messages using React Hook Form and Zod
- Validation feedback displayed below each field
- Form prevents submission if validation fails

## Installation

The component is already integrated. No additional dependencies needed (all required packages are already installed):
- `react`
- `framer-motion`
- `react-hook-form`
- `zod`
- `@hookform/resolvers`

## Usage

### Basic Implementation
```tsx
import { InquiryForm } from '@/components/InquiryForm';

function MyPage() {
  return (
    <div>
      <InquiryForm />
    </div>
  );
}
```

### View Demo
Navigate to `/inquiry` in your portfolio to see the component in action with styling context.

## Component Structure

### InquiryForm.tsx
Located at: `src/components/InquiryForm.tsx`

**Main Sections:**
1. **Validation Schema**: Zod schema defining form field requirements
2. **Component State**: Manages submission state and status
3. **Form Handling**: React Hook Form integration with validation
4. **UI Elements**:
   - Border glow effect container
   - Glassmorphic card background
   - Header section
   - Form fields with error messages
   - Submit button with status feedback

### InquiryFormDemo.tsx
Located at: `src/pages/InquiryFormDemo.tsx`

Showcase page featuring:
- Full-page background with gradient
- Component demo
- Feature highlights
- Additional styling context

## Customization Guide

### Colors
All color values can be customized by replacing hex values:
- Primary Dark: `#0B0B0B` (Obsidian Black)
- Primary Light: `#A1A1A1` (Titanium Silver)
- Accent: `#1A1A1A` (Dark grey)

### Styling
Modify Tailwind classes to adjust:
- **Spacing**: Change `p-8` for padding, `gap-5` for gaps
- **Rounded Corners**: Adjust `rounded-2xl` values
- **Shadows**: Modify `shadow-2xl` for intensity
- **Border Colors**: Change `border-[#A1A1A1]/20` for opacity levels

### Animation Timing
Adjust animation duration in `containerVariants` and `itemVariants`:
```tsx
transition: {
  duration: 0.6,  // Change this value
  staggerChildren: 0.1,  // Change stagger spacing
}
```

### Form Fields
To add/remove fields:
1. Update validation schema in `inquiryFormSchema`
2. Add/remove field component in JSX
3. Register field with `{...register('fieldName')}`
4. Add error handling: `{errors.fieldName && ...}`

### API Integration
Replace the placeholder in the `onSubmit` function:
```tsx
// Uncomment and customize:
const response = await fetch('/api/inquiries', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data),
});
```

## Responsive Behavior

- **Mobile (< 768px)**: 
  - Single column layout
  - Adjusted padding and font sizes
  - Touch-friendly input heights
  
- **Tablet (768px - 1024px)**: 
  - Standard layout with optimized spacing
  
- **Desktop (> 1024px)**: 
  - Maximum width constraint (max-w-md)
  - Full hover effects enabled

## Accessibility Features

- Proper label associations with form inputs
- Error messages with semantic markup
- Clear focus states for keyboard navigation
- Semantic HTML structure
- Color contrast meets WCAG standards

## Browser Support

Works on all modern browsers:
- Chrome/Edge 88+
- Firefox 87+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Files Created

1. **Component**: `src/components/InquiryForm.tsx`
2. **Demo Page**: `src/pages/InquiryFormDemo.tsx`
3. **Updated**: `src/App.tsx` (added route)

## Route

Access the form demo at: `/portfolio/inquiry`

## Form Validation Rules

| Field | Min | Max | Required |
|-------|-----|-----|----------|
| Full Name | 2 chars | - | Yes |
| Phone Number | 10 chars | - | Yes |
| Email | Valid format | - | Yes |
| Description | 10 chars | 500 chars | Yes |

## Success/Error Handling

- **Success**: Green message displayed for 3 seconds
- **Error**: Red message displayed for 3 seconds
- **Submission State**: Button disabled with loading text
- **Form Reset**: Clears on successful submission

## Future Enhancements

Potential improvements:
- Email service integration (SendGrid, Mailgun, Resend)
- Analytics tracking for form interactions
- Advanced validation (phone number formatting)
- File attachment support
- Multi-step form variant
- Dark/light theme toggle
- Internationalization (i18n) support
