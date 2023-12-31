'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter, useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import Link from 'next/link'
import useSWRMutation from 'swr/mutation'

import { resetPasswordSchema } from '@/lib/validations/auth'
import { HttpMethod, fetcher } from '@/lib/utils/fetcher'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { useToast } from '@/hooks/use-toast'
import PasswordInput from '@/components/password-input'
import FormAlert from '@/components/form-alert'

type FormData = z.infer<typeof resetPasswordSchema>

export default function ResetPasswordForm() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { toast } = useToast()
  const { trigger, isMutating } = useSWRMutation(
    '/account/password',
    fetcher(HttpMethod.POST)
  )
  const form = useForm<FormData>({
    resolver: zodResolver(resetPasswordSchema)
  })

  const token = searchParams.get('token')

  async function onSubmit(values: FormData) {
    const response = await trigger({
      token,
      password: values.firstPassword
    })

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

        <FormAlert form={form} />

        <Button type="submit" loading={isMutating}>
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
          className="text-sm font-medium text-zinc-700 inline w-fit mx-auto hover:text-main-blue"
        >
          Back to sign in
        </Link>
      </form>
    </Form>
  )
}
