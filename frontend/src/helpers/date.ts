import { parse, formatISO } from "date-fns";

export function convertToISODate(dateString: string): string {
    const date = parse(dateString, "dd/MM/yyyy", new Date());
    return formatISO(date);
}