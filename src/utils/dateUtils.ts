import { format, isAfter, isBefore, isEqual, parseISO, addDays, differenceInDays } from 'date-fns';
import { DateRange } from '../types';

/**
 * Format a date for display
 */
export const formatDate = (date: Date | string, formatStr: string = 'MMM dd, yyyy'): string => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return format(dateObj, formatStr);
};

/**
 * Format a date range for display
 */
export const formatDateRange = (startDate: Date | string, endDate: Date | string): string => {
  const start = typeof startDate === 'string' ? parseISO(startDate) : startDate;
  const end = typeof endDate === 'string' ? parseISO(endDate) : endDate;
  
  const startFormatted = format(start, 'MMM dd');
  const endFormatted = format(end, 'MMM dd, yyyy');
  
  return `${startFormatted} - ${endFormatted}`;
};

/**
 * Check if two date ranges overlap
 */
export const doDateRangesOverlap = (
  range1: { startDate: Date; endDate: Date },
  range2: { startDate: Date; endDate: Date }
): boolean => {
  const start1 = range1.startDate;
  const end1 = range1.endDate;
  const start2 = range2.startDate;
  const end2 = range2.endDate;

  return (
    (isAfter(start1, start2) || isEqual(start1, start2)) && (isBefore(start1, end2) || isEqual(start1, end2)) ||
    (isAfter(start2, start1) || isEqual(start2, start1)) && (isBefore(start2, end1) || isEqual(start2, end1))
  );
};

/**
 * Get overlapping days between two date ranges
 */
export const getOverlappingDays = (
  range1: { startDate: Date; endDate: Date },
  range2: { startDate: Date; endDate: Date }
): number => {
  if (!doDateRangesOverlap(range1, range2)) {
    return 0;
  }

  const overlapStart = isAfter(range1.startDate, range2.startDate) ? range1.startDate : range2.startDate;
  const overlapEnd = isBefore(range1.endDate, range2.endDate) ? range1.endDate : range2.endDate;

  return differenceInDays(overlapEnd, overlapStart) + 1;
};

/**
 * Validate if a date range is valid
 */
export const isValidDateRange = (startDate: Date, endDate: Date): boolean => {
  return isBefore(startDate, endDate) || isEqual(startDate, endDate);
};

/**
 * Check if a date is in the future
 */
export const isFutureDate = (date: Date): boolean => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return isAfter(date, today) || isEqual(date, today);
};

/**
 * Get the minimum allowed date (today)
 */
export const getMinDate = (): Date => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
};

/**
 * Get the maximum allowed date (1 year from now)
 */
export const getMaxDate = (): Date => {
  return addDays(new Date(), 365);
};

/**
 * Calculate the duration of a date range in days
 */
export const getDateRangeDuration = (startDate: Date, endDate: Date): number => {
  return differenceInDays(endDate, startDate) + 1;
};

/**
 * Sort date ranges by start date
 */
export const sortDateRanges = (ranges: DateRange[]): DateRange[] => {
  return [...ranges].sort((a, b) => a.startDate.getTime() - b.startDate.getTime());
};

/**
 * Merge overlapping date ranges
 */
export const mergeOverlappingRanges = (ranges: DateRange[]): DateRange[] => {
  if (ranges.length <= 1) return ranges;

  const sorted = sortDateRanges(ranges);
  const merged: DateRange[] = [sorted[0]];

  for (let i = 1; i < sorted.length; i++) {
    const current = sorted[i];
    const lastMerged = merged[merged.length - 1];

    if (doDateRangesOverlap(lastMerged, current)) {
      // Merge the ranges
      lastMerged.endDate = isAfter(current.endDate, lastMerged.endDate) ? current.endDate : lastMerged.endDate;
      lastMerged.startDate = isBefore(current.startDate, lastMerged.startDate) ? current.startDate : lastMerged.startDate;
    } else {
      merged.push(current);
    }
  }

  return merged;
};

/**
 * Convert date to ISO string for API
 */
export const toISOString = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

/**
 * Parse ISO string to date
 */
export const fromISOString = (dateString: string): Date => {
  return parseISO(dateString);
};