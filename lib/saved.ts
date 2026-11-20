// Saved pieces live in this browser only. The header and the product pages
// read and write the same list, and tell each other about changes.

export const SAVED_KEY = "pjw-saved";
export const SAVED_EVENT = "pjw-saved-change";

export function readSaved(): string[] {
  try {
    const list = JSON.parse(window.localStorage.getItem(SAVED_KEY) || "[]");
    return Array.isArray(list) ? list.filter((s): s is string => typeof s === "string") : [];
  } catch {
    return [];
  }
}

export function writeSaved(list: string[]): void {
  try {
    window.localStorage.setItem(SAVED_KEY, JSON.stringify(list));
  } catch {
    /* storage unavailable: the list is kept for this visit only */
  }
  window.dispatchEvent(new Event(SAVED_EVENT));
}
