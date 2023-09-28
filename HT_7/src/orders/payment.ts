export class Payment {
    constructor(
        public type: string,
        public address?: any,
        public creditCard?: any
    ) {}
}