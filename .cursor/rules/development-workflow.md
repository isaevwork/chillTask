# Development Workflow

## Commands

- Use `npm run dev` to start frontend
- Frontend runs on http://localhost:3000
- Use `npm run build` to build all packages
- Use `npm run lint` to lint all packages

## Code Generation Guidelines

- When creating new components, follow the feature-sliced design structure
- Create corresponding SCSS modules for styling
- Use proper TypeScript interfaces
- Implement proper error boundaries and loading states
- Follow the existing naming conventions

## Performance Considerations

- Use React.memo for expensive components
- Implement proper loading states
- Use database indexes for frequently queried fields
- Implement pagination for large data sets

## Error Handling

- Frontend: Use try/catch in async functions, show user-friendly error messages
- Use proper error boundaries
- Implement proper loading states
