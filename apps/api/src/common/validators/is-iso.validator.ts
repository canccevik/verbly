import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator
} from 'class-validator'
import iso from 'iso-639-1'

@ValidatorConstraint()
export class IsISOValidator implements ValidatorConstraintInterface {
  public validate(value: string): boolean {
    return iso.validate(value)
  }

  public defaultMessage(): string {
    return 'ISO-639-1 code is not valid'
  }
}

export function IsISO() {
  return (target: Object, propertyName: string): void => {
    registerDecorator({
      target: target.constructor,
      constraints: [],
      validator: IsISOValidator,
      propertyName
    })
  }
}
