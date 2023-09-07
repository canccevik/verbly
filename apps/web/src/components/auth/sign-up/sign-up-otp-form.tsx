'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { signUpOtpSchema } from '@/lib/schemas/sign-up-otp-schema'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from '@/components/ui/form'
import { fetchApi } from '@/lib/utils'

export default function SignUpOtpForm() {
  const [isLoading, setIsLoading] = useState(false)
  const searchParams = useSearchParams()
  const router = useRouter()

  const email = searchParams.get('email')

  const form = useForm<z.infer<typeof signUpOtpSchema>>({
    resolver: zodResolver(signUpOtpSchema),
    defaultValues: { email: email || '' }
  })

  async function onSubmit(values: z.infer<typeof signUpOtpSchema>) {
    setIsLoading(true)
    const response = await fetchApi('/account/verification', 'POST', values)
    setIsLoading(false)

    if (response.statusCode !== 201) {
      return form.setError('root', { message: 'Invalid otp code.' })
    }
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
              <FormMessage />
            </FormItem>
          )}
        />

        <>
          {form.formState.errors.root && (
            <FormMessage className="text-center ml-3">
              {form.formState.errors.root.message}
            </FormMessage>
          )}
        </>

        <Button type="submit" loading={isLoading} className="w-full">
          Verify
        </Button>
      </form>
    </Form>
  )
}
