export type Result<E, A> = Failure<E> | Success<A>;

export class Failure<E> {
    constructor(public error: E[]) {}

    isFailure(): this is Failure<E> {
        return true;
    }

    isSuccess(): this is Success<never> {
        return false;
    }
}


export class Success<A> {
    constructor(public value: A) {}

    isSuccess(): this is Success<A> {
        return true;
    }

    isFailure(): this is Failure<never> {
        return false;
    }
}