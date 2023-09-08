'use client'

import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { fetchApi } from '@/lib/utils'
import { resetPasswordSchema } from '@/lib/schemas/reset-password-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import Link from 'next/link'
import { useToast } from '@/components/ui/use-toast'
import PasswordInput from '@/components/password-input'
import { Alert, AlertDescription } from '@/components/ui/alert'

export default function ResetPasswordForm() {
  const [isLoading, setIsLoading] = useState(false)
  const searchParams = useSearchParams()
  const router = useRouter()
  const { toast } = useToast()

  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema)
  })

  const token = searchParams.get('token')

  async function onSubmit(values: z.infer<typeof resetPasswordSchema>) {
    setIsLoading(true)
    const response = await fetchApi('/account/password', 'POST', {
      token,
      password: values.firstPassword
    })
    setIsLoading(false)

    if (response.statusCode !== 201) {
      return form.setError('root', { message: response.message })
    }
    toast({
      title: 'Password reset successful',
      description:
        'Your password has been successfully reset. You can now sign-in with your new password.'
    })
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
          name="firstPassword"
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
          name="secondPassword"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <PasswordInput placeholder="Confirm new password" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        {Object.keys(form.formState.errors).length > 0 && (
          <Alert variant={'destructive'}>
            <AlertDescription>
              <ul>
                {Object.values(form.formState.errors).map((error) => (
                  <li className="text-left ml-3" key={error.message}>
                    {error.message}
                  </li>
                ))}
              </ul>
            </AlertDescription>
          </Alert>
        )}

        <Button type="submit" loading={isLoading}>
          Reset password
        </Button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-s text-zinc-500">
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
