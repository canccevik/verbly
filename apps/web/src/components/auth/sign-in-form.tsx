import React from 'react'
import CircleSocialButton from '../circle-social-button'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import Link from 'next/link'

export default function SignInForm() {
  return (
    <>
      <Input placeholder="Username" />
      <Input type="password" placeholder="Password" />

      <Link href={'/'} className="text-right text-sm font-medium">
        Forgot password?
      </Link>

      <Button>Sign in</Button>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-background px-4">Or continue with</span>
        </div>
      </div>

      <div className="w-full flex justify-evenly">
        <CircleSocialButton
          text="Google"
          href="/"
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
    </>
  )
}
