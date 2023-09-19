'use client'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { myProfileSchema } from '@/lib/validations/settings'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import LanguageDropdown from '@/components/language-dropdown'
import { useState } from 'react'
import FormAlert from '@/components/form-alert'
import { useUserStore } from '@/store/user'
import MyProfileSkeleton from './skeleton'
import { Gender } from '@/types'
import { fetchApi } from '@/lib/utils'
import { toast } from '@/hooks/use-toast'

type FormData = z.infer<typeof myProfileSchema>

export default function MyProfile() {
  const { user, set: setUser } = useUserStore()
  const [isLoading, setIsLoading] = useState(false)
  const [language, setLanguage] = useState('')

  const form = useForm<FormData>({
    resolver: zodResolver(myProfileSchema)
  })

  async function onSubmit(values: FormData) {
    values.gender = Number(values.gender) as unknown as Gender

    setIsLoading(true)
    const response = await fetchApi('/users/me', 'PUT', values)
    setIsLoading(false)

    if (response.statusCode !== 200) {
      return form.setError('root', { message: response.message })
    }

    setUser(response.data)
    toast({
      title: 'Changes saved!',
      description: 'Your profile updated successfully.'
    })
  }

  return user ? (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          defaultValue={user.username}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
            </FormItem>
          )}
        />

        <FormItem>
          <FormLabel>Email</FormLabel>
          <FormControl>
            <Input type="email" defaultValue={user.email} disabled />
          </FormControl>
        </FormItem>

        <FormField
          control={form.control}
          name="gender"
          defaultValue={user.gender.toString() as Gender}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gender</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">Not known</SelectItem>
                    <SelectItem value="1">Male</SelectItem>
                    <SelectItem value="2">Female</SelectItem>
                    <SelectItem value="3">Non binary</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="nativeLanguage"
          defaultValue={user.nativeLanguage}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Native language</FormLabel>
              <FormControl>
                <LanguageDropdown
                  language={language || field.value}
                  setLanguage={setLanguage}
                  contentClassName="w-[600px] mb-2"
                  onChange={(language) => {
                    form.setValue('nativeLanguage', language)
                    form.clearErrors('nativeLanguage')
                  }}
                />
              </FormControl>
              <FormDescription>This is your native language.</FormDescription>
            </FormItem>
          )}
        />

        <FormAlert form={form} />

        <Button type="submit" className="w-full" loading={isLoading}>
          Save changes
        </Button>
      </form>
    </Form>
  ) : (
    <MyProfileSkeleton />
  )
}
