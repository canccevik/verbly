import { Config, ENV } from '@config/index'
import { UserRepository } from '@features/user/repositories'
import { BadRequestException, Inject, Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Profile, Strategy, VerifyCallback } from 'passport-google-oauth20'

export const GOOGLE_STRATEGY = 'google'

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, GOOGLE_STRATEGY) {
  constructor(
    @Inject(ENV) private readonly config: Config,
    private readonly userRepository: UserRepository
  ) {
    const callbackUrl = `http://localhost:${config.PORT}/${config.GLOBAL_PREFIX}/auth/login/google/callback`

    super({
      clientID: config.GOOGLE_CLIENT_ID,
      clientSecret: config.GOOGLE_CLIENT_SECRET,
      callbackURL: callbackUrl,
      scope: ['email', 'profile']
    })
  }

  public async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: VerifyCallback
  ): Promise<void> {
    const { email, picture, locale } = profile._json
    let user = await this.userRepository.findOne({ googleId: profile.id })

    if (!user) {
      user = await this.userRepository
        .create({
          email,
          username: email.split('@')[0],
          googleId: profile.id,
          profilePhoto: picture,
          nativeLanguage: locale
        })
        .catch(() => {
          throw new BadRequestException('Bad credentials.')
        })
    }
    done(null, user)
  }
}
