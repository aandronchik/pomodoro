export function getWeekDates(mondayDate: Date): Date[] {
  const weekDates = [];
  
  for (let i = 0; i < 7; i++) {
    const d = new Date(mondayDate);
    weekDates.push(new Date(d.setDate(mondayDate.getDate() + i)));
  }

  return weekDates;
}
