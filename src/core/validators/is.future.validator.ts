import {
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
    registerDecorator,
} from "class-validator";

@ValidatorConstraint({ name: "IsFutureDate", async: false })
export class IsFutureDateConstraint implements ValidatorConstraintInterface {
    validate(value: any): boolean {
        const date = new Date(value);
        return date > new Date();
    }

    defaultMessage(): string {
        return "date must be in the future";
    }
}

export function IsFutureDate(validationOptions?: ValidationOptions) {
    return function (object: any, propertyName: string): void {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsFutureDateConstraint,
        });
    };
}
