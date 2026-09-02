import { format, localeFormat } from "light-date";

import type { StringWithSuggestion } from "./type";

export function isValidDate(date: Date) {
  return !Number.isNaN(date.getTime());
}

type FormatDateType = "date-month-year-long" | "date-month-year-short";

export function formatDate(date: Date, formatType: StringWithSuggestion<FormatDateType>) {
  if (!isValidDate(date)) {
    return "-";
  }

  if (formatType === "date-month-year-long") {
    return format(date, `{dd} ${localeFormat(date, "{MMMM}")} {yyyy}`);
  }

  if (formatType === "date-month-year-short") {
    return format(date, `{dd} ${localeFormat(date, "{MMM}")} {yyyy}`);
  }

  return format(date, formatType);
}
