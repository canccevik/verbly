'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { signUpOtpSchema } from '@/lib/validations/auth'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { fetchApi } from '@/lib/utils'
import { useToast } from '@/hooks/use-toast'
import FormAlert from '@/components/form-alert'
import Link from 'next/link'

type FormData = z.infer<typeof signUpOtpSchema>

export default function SignUpOtpForm() {
  const [isLoading, setIsLoading] = useState(false)
  const searchParams = useSearchParams()
  const router = useRouter()
  const { toast } = useToast()

  const email = searchParams.get('email')

  const form = useForm<FormData>({
    resolver: zodResolver(signUpOtpSchema),
    defaultValues: { email: email || '' }
  })

  async function onSubmit(values: FormData) {
    setIsLoading(true)
    const response = await fetchApi('/account/verification', 'POST', values)
    setIsLoading(false)

    if (response.statusCode !== 201) {
      return form.setError('root', { message: 'Invalid otp code.' })
    }
    toast({
      title: 'Registration successful',
      description: "We're glad you joined us!"
    })
    router.push('/sign-in')
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="otpCode"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Enter your otp code" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormAlert form={form} />

        <Button type="submit" loading={isLoading} className="w-full">
          Verify
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
          className="text-sm font-medium text-zinc-700 w-fit mx-auto hover:text-main-blue block"
        >
          Back to sign in
        </Link>
      </form>
    </Form>
  )
}
