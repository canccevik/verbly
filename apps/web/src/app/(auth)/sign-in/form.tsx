'use client'

import Link from 'next/link'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import useSWRMutation from 'swr/mutation'

import { HttpMethod, fetcher } from '@/lib/utils/fetcher'
import { signInSchema } from '@/lib/validations/auth'
import PasswordInput from '@/components/password-input'
import FormAlert from '@/components/form-alert'
import SocialButtonGroup from '@/components/auth/social-button-group'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

type FormData = z.infer<typeof signInSchema>

export default function SignInForm() {
  const router = useRouter()
  const { trigger, isMutating } = useSWRMutation(
    '/auth/login',
    fetcher(HttpMethod.POST)
  )

  const form = useForm<FormData>({
    resolver: zodResolver(signInSchema)
  })

  async function onSubmit(values: FormData) {
    const response = await trigger(values)

    if (response.statusCode !== 201) {
      return form.setError('root', { message: response.message })
    }
    router.push('/')
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
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <PasswordInput {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormAlert form={form} />

        <Link
          href={'/forgot-password'}
          className="text-right text-sm font-medium ml-auto inline text-zinc-700 hover:text-main-blue"
        >
          Forgot password?
        </Link>

        <Button type="submit" loading={isMutating}>
          Sign in
        </Button>

        <Link
          href={'/sign-up'}
          className="text-sm font-medium text-zinc-700 inline w-fit mx-auto hover:text-main-blue"
        >
          Don&apos;t have an account? Sign up
        </Link>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-sm text-zinc-700">
            <span className="bg-background px-4">Or continue with</span>
          </div>
        </div>

        <SocialButtonGroup />
      </form>
    </Form>
  )
}
