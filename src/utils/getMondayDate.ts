export function getMondayDate(weekIndex: number): Date {
  const d = new Date();
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  const weekOffset = 7 * weekIndex

  const monday = new Date(d.setDate(diff - weekOffset));
  
  return monday;
}
