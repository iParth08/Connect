# Connect - Video Call

> A `ZOOM` clone

## Description

## Technologies

1. [Next.js](https://nextjs.org/)
2. [TailwindCSS](https://tailwindcss.com/)
3. [Shadcn](https://ui.shadcn.com/)

### Dependencies

## Go through Resources

## Learning While Coding

1. Working with `Nextjs` framework
2. Using `Shadcn` for styling
3. `Clerk` for authentication

## More to Learn

## Problems Resolved

```js
const protectedRoutes = createRouteMatcher([
  "/",
  "/upcoming",
  "/previous",
  "/recordings",
  "/personal-room",
  "/meeting(.*)",
]);

export default clerkMiddleware((auth, req) => {
  if (protectedRoutes(req)) auth().protect();
});
```
