import type { KeyboardEvent } from 'react';

/**
 * Attach as onKeyDown on a username input to make the spacebar a true
 * no-op — the keystroke never reaches the field at all, instead of
 * being typed and then stripped afterward by a slugify/sanitize step
 * in onChange (which still causes a visible re-render per press).
 *
 * This is a UX-layer guard only, not a validation guard: paste, IME
 * composition, and programmatic value changes can still introduce a
 * space, so the existing format validation (regex/schema) on each
 * field remains the actual source of truth. This just stops the most
 * common way a space gets in — someone pressing the spacebar key.
 */
export function blockSpaceKey(event: KeyboardEvent<HTMLInputElement>) {
  if (event.key === ' ') {
    event.preventDefault();
  }
}