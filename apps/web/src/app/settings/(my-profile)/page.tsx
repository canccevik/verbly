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
import ISO6391 from 'iso-639-1'
import FormAlert from '@/components/form-alert'
import { Gender } from '@/types'

type FormData = z.infer<typeof myProfileSchema>

export default function MyProfile() {
  const [isLoading, setIsLoading] = useState(false)
  const [language, setLanguage] = useState('')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const form = useForm<FormData>({
    resolver: zodResolver(myProfileSchema),
    defaultValues: {
      gender: Gender.NotKnown
    }
  })

  function setNativeLanguage(language: string) {
    setLanguage(language)
    const languageCode = ISO6391.getCode(language)
    form.setValue('nativeLanguage', languageCode)
    form.clearErrors('nativeLanguage')
  }

  function onSubmit(values: FormData) {
    console.log(values)
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="username"
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
              <Input type="email" value={'johndoe@gmail.com'} disabled />
            </FormControl>
          </FormItem>

          <FormField
            control={form.control}
            name="gender"
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
            render={({ field }) => (
              <FormItem>
                <FormLabel>Native language</FormLabel>
                <FormControl>
                  <LanguageDropdown
                    language={language}
                    setLanguage={setNativeLanguage}
                    open={isDropdownOpen}
                    setOpen={setIsDropdownOpen}
                    contentClassName="w-[600px] mb-2"
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
    </div>
  )
}
