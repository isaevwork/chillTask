# Architecture Patterns

## Frontend Architecture (Feature-Sliced Design)

- `app/` - Application layer (providers, routing, global styles)
- `pages/` - Page components (MainPage, etc.)
- `widgets/` - Complex UI blocks (Header, Navbar)
- `features/` - Business features (TimeCounter, Counter)
- `shared/` - Reusable components and utilities
- `packages/shared/` - Shared types between frontend and backend

## File Naming

- Components: PascalCase (TimeCounter.tsx)
- Files: camelCase (timeEntryService.ts)
- SCSS modules: ComponentName.module.scss
- Folders: camelCase for features, kebab-case for pages

## Import/Export Patterns

- Use absolute imports with path aliases
- Group imports: external libraries first, then internal modules
- Use named exports for components and functions
- Use default exports for main component files
