'use client'

import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage
} from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { forgotPasswordSchema } from '@/lib/schemas/forgot-password-schema'
import { fetchApi } from '@/lib/utils'
import { z } from 'zod'
import Link from 'next/link'

export default function ForgotPasswordForm() {
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()

  const form = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema)
  })

  async function onSubmit(values: z.infer<typeof forgotPasswordSchema>) {
    setIsLoading(true)
    const response = await fetchApi('/account/forgot-password', 'POST', values)
    setIsLoading(false)

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
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type="email" placeholder="E-mail address" {...field} />
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

        <Button type="submit" loading={isLoading}>
          Send
        </Button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-s">
            <span className="bg-background px-4">Or</span>
          </div>
        </div>

        <Link
          href={'/sign-in'}
          className="text-sm font-medium text-zinc-700 inline w-fit mx-auto"
        >
          Back to sign in
        </Link>
      </form>
    </Form>
  )
}
