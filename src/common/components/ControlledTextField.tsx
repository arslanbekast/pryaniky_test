import { TextField, TextFieldProps } from '@mui/material'
import { useController, Control, FieldPath, FieldValues } from 'react-hook-form'

type ControlledTextFieldProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> = {
  name: TName
  control: Control<TFieldValues>
} & Omit<TextFieldProps, 'name' | 'value' | 'onChange' | 'error' | 'helperText'>

export const ControlledTextField = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
>({
  name,
  control,
  ...rest
}: ControlledTextFieldProps<TFieldValues, TName>) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
  })

  return (
    <TextField
      {...field}
      {...rest}
      error={!!error}
      helperText={error?.message}
      fullWidth
      margin="dense"
    />
  )
}
