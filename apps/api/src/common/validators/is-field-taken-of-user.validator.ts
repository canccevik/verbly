import { UserRepository } from '@features/user/user.repository'
import { User } from '@features/user/user.schema'
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator
} from 'class-validator'

@ValidatorConstraint({ async: true })
export class IsFieldTakenOfUserValidator implements ValidatorConstraintInterface {
  constructor(private readonly userRepository: UserRepository) {}

  public async validate(value: string, args: ValidationArguments): Promise<boolean> {
    const [field] = args.constraints
    const isFieldTaken = await this.userRepository.findOne({ [field]: value })
    return !isFieldTaken
  }

  public defaultMessage(args: ValidationArguments): string {
    const [field] = args.constraints
    return `${field} is already taken`
  }
}

export function IsFieldTakenOfUser(field: keyof User) {
  return (target: Object, propertyName: string): void => {
    registerDecorator({
      target: target.constructor,
      constraints: [field],
      validator: IsFieldTakenOfUserValidator,
      propertyName
    })
  }
}
