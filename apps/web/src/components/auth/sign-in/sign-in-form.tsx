'use client'

import { useState } from 'react'
import { Button } from '../../ui/button'
import { Input } from '../../ui/input'
import Link from 'next/link'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from '../../ui/form'
import { fetchApi } from '@/lib/utils'
import { signInSchema } from '@/lib/schemas/sign-in-schema'
import { useRouter } from 'next/navigation'
import SocialButtonGroup from '../social-button-group'

export default function SignInForm() {
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema)
  })

  async function onSubmit(values: z.infer<typeof signInSchema>) {
    setIsLoading(true)
    const response = await fetchApi('/auth/login', 'POST', values)
    setIsLoading(false)

    if (response.statusCode !== 201) {
      return form.setError('root', { message: 'Wrong username or password.' })
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
              <FormMessage className="text-left ml-3" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type="password" placeholder="Password" {...field} />
              </FormControl>
              <FormMessage className="text-left ml-3" />
            </FormItem>
          )}
        />

        <>
          {form.formState.errors.root && (
            <FormMessage className="text-left ml-3">
              {form.formState.errors.root.message}
            </FormMessage>
          )}
        </>

        <Link
          href={'/'}
          className="text-right text-sm font-medium ml-auto inline"
        >
          Forgot password?
        </Link>

        <Button type="submit" loading={isLoading}>
          Sign in
        </Button>

        <Link
          href={'/sign-up'}
          className="text-sm font-medium text-zinc-700 inline w-fit mx-auto"
        >
          Don&apos;t have an account? Sign up
        </Link>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-background px-4">Or continue with</span>
          </div>
        </div>

        <SocialButtonGroup />
      </form>
    </Form>
  )
}
