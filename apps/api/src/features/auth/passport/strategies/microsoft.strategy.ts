import { Config, ENV } from '@config/index'
import { UserRepository } from '@features/user/repositories'
import { BadRequestException, Inject, Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-microsoft'

export const MICROSOFT_STRATEGY = 'microsoft'

@Injectable()
export class MicrosoftStrategy extends PassportStrategy(Strategy, MICROSOFT_STRATEGY) {
  constructor(
    @Inject(ENV) private readonly config: Config,
    private readonly userRepository: UserRepository
  ) {
    const callbackUrl = `http://localhost:${config.PORT}/${config.GLOBAL_PREFIX}/auth/login/microsoft/callback`

    super({
      clientID: config.MICROSOFT_CLIENT_ID,
      clientSecret: config.MICROSOFT_CLIENT_SECRET,
      callbackURL: callbackUrl,
      scope: ['user.read']
    })
  }

  public async validate(
    accessToken: string,
    refreshToken: string,
    profile: Record<string, any>,
    done: (err: any, user: any, info?: any) => void
  ): Promise<void> {
    const { mail, preferredLanguage } = profile._json
    let user = await this.userRepository.findOne({ microsoftId: profile.id })

    if (!user) {
      user = await this.userRepository
        .create({
          email: mail,
          username: mail.split('@')[0],
          microsoftId: profile.id,
          nativeLanguage: preferredLanguage.split('-')[0]
        })
        .catch(() => {
          throw new BadRequestException('Bad credentials.')
        })
    }
    done(null, user)
  }
}
