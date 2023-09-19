import CircleSocialButton from './circle-social-button'

export default function SocialButtonGroup() {
  return (
    <div className="w-full flex justify-evenly">
      <CircleSocialButton
        text="Google"
        href={process.env.GOOGLE_LOGIN_URL!}
        alt="Google logo"
        img={{
          width: 20,
          height: 20,
          src: 'images/auth/social/google-logo.svg'
        }}
      />
      <CircleSocialButton
        text="Facebook"
        href={process.env.FACEBOOK_LOGIN_URL!}
        alt="Facebook logo"
        img={{
          width: 40,
          height: 40,
          src: 'images/auth/social/facebook-logo.svg'
        }}
      />
      <CircleSocialButton
        text="Microsoft"
        href={process.env.MICROSOFT_LOGIN_URL!}
        alt="Microsoft logo"
        img={{
          width: 20,
          height: 20,
          src: 'images/auth/social/microsoft-logo.svg'
        }}
      />
    </div>
  )
}
