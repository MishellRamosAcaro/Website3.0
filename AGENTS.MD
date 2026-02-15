## Technology Stack

- **Framework**: Vue 3 with Composition API
- **Build Tool**: Vite
- **Language**: TypeScript (strict mode)
- **Component Library**: PrimeVue
- **Styling**: Tailwind CSS
- **Routing**: Vue Router
- **Validation**: Zod
- **Animations**: Framer Motion (optional, respecting `prefers-reduced-motion`)

## Project Structure

```
src/
├── assets/           # Images, videos, fonts
├── components/
│   ├── layout/       # TopBar, Footer
│   ├── sections/     # Home page sections (Hero, Stats, FAS, etc.)
│   └── ui/           # Reusable UI components (CourseCard, DemoModal)
├── views/            # Page components (HomeView, LoginView)
├── composables/      # Reusable Composition API logic
├── lib/
│   ├── data/         # Mock data (stats, partners, courses, fasDemo)
│   ├── utils/        # Utility functions
│   └── validation/   # Zod schemas
├── types/            # TypeScript type definitions
├── router/           # Vue Router configuration
└── styles/           # Global styles, Tailwind imports
```

## Architecture Principles

### SOLID Principles

1. **Single Responsibility**: Each component/composable has one clear purpose
2. **Open/Closed**: Components are extensible through props and slots
3. **Liskov Substitution**: Components can be replaced with compatible alternatives
4. **Interface Segregation**: Composables expose only necessary methods
5. **Dependency Inversion**: Dependencies are injected via props/composables

### KISS (Keep It Simple, Stupid)

- Prefer simple, readable code over clever solutions
- Use standard Vue patterns and conventions
- Avoid over-engineering
- Clear naming conventions

### DRY (Don't Repeat Yourself)

- Reusable components in `components/ui/`
- Shared logic in `composables/`
- Mock data centralized in `lib/data/`
- Validation schemas in `lib/validation/`
- Utility functions in `lib/utils/`

## Component Guidelines

### Component Structure

```vue
<template>
  <!-- Semantic HTML with proper ARIA labels -->
</template>

<script setup lang="ts">
// Imports
// Props/Emits definitions
// Composables
// Reactive state
// Methods
// Lifecycle hooks
</script>

<style scoped>
/* Component-specific styles (if needed) */
</style>
```

### Naming Conventions

- **Components**: PascalCase (e.g., `TopBar.vue`, `HeroSection.vue`)
- **Files**: kebab-case for non-components (e.g., `use-contact.ts`)
- **Variables/Functions**: camelCase
- **Constants**: UPPER_SNAKE_CASE
- **Types/Interfaces**: PascalCase

### Component Organization

1. **Layout Components** (`components/layout/`): TopBar, Footer
2. **Section Components** (`components/sections/`): Home page sections
3. **UI Components** (`components/ui/`): Reusable, generic components
4. **Views** (`views/`): Full page components

# Data Management

### Mock Data

All mock data is centralized in `lib/data/`.

### Validation

- Use Zod schemas in `lib/validation/`
- Validate all user inputs
- Provide accessible error messages
- Client-side validation before submission

## Styling Guidelines

### Tailwind CSS

- Use utility classes for styling
- Mobile-first responsive design
- Custom classes in `styles/main.css` for repeated patterns
- Consistent spacing and typography


## Security

### Headers

Security headers configured in `vite.config.ts`:
- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy`: Disable unused features
- `Content-Security-Policy`: Restrict resource loading

### Form Protection

- Honeypot fields (invisible, anti-spam)
- Rate limiting (in-memory, simple)
- Zod validation (client-side)
- No `v-html` usage (sanitize if needed)
- Manager packages with pnpm
- Use the latest version of the libraries, frameworks, tools, languages, databases, servers, networks, and security

## SEO

### Metadata

- Title and description per page
- OpenGraph tags for social sharing
- Twitter Card tags
- Canonical URLs

### Structured Data

- JSON-LD format
- Organization schema (Home page)
- WebSite schema (Home page)

### Semantic HTML

- Proper heading hierarchy (H1 only in Hero, H2 per section)
- ARIA labels where needed
- Alt text for all images

## Accessibility

### Requirements

- Semantic HTML5 elements
- ARIA labels for interactive elements
- Keyboard navigation support
- Focus indicators (visible on all interactive elements)
- Color contrast (WCAG AA minimum)
- `prefers-reduced-motion` support for animations

### Best Practices

- Use proper form labels
- Associate error messages with inputs
- Provide skip links for navigation
- Ensure all interactive elements are keyboard accessible

## Performance

### Optimization

- Lazy loading for images and sections
- Code splitting (route-based)
- Optimized images (proper formats, sizes)
- Minimal JavaScript (tree-shaking)
- Video lazy loading with poster image

### Best Practices

- Use `loading="lazy"` for images below the fold
- Defer non-critical JavaScript
- Optimize bundle size
- Use efficient animations

## Code Quality

### TypeScript

- Strict mode enabled
- No `any` types (use `unknown` if needed)
- Proper type definitions for all data
- Type-safe component props

### ESLint & Prettier

- ESLint for code quality
- Prettier for code formatting
- Consistent code style across the project

### Testing Considerations

- Components should be testable
- Composables should be pure functions where possible
- Mock data for testing


Use pnpm as package manager and vite as build tool.