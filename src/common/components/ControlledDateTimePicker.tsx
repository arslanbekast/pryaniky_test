import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { Control, FieldPath, FieldValues, useController } from 'react-hook-form'
import { TextFieldProps } from '@mui/material'
import dayjs from 'dayjs'

type ControlledDateTimePickerProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> = {
  name: TName
  control: Control<TFieldValues>
  label: string
  format?: string
  fullWidth?: boolean
} & Omit<TextFieldProps, 'name' | 'value' | 'onChange' | 'error' | 'helperText'>

export const ControlledDateTimePicker = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
>({
  name,
  control,
  label,
  format = 'DD.MM.YYYY HH:mm',
  fullWidth = true,
  ...rest
}: ControlledDateTimePickerProps<TFieldValues, TName>) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
  })

  return (
    <DateTimePicker
      label={label}
      value={field.value ? dayjs(field.value) : null}
      onChange={newValue => {
        field.onChange(newValue?.toISOString())
      }}
      format={format}
      slotProps={{
        textField: {
          fullWidth: fullWidth,
          error: !!error,
          helperText: error?.message,
          ...rest,
        },
      }}
    />
  )
}
