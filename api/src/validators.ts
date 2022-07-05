import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from "class-validator";

export function IsNotInDenyList(
  denyList: string[],
  validationOptions?: ValidationOptions
) {
  return function (object: unknown, propertyName: string) {
    registerDecorator({
      name: "isNotInDenyList",
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          return !denyList.includes(value);
        },
        defaultMessage(): string {
          return "value is not allowed.";
        },
      },
    });
  };
}
