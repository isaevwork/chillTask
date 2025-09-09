# Coding Standards

## TypeScript

- Use strict mode enabled
- Prefer interfaces over types for object shapes
- Use proper type annotations, avoid `any`
- Use path aliases: `@shared/*` for shared package

## React

- Use functional components with hooks
- Use SCSS modules for styling: `import cls from './Component.module.scss'`
- Use classnames library for conditional classes: `cn(cls.className, { [cls.active]: isActive })`
- Follow React 19 patterns

## Common Patterns to Follow

- Use dependency injection in services
- Implement proper separation of concerns
- Use consistent error handling patterns
- Follow the established folder structure
- Use meaningful variable and function names

## Anti-patterns to Avoid

- Don't use `any` type in TypeScript
- Don't mix business logic in components
- Don't hardcode API URLs
- Don't ignore error handling
- Don't create deep nested folder structures
- Don't use inline styles when SCSS modules are available
