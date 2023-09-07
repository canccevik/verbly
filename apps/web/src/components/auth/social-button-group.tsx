import CircleSocialButton from '../circle-social-button'

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
          src: 'images/google-logo.svg'
        }}
      />
      <CircleSocialButton
        text="Facebook"
        href="/"
        alt="Facebook logo"
        img={{
          width: 40,
          height: 40,
          src: 'images/facebook-logo.svg'
        }}
      />
      <CircleSocialButton
        text="X"
        href="/"
        alt="X logo"
        img={{
          width: 20,
          height: 20,
          src: 'images/x-logo.svg'
        }}
      />
    </div>
  )
}
