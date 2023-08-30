import { AuthenticatedContext } from '@common/context'
import { UserRepository } from '@features/user/repositories/user.repository'
import { User } from '@features/user/schemas/user.schema'
import { RequestContext } from '@medibloc/nestjs-request-context'
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

    const ctx: AuthenticatedContext = RequestContext.get()
    const authenticatedUser = ctx.user

    if (authenticatedUser && isFieldTaken) {
      return authenticatedUser[field as keyof User] === isFieldTaken[field as keyof User]
    }
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
