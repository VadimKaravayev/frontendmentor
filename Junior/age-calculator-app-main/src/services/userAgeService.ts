import { UserAge } from "../types";

export const userAgeService = {
    calcUserAge(userDate: Date): UserAge {
        const currentDate = new Date();
        let years = currentDate.getFullYear() - userDate.getFullYear();
        let months = currentDate.getMonth() - userDate.getMonth();
        let days = currentDate.getDate() - userDate.getDate();

        if (months < 0 || (months === 0 && days < 0)) {
            years--;
            months += 12;
        }

        if (days < 0) {
            months--;
            const lastMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, userDate.getDate());
            const dayInMilis = 1000 * 60 * 60 * 24;
            days = Math.floor((currentDate.getTime() - lastMonth.getTime()) / dayInMilis);
        }

        return {
            days, months, years
        };
    }
};