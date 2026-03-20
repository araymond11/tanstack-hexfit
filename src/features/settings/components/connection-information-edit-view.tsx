import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Alert, Box, Button } from '@mui/material'
import type { User } from '#/types/user'
import { useUpdateUserMutation } from '../hooks/use-update-user-mutation'
import ControlledTextInput from '#/components/controlled-text-input'
import { schema } from '../shemas/zod'

type FormValues = {
  firstname: string
  lastname: string
  email: string
  emailConfirm: string
}

type Props = {
  user: User
  onSave: (updated: Partial<User>) => void
  onCancel: () => void
}


export function ConnectionInformationEditView({ user, onSave, onCancel }: Props) {
  const [serverError, setServerError] = useState<string | null>(null)
  const { mutateAsync: updateUserProfile, isPending } = useUpdateUserMutation()

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isValid, dirtyFields, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      emailConfirm: user.email,
    },
    mode: 'onChange',
  })

  const handleCancel = () => {
    reset({
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      emailConfirm: user.email,
    })
    setServerError(null)
    onCancel()
  }

  const onSubmit = async (values: FormValues) => {
    setServerError(null)
    const payload: Partial<User> = {
      ...(dirtyFields.firstname && { firstname: values.firstname }),
      ...(dirtyFields.lastname && { lastname: values.lastname }),
      ...(dirtyFields.email && { email: values.email }),
    }

    try {
      await updateUserProfile(payload)
      const merged = { ...user, ...payload }
      reset({
        firstname: merged.firstname,
        lastname: merged.lastname,
        email: merged.email,
        emailConfirm: merged.email,
      })
      onSave(payload)
    } catch (err) {
      setServerError(err instanceof Error ? err.message : 'An error occurred')
    }
  }

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="flex flex-col gap-4">
        {serverError && <Alert severity="error">{serverError}</Alert>}

        <div className="flex gap-4">
          <ControlledTextInput
            name="firstname"
            control={control}
            label="Prénom"
            placeholder="Jean"
            errorMessage={errors.firstname?.message}
          />
          <ControlledTextInput
            name="lastname"
            control={control}
            label="Nom"
            placeholder="Dupont"
            errorMessage={errors.lastname?.message}
          />
        </div>

        <ControlledTextInput
          name="email"
          control={control}
          label="Courriel"
          placeholder="jean@exemple.com"
          type="email"
          errorMessage={errors.email?.message}
        />

        <ControlledTextInput
          name="emailConfirm"
          control={control}
          label="Confirmer le courriel"
          placeholder="jean@exemple.com"
          type="email"
          errorMessage={errors.emailConfirm?.message}
        />

        <div className="flex justify-end gap-2">
          <Button variant="text" onClick={handleCancel}>
            Annuler
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={!isDirty || !isValid || isSubmitting || isPending}
          >
            {isPending ? 'Sauvegarde...' : 'Sauvegarder'}
          </Button>
        </div>
      </div>
    </Box>
  )
}
