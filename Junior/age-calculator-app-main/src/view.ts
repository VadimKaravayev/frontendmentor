import { SubmitHandler, UserInput, UserAge, FormInput } from "./types";
import { DateError } from "./errorhandling/error";

export class View {
    constructor(private formSelector: string) {
    }

    private extractUserInput(form: HTMLFormElement): UserInput {
        const props = ['day', 'month', 'year'];
        const formData = new FormData(form);
        const reducer = (acc: UserInput, curr: string) => {
            acc[curr as keyof UserInput] = +(formData.get(curr) as string || -1);
            return acc;
        };

        const userInput: UserInput = props.reduce(reducer, {} as UserInput);
        return userInput;
    }

    onSubmit(handler: SubmitHandler) {
        const form = document.querySelector(this.formSelector) as HTMLFormElement;
        
        form.addEventListener('submit', (e: SubmitEvent) => {
            e.preventDefault();
            const userInput = this.extractUserInput(e.target as HTMLFormElement);
            const formInput = new FormInput(userInput.day, userInput.month, userInput.year);
            console.log(formInput);
            handler(userInput);
        })
    }

    onInput(handler: () => void) {
        const inputs: NodeListOf<HTMLInputElement> = document.querySelectorAll(this.formSelector + " .control input");
        inputs.forEach((element: HTMLInputElement) => {
            element.addEventListener('input', handler);
        });

    }

    renderResult(userAge: UserAge) {
        this.insertResultValue('years-value', userAge.years);
        this.insertResultValue('months-value', userAge.months);
        this.insertResultValue('days-value', userAge.days);
    }

    private insertResultValue<T>(id: string, value: T) {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = "" + value;
        }
    }

    renderError(error: DateError[]) {
        const formElement = document.querySelector(this.formSelector);
        formElement?.classList.add('invalid');
        error.forEach((err) => {
            this.insertErrorMsg(err.name, err.message);
        });
    }

    private insertErrorMsg(id: string, msg: string) {
        const element = document.getElementById(id);
        if (element) {
            const msgTemplate = `<span class="error-msg">${msg}</span>`;
            element?.insertAdjacentHTML('afterend', msgTemplate);
        }
    }

    clearError() {
        const form = document.querySelector(this.formSelector);
        if (form) {
            form.classList.remove('invalid');
            const elements: NodeListOf<Element> = form.querySelectorAll('.error-msg');
            elements.forEach(element => element.remove());
        }
    }
}
