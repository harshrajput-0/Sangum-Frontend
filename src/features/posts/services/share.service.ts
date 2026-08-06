export interface SharePayload {
  title: string;
  url: string;
}

export type ShareResult = 'shared' | 'copied' | 'unavailable';

/**
 * Wraps the Web Share API with a clipboard fallback — mirrors the
 * mock's sharePostNative(): try navigator.share first, fall back to
 * copying the link. Nothing here is backend-dependent, so there's no
 * TODO(api) seam — this stays as-is once the API exists.
 */
export async function sharePost({ title, url }: SharePayload): Promise<ShareResult> {
  if (typeof navigator !== 'undefined' && navigator.share) {
    try {
      await navigator.share({ title, url });
      return 'shared';
    } catch {
      // User cancelled the native share sheet — not an error, just a no-op.
      return 'unavailable';
    }
  }

  if (typeof navigator !== 'undefined' && navigator.clipboard) {
    await navigator.clipboard.writeText(url);
    return 'copied';
  }

  return 'unavailable';
}

/** Used by the follow-menu's standalone "Copy link to post" action. */
export async function copyPostLink(url: string): Promise<boolean> {
  if (typeof navigator === 'undefined' || !navigator.clipboard) return false;
  await navigator.clipboard.writeText(url);
  return true;
}