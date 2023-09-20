'use client'

import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Link from 'next/link'
import useSWRMutation from 'swr/mutation'

import { forgotPasswordSchema } from '@/lib/validations/auth'
import { HttpMethod, fetcher } from '@/lib/utils/fetcher'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Form, FormField, FormItem, FormControl } from '@/components/ui/form'
import { useToast } from '@/hooks/use-toast'
import FormAlert from '@/components/form-alert'

type FormData = z.infer<typeof forgotPasswordSchema>

export default function ForgotPasswordForm() {
  const router = useRouter()
  const { toast } = useToast()
  const { trigger, isMutating } = useSWRMutation(
    '/account/forgot-password',
    fetcher(HttpMethod.POST)
  )

  const form = useForm<FormData>({
    resolver: zodResolver(forgotPasswordSchema)
  })

  async function onSubmit(values: FormData) {
    const response = await trigger(values)

    if (response.statusCode !== 201) {
      return form.setError('root', { message: response.message })
    }

    toast({
      title: 'Password reset link sent',
      description:
        'A password reset link has been sent to your email. Please check your inbox.'
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
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type="email" placeholder="E-mail address" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormAlert form={form} />

        <Button type="submit" loading={isMutating}>
          Send
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
