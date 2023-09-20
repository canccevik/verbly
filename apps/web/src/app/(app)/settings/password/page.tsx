'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import useSWRMutation from 'swr/mutation'

import FormAlert from '@/components/form-alert'
import { Button } from '@/components/ui/button'
import { toast } from '@/hooks/use-toast'
import { HttpMethod, fetcher } from '@/lib/utils/fetcher'
import { updatePasswordSchema } from '@/lib/validations/settings'
import { useUserStore } from '@/store/user'
import PasswordInput from '@/components/password-input'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl
} from '@/components/ui/form'

import UpdatePasswordSkeleton from './skeleton'

type FormData = z.infer<typeof updatePasswordSchema>

export default function UpdatePassword() {
  const { user, setHasPassword } = useUserStore()
  const { trigger, isMutating } = useSWRMutation(
    '/account/password',
    fetcher(HttpMethod.PUT)
  )

  const form = useForm<FormData>({
    resolver: zodResolver(updatePasswordSchema)
  })

  async function onSubmit(values: FormData) {
    const response = await trigger(values)

    if (response.statusCode !== 200) {
      return form.setError('root', { message: response.message })
    }

    form.reset({ oldPassword: '', newPassword: '', newPassword2: '' })
    setHasPassword(true)
    toast({
      title: 'Changes saved!',
      description: 'Your password updated successfully.'
    })
  }

  return user ? (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {user.hasPassword && (
          <FormField
            control={form.control}
            name="oldPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Old password</FormLabel>
                <FormControl>
                  <PasswordInput placeholder="Old password" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New password</FormLabel>
              <FormControl>
                <PasswordInput placeholder="New password" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="newPassword2"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New password (again)</FormLabel>
              <FormControl>
                <PasswordInput placeholder="New password" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormAlert form={form} />

        <Button type="submit" className="w-full" loading={isMutating}>
          {user.hasPassword ? 'Update' : 'Create'} password
        </Button>
      </form>
    </Form>
  ) : (
    <UpdatePasswordSkeleton />
  )
}
