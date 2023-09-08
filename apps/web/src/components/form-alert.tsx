import { UseFormReturn } from 'react-hook-form'
import { Alert, AlertDescription } from './ui/alert'

interface FormAlertProps {
  form: UseFormReturn<any>
}

export default function FormAlert({ form }: FormAlertProps) {
  return (
    Object.keys(form.formState.errors).length > 0 && (
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
  )
}
