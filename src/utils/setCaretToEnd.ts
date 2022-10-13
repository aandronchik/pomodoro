export function setCaretToEnd(el: HTMLInputElement): void {
  el.focus();
  const length = el.value.length;
  el.setSelectionRange(length, length);
}
