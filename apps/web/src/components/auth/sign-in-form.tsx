'use client'

import React from 'react'
import CircleSocialButton from '../circle-social-button'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import Link from 'next/link'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form'
import { fetcher } from '@/lib/utils'
import { loginSchema } from '@/lib/validators/login-schema'
import { useRouter } from 'next/navigation'

export default function SignInForm() {
  const router = useRouter()

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema)
  })

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    const response = await fetcher('/auth/login', 'POST', values)

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

        <Link href={'/'} className="text-right text-sm font-medium">
          Forgot password?
        </Link>

        <Button type="submit">Sign in</Button>

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
      </form>
    </Form>
  )
}
