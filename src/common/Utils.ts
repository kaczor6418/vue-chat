import { CONSTANTS } from '@/common/CONSTANTS';

export namespace UTILS {
    export function isNullOrUndefined(value: unknown): value is null | undefined {
        return value == null;
    }

    export function isNullOrUndefinedOrEmpty(value: string | unknown[] | null | undefined): boolean {
        return value == null || value.length === 0;
    }

    /**
     * Will return in following format: **YEAR**-**MONTH**-**DAY** **HOUR**:**MIN**:**SEC**
     */
    export function getCurrentUTCDate(): string {
        const currentDate: Date = new Date();
        const year: string = currentDate.getFullYear().toString();
        let month: string = (currentDate.getMonth() + 1).toString();
        let day: string = currentDate.getDate().toString();
        let hour: string = currentDate.getHours().toString();
        let minutes: string = currentDate.getMinutes().toString();
        let seconds: string = currentDate.getSeconds().toString();
        month = month.length === 1 ? `0${month}` : month;
        day = day.length === 1 ? `0${day}` : day;
        hour = hour.length === 1 ? `0${hour}` : hour;
        minutes = minutes.length === 1 ? `0${minutes}` : minutes;
        seconds = seconds.length === 1 ? `0${seconds}` : seconds;
        return `${year}${CONSTANTS.DATE_DELIMITER}${month}${CONSTANTS.DATE_DELIMITER}${day} ${hour}${CONSTANTS.TIME_DELIMITER}${minutes}${CONSTANTS.TIME_DELIMITER}${seconds}`;
    }
}
