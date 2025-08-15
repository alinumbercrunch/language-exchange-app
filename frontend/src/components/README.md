# Landing Page Components

This directory contains the modular components for the Language Exchange landing page. Each component is designed to be reusable and configurable with TypeScript interfaces.

## Components Overview

### Navigation
**File:** `Navigation.tsx`
**Purpose:** Reusable navigation bar with configurable brand name
**Props:**
- `brandName?: string` - The brand name to display (default: "LangExchange")

### HeroSection
**File:** `HeroSection.tsx`
**Purpose:** Main hero section with title, subtitle, CTA buttons, and hero image
**Props:**
- `title?: React.ReactNode` - Main heading (supports JSX for styled text)
- `subtitle?: string` - Description text below the title
- `imageSrc?: string` - Hero image source path
- `imageAlt?: string` - Alt text for the hero image
- `stats?: object` - Statistics to display (rating, learners, languages)

### FeaturesSection
**File:** `FeaturesSection.tsx`
**Purpose:** Features section with grid of feature cards
**Components:**
- `FeatureCard` - Individual feature card component
- `FeaturesSection` - Main section containing multiple feature cards

**Props:**
- `title?: string` - Section heading
- `subtitle?: string` - Section description
- `features?: FeatureProps[]` - Array of features to display

### StatsSection
**File:** `StatsSection.tsx`
**Purpose:** Statistics display with numbers and descriptions
**Components:**
- `StatItem` - Individual statistic item
- `StatsSection` - Main section containing stats grid

**Props:**
- `title?: string` - Section heading
- `stats?: StatItemProps[]` - Array of statistics
- `backgroundColor?: string` - Background color class

### CTASection
**File:** `CTASection.tsx`
**Purpose:** Call-to-action section with buttons
**Props:**
- `title?: string` - Main CTA heading
- `subtitle?: string` - CTA description
- `primaryButtonText?: string` - Primary button text
- `primaryButtonHref?: string` - Primary button link
- `secondaryButtonText?: string` - Secondary button text
- `secondaryButtonHref?: string` - Secondary button link
- `backgroundColor?: string` - Background color class
- `showSecondaryButton?: boolean` - Whether to show secondary button

### Footer
**File:** `Footer.tsx`
**Purpose:** Complete footer with links, social media, and company info
**Props:**
- `brandName?: string` - Brand name in footer
- `description?: string` - Brand description
- `sections?: FooterSectionProps[]` - Footer link sections
- `socialLinks?: array` - Social media links with icons
- `copyrightText?: string` - Copyright notice

## Usage Example

```tsx
import { 
  Navigation, 
  HeroSection, 
  FeaturesSection, 
  StatsSection, 
  CTASection, 
  Footer 
} from '@/components';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navigation brandName="LangExchange" />
      <HeroSection />
      <FeaturesSection />
      <StatsSection />
      <CTASection />
      <Footer />
    </div>
  );
}
```

## Design Principles

1. **Configurable**: All components accept props for customization
2. **TypeScript**: Full TypeScript support with interfaces
3. **Responsive**: Mobile-first responsive design using Tailwind CSS
4. **Accessible**: Proper semantic HTML and ARIA attributes
5. **Reusable**: Components can be used in different pages/contexts
6. **Maintainable**: Clear separation of concerns and modular structure

## Dependencies

- React 18+
- Next.js 15+
- TypeScript
- Tailwind CSS
- Lucide React (for icons)

## Integration with Project Patterns

These components are designed to work with the existing project architecture:
- Follow the same TypeScript patterns used in other project files
- Can be enhanced with `asyncHandler` functions for data fetching
- Compatible with the existing service layer architecture
- Styled with the same Tailwind CSS configuration
