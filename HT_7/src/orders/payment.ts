export class Payment {
  constructor(
    public id: string,
    public type: string,
    public address?: string,
    public creditCard?: string,
  ) {}
}
