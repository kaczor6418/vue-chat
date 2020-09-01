export class NotSupportedAlertType extends Error {
    constructor(message: string) {
        super(message);
        this.name = NotSupportedAlertType.name;
    }
}
