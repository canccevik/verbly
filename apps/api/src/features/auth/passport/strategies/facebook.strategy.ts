import { Config, ENV } from '@config/index'
import { UserRepository } from '@features/user/repositories'
import { BadRequestException, Inject, Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy, Profile } from 'passport-facebook'

export const FACEBOOK_STRATEGY = 'facebook'

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, FACEBOOK_STRATEGY) {
  constructor(
    @Inject(ENV) private readonly config: Config,
    private readonly userRepository: UserRepository
  ) {
    const callbackUrl = `http://localhost:${config.PORT}/${config.GLOBAL_PREFIX}/auth/login/facebook/callback`

    super({
      clientID: config.FACEBOOK_APP_ID,
      clientSecret: config.FACEBOOK_APP_SECRET,
      callbackURL: callbackUrl,
      scope: 'email',
      profileFields: ['id', 'photos', 'email']
    })
  }

  public async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: (err: any, user: any, info?: any) => void
  ): Promise<void> {
    const { email, picture } = profile._json
    let user = await this.userRepository.findOne({ facebookId: profile.id })

    if (!user) {
      user = await this.userRepository
        .create({
          email,
          username: email.split('@')[0],
          facebookId: profile.id,
          profilePhoto: picture.data.url
        })
        .catch(() => {
          throw new BadRequestException('Bad credentials.')
        })
    }
    done(null, user)
  }
}
