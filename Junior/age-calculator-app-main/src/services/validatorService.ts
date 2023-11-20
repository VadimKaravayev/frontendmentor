import { Failure, Result, Success } from "../errorhandling/result";
import { UserInput, Valid } from "../types";
import { DateError, DayError, MonthError, YearError } from "../errorhandling/error";

class ValidatorService {

    validateUserInput(userInput: UserInput): Result<DateError, Valid> {
        const {day, month, year} = userInput;
        return this.validateDate(day, month, year);
    }

    private isLeapYear(year: number) {
      return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
    }

    private getMaxDay(month: number, year: number): number {
        if (month === 2) {
            return this.isLeapYear(year) ? 29 : 28
        } else if (month === 12 || month % 2 > 0) {
            return 31;
        } else {
            return 30;
        }
    }

    private validateDate(day: number, month: number, year: number): Result<DateError, Valid> {
        let errors: DateError[] = [];
        if (day === -1) {
            errors.push(new DayError('This field is required'));
        }
        if (month === -1) {
            errors.push(new MonthError('This field is required'));
        }
        if (year === -1) {
            errors.push(new YearError('This field is required'));
        }

        if (day < 1 || day > 31) {
            errors.push(new DayError('Must be a valid day'));
        }

        if (month < 1 || month > 12) {
            errors.push(new MonthError('Must be a valid month'));
        }

        if (year < 1) {
            errors.push(new YearError('Must be a valid year'));
        }

        const currentYear = new Date().getFullYear();
        if (year > currentYear) {
            errors.push(new YearError('Must be in the past'));
        }

        let maxDay = this.getMaxDay(month, year);
        if (day > maxDay) {
            errors.push(new DayError('Must be a valid day'));
        }
        

        return errors.length 
            ? new Failure(errors) 
            : new Success(true);
    } 
}

export default new ValidatorService();