/** Demo availability only. Replace with a calendar provider after approval. */
export const demoTimes = ["10:00", "11:30", "14:00", "16:00"];
export function monthLabel(month: Date) {
  return month.toLocaleDateString("en-GB", { month: "long", year: "numeric" });
}
export function calendarCells(month: Date) {
  const start = (month.getDay() + 6) % 7;
  const length = new Date(
    month.getFullYear(),
    month.getMonth() + 1,
    0,
  ).getDate();
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return [
    ...Array.from({ length: start }, () => null),
    ...Array.from({ length }, (_, i) => {
      const date = new Date(month.getFullYear(), month.getMonth(), i + 1);
      const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(i + 1).padStart(2, "0")}`;
      return {
        day: i + 1,
        key,
        past: date < today,
        label: date.toLocaleDateString("en-GB", {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric",
        }),
      };
    }),
  ];
}
