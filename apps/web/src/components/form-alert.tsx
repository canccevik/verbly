import { FieldValues, UseFormReturn } from 'react-hook-form'

import { Alert, AlertDescription } from './ui/alert'

interface FormAlertProps<T extends FieldValues = any> {
  form: UseFormReturn<T>
}

export default function FormAlert({ form }: FormAlertProps) {
  if (Object.keys(form.formState.errors).length === 0) {
    return
  }

  return (
    <Alert variant={'destructive'}>
      <AlertDescription>
        <ul>
          {Object.values(form.formState.errors).map((error, i) => (
            <li className="text-left ml-3" key={i}>
              {error?.message?.toString()}
            </li>
          ))}
        </ul>
      </AlertDescription>
    </Alert>
  )
}
