# Button `asChild` Pattern

## Why do we need `asChild`?

Normally our `Button` component renders a native `<button>` element.

```tsx
<Button>Save</Button>
```

renders:

```html
<button>Save</button>
```

This is perfect for actions like:

- Form submission
- Opening dialogs
- Calling functions
- Triggering events

---

## The Problem

Sometimes we want a button that **navigates** instead of performing an action.

For example:

```tsx
<Button>
  <Link href="/login">Login</Link>
</Button>
```

This renders:

```html
<button>
    <a href="/login">Login</a>
</button>
```

This is **invalid HTML** because interactive elements cannot be nested inside other interactive elements.

A `<button>` should never contain an `<a>`.

---

## The Solution

Instead of always rendering a `<button>`, allow the component to render **its child element**.

Usage:

```tsx
<Button asChild>
    <Link href="/login">
        Login
    </Link>
</Button>
```

Now the final HTML becomes:

```html
<a href="/login" class="button-styles">
    Login
</a>
```

The `<Link>` receives all button styles while remaining valid HTML.

---

# Implementation

## 1. Install Slot

```bash
npm install @radix-ui/react-slot
```

---

## 2. Import Slot

```tsx
import { Slot } from "@radix-ui/react-slot";
```

---

## 3. Add the prop

```tsx
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    ...
    asChild?: boolean;
}
```

Default value:

```tsx
asChild = false
```

---

## 4. Decide what to render

Inside the component:

```tsx
const Comp = asChild ? Slot : "button";
```

This is the key line.

If:

```tsx
asChild = false
```

then

```tsx
Comp === "button"
```

If:

```tsx
asChild = true
```

then

```tsx
Comp === Slot
```

---

## 5. Render the chosen component

Instead of

```tsx
<button>
```

render

```tsx
<Comp>
```

Likewise replace

```tsx
</button>
```

with

```tsx
</Comp>
```

---

## 6. Only pass button-specific props when rendering a button

```tsx
<Comp
    ref={ref}
    {...(!asChild && {
        type,
        disabled: disabled || loading,
    })}
    className={...}
    {...rest}
>
```

When `asChild` is true, props like:

- `type`
- `disabled`

are omitted because they don't belong on an anchor element.

---

# Why use `Comp`?

A common question is:

> Why not just use `<button>`?

Because `<button>` always renders a button.

We need the component to render either:

```tsx
<button>
```

or

```tsx
<Slot>
```

depending on the value of `asChild`.

Instead of duplicating the JSX:

```tsx
if (asChild) {
    return <Slot>...</Slot>;
}

return <button>...</button>;
```

we simply choose the component first:

```tsx
const Comp = asChild ? Slot : "button";
```

Then render:

```tsx
<Comp>
    ...
</Comp>
```

This keeps the JSX clean and avoids duplication.

---

# Is `Comp` exported?

No.

`Comp` is **only a local variable** inside the `Button` component.

The exported component is still:

```tsx
export const Button = ...
```

Everywhere else in the project we continue using:

```tsx
import { Button } from "@/shared/components/ui/Button";
```

Nothing changes for consumers.

---

# Example

## Normal button

```tsx
<Button onClick={save}>
    Save
</Button>
```

Output:

```html
<button>
    Save
</button>
```

---

## Link styled as a button

```tsx
<Button asChild variant="outline">
    <Link href="/login">
        Login
    </Link>
</Button>
```

Output:

```html
<a href="/login" class="button-styles">
    Login
</a>
```

---

## Benefits

- Valid HTML
- Better accessibility
- No nested interactive elements
- Single reusable Button component
- Works with Next.js `Link`
- Works with React Router `Link`
- Same styles regardless of rendered element

---

# Notes

Our current implementation keeps the following type:

```tsx
forwardRef<HTMLButtonElement, ButtonProps>()
```

This is sufficient for the project.

Technically, `asChild` introduces polymorphic behavior because the component may render an `<a>` instead of a `<button>`. Advanced UI libraries solve this with generic polymorphic types, but that adds significant complexity.

Until TypeScript presents a real limitation, the simpler implementation is preferred because it is easier to maintain and understand.