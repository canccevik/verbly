'use client'

import { useState } from 'react'
import Link from 'next/link'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'

import { signUpSchema } from '@/lib/validations/auth'
import { fetchApi } from '@/lib/utils'
import PasswordInput from '@/components/password-input'
import FormAlert from '@/components/form-alert'

import SocialButtonGroup from '../../../components/auth/social-button-group'
import LanguageDropdown from '../../../components/language-dropdown'
import {
  Form,
  FormControl,
  FormField,
  FormItem
} from '../../../components/ui/form'
import { Input } from '../../../components/ui/input'
import { Button } from '../../../components/ui/button'

type FormData = z.infer<typeof signUpSchema>

export default function SignUpForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [language, setLanguage] = useState('')

  const router = useRouter()

  const form = useForm<FormData>({
    resolver: zodResolver(signUpSchema)
  })

  async function onSubmit(values: FormData) {
    setIsLoading(true)
    const response = await fetchApi('/auth/register', 'POST', values)
    setIsLoading(false)

    if (response.statusCode !== 201) {
      return form.setError('root', { message: response.message[0] })
    }

    const email = form.getValues('email')
    router.push(`/sign-up/otp?email=${email}`)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6"
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Username" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type="email" placeholder="E-mail" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <PasswordInput {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="nativeLanguage"
          render={() => (
            <FormItem>
              <FormControl>
                <LanguageDropdown
                  language={language}
                  setLanguage={setLanguage}
                  contentClassName="w-[425px]"
                  onChange={(language) => {
                    form.setValue('nativeLanguage', language)
                    form.clearErrors('nativeLanguage')
                  }}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormAlert form={form} />

        <Link
          href={'/sign-in'}
          className="text-right text-sm font-medium ml-auto inline text-zinc-700 hover:text-main-blue"
        >
          Have an account? Sign in
        </Link>

        <Button type="submit" loading={isLoading}>
          Sign up
        </Button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-sm text-zinc-700">
            <span className="bg-background px-4">Or join us with</span>
          </div>
        </div>

        <SocialButtonGroup />
      </form>
    </Form>
  )
}
