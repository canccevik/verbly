'use client'

import { useState } from 'react'
import z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import useSWRMutation from 'swr/mutation'

import FormAlert from '@/components/form-alert'
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
import LanguageDropdown from '@/components/language-dropdown'
import { useUserStore } from '@/store/user'
import { newListSchema } from '@/lib/validations/my-lists'
import { HttpMethod, fetcher } from '@/lib/utils/fetcher'
import { toast } from '@/hooks/use-toast'

type FormData = z.infer<typeof newListSchema>

export interface NewListFormProps {
  closeDialog: Function
}

export default function NewListForm({ closeDialog }: NewListFormProps) {
  const { user } = useUserStore()
  const [wordLanguage, setWordLanguage] = useState('')
  const [meaningLanguage, setMeaningLanguage] = useState('')
  const { trigger, isMutating } = useSWRMutation(
    `/users/${user?._id}/lists`,
    fetcher(HttpMethod.POST)
  )

  const form = useForm<FormData>({
    resolver: zodResolver(newListSchema),
    defaultValues: {
      icon: 'plane'
    }
  })

  async function onSubmit(values: FormData) {
    const response = await trigger(values)

    if (response.statusCode !== 201) {
      return form.setError('root', { message: response.message })
    }

    closeDialog()
    toast({
      title: 'List created!',
      description: 'Your list created successfully.'
    })
  }

  return (
    user && (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>List name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="wordLanguage"
            defaultValue={user.nativeLanguage}
            render={() => (
              <FormItem>
                <FormLabel>Word language</FormLabel>
                <FormControl>
                  <LanguageDropdown
                    language={wordLanguage || user.nativeLanguage}
                    setLanguage={setWordLanguage}
                    placeholder="Word language"
                    contentClassName="w-[465px]"
                    onChange={(language) => {
                      form.setValue('wordLanguage', language)
                      form.clearErrors('wordLanguage')
                    }}
                  />
                </FormControl>
                <FormDescription>
                  This is the main language of the list.
                </FormDescription>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="meaningLanguage"
            render={() => (
              <FormItem>
                <FormLabel>Meaning language</FormLabel>
                <FormControl>
                  <LanguageDropdown
                    language={meaningLanguage}
                    setLanguage={setMeaningLanguage}
                    placeholder="Meaning language"
                    contentClassName="w-[465px]"
                    onChange={(language) => {
                      form.setValue('meaningLanguage', language)
                      form.clearErrors('meaningLanguage')
                    }}
                  />
                </FormControl>
                <FormDescription>
                  This is the meaning language of the list.
                </FormDescription>
              </FormItem>
            )}
          />

          <FormAlert form={form} />

          <Button
            type="submit"
            className="w-full"
            variant={'default'}
            loading={isMutating}
          >
            Create
          </Button>
        </form>
      </Form>
    )
  )
}
