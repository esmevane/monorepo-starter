import { parseISO, format } from "date-fns";

export function DisplayDate({
  date,
}: ReactProps<{ date: string | number | Date }>) {
  const parsed = parseISO(String(date));
  return <time dateTime={String(date)}>{format(parsed, "LLLL d, yyyy")}</time>;
}
