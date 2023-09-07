'use client'

import { useState } from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import Link from 'next/link'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form'
import { useRouter } from 'next/navigation'
import { signUpSchema } from '@/lib/schemas/sign-up-schema'
import LanguageDropdown from '../language-dropdown'
import ISO6391 from 'iso-639-1'
import { fetchApi } from '@/lib/utils'
import SocialButtonGroup from './social-button-group'

export default function SignUpForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [language, setLanguage] = useState('')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const router = useRouter()

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema)
  })

  function setNativeLanguage(language: string) {
    setLanguage(language)
    const languageCode = ISO6391.getCode(language)
    form.setValue('nativeLanguage', languageCode)
  }

  async function onSubmit(values: z.infer<typeof signUpSchema>) {
    setIsLoading(true)
    const response = await fetchApi('/auth/register', 'POST', values)
    setIsLoading(false)

    if (response.statusCode !== 201) {
      return form.setError('root', { message: response.message[0] })
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
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type="email" placeholder="E-mail" {...field} />
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

        <FormField
          control={form.control}
          name="nativeLanguage"
          render={() => (
            <FormItem>
              <FormControl>
                <LanguageDropdown
                  language={language}
                  setLanguage={setNativeLanguage}
                  open={isDropdownOpen}
                  setOpen={setIsDropdownOpen}
                />
              </FormControl>
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

        <Link href={'/sign-in'} className="text-right text-sm font-medium">
          Have an account? Sign in
        </Link>

        <Button type="submit" loading={isLoading}>
          Sign up
        </Button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-background px-4">Or join us with</span>
          </div>
        </div>

        <SocialButtonGroup />
      </form>
    </Form>
  )
}
