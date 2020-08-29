import { TimeConversionResult } from '@/converters/TimeConverter/interfaces/TimeConversionResult';

export class TimeConverter {
    public static fromMilliseconds(milliseconds: number): TimeConversionResult {
        const seconds: number = TimeConverter.millisecondsToSeconds(milliseconds);
        const minutes: number = TimeConverter.secondsToMinutes(seconds);
        const hours: number = TimeConverter.minutesToHours(minutes);
        const days: number = TimeConverter.hoursToDays(hours);
        const weeks: number = TimeConverter.daysToWeeks(days);
        const months: number = TimeConverter.weeksToMonths(weeks);
        const years: number = TimeConverter.monthsToYears(months);
        return {
            milliseconds,
            seconds,
            minutes,
            hours,
            days,
            weeks,
            months,
            years
        };
    }

    private static millisecondsToSeconds(milliseconds: number): number {
        return Math.floor(milliseconds / 1000);
    }

    private static secondsToMinutes(seconds: number): number {
        return Math.floor(seconds / 60);
    }

    private static minutesToHours(minutes: number): number {
        return Math.floor(minutes / 60);
    }

    private static hoursToDays(hours: number): number {
        return Math.floor(hours / 24);
    }

    private static daysToWeeks(days: number): number {
        return Math.floor(days / 7);
    }

    private static weeksToMonths(weeks: number): number {
        return Math.floor(weeks / 30);
    }

    private static monthsToYears(months: number): number {
        return Math.floor(months / 365);
    }
}
