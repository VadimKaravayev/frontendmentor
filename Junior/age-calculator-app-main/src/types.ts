export interface UserInput {
    day: number;
    month: number;
    year: number;
}

export interface UserAge {
    days: number;
    months: number;
    years: number;
}

export interface SubmitHandler {
    (userInput: UserInput): void
}


export type Valid = true;

export class FormInput {

    readonly day: number;
    readonly month: number;
    readonly year: number;

    constructor(day: number, month: number, year: number) {
        this.day = day;
        this.month = month;
        this.year = year;
    }
}