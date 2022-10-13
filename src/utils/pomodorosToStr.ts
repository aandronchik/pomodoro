export function pomodorosToStr(count: number): string {
  let ending = '';
  if (
    count % 10 === 0 ||
    (count % 10 >= 5 && count % 10 <= 9) ||
    (count % 100 >= 11 && count % 100 <= 19)
  )
    ending = 'ов';
  else if (count % 10 >= 2 && count % 10 <= 4) ending = 'а';
  else if (count % 10 === 1) ending = '';

  return `${count}\u00A0помидор${ending} `.trim();
}
