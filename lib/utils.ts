import { differenceInCalendarDays, differenceInYears, format } from "date-fns";
import { es } from "date-fns/locale";

export function formatDate(date: string) {
  return format(new Date(date), "d 'de' MMMM 'de' yyyy", { locale: es });
}

export function formatDateShort(date: string) {
  return format(new Date(date), "MMM yyyy", { locale: es });
}

export function daysSince(date: string) {
  return differenceInCalendarDays(new Date(), new Date(date));
}

export function yearsSince(date: string) {
  return differenceInYears(new Date(), new Date(date));
}
