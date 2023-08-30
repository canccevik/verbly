import { UserDocument } from '@features/user/schemas'
import { RequestContext } from '@medibloc/nestjs-request-context'

export class AuthenticatedContext extends RequestContext {
  public user: UserDocument
}
