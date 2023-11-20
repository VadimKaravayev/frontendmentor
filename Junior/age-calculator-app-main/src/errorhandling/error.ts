export class DateError {
    name: string = '';
    constructor(public message: string) {}
}

export class DayError extends DateError {
    name: string = 'day';
}

export class MonthError extends DateError {
    name: string = 'month';
}

export class YearError extends DateError {
    name: string = 'year';
}