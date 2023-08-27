import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-local'
import { AuthService } from '../../services/auth.service'
import { UserDocument } from '@features/user/schemas'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super()
  }

  public async validate(username: string, password: string): Promise<UserDocument> {
    const user = await this.authService.validateUser(username, password)

    if (!user) {
      throw new UnauthorizedException('Wrong username or password.')
    }
    if (!user.isEmailConfirmed) {
      throw new UnauthorizedException('You must verify your account.')
    }
    return user
  }
}
