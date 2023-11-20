import { UserInput } from "./types";
import { View } from "./view";
import { userAgeService } from "./services/userAgeService";
import validatorService from "./services/validatorService";
import { DateError } from "./errorhandling/error";

export class Controller {
    constructor(private view: View) {
    }

    handleSubmit(userInput: UserInput) {
        this.view.clearError();
        const result = validatorService.validateUserInput(userInput);
        console.log(result);
        if (result.isFailure()) {
            let errors = result.error.reduce((acc: {[prop: string]: DateError}, cur: DateError) => {
                if (!(cur.name in acc)) {
                    acc[cur.name] = cur;
                }
                return acc;
            }, {});
            console.log(errors);
            this.view.renderError(Object.values(errors));
        } else {
            const {day, month, year} = userInput;
            const userDate = new Date(year, month - 1, day);
            const userAge = userAgeService.calcUserAge(userDate);
            this.view.renderResult(userAge);
        }
        
    }

    handleInput() {
        this.view.clearError();
    }

    init() {
        this.view.onSubmit(this.handleSubmit.bind(this));
        this.view.onInput(this.handleInput.bind(this));
    }
}
