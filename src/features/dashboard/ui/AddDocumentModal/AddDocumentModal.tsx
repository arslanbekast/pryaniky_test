import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import { Document } from '@/features/dashboard/api/dashboardApi.types'
import dayjs from 'dayjs'
import 'dayjs/locale/ru'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { ruRU } from '@mui/x-date-pickers/locales'
import { ControlledDateTimePicker } from '@/common/components/ControlledDateTimePicker'
import { ControlledTextField } from '@/common/components/ControlledTextField'
import { useAddDocument } from '@/features/dashboard/hooks/useAddDocument'

dayjs.locale('ru')

type Props = {
  open: boolean
  onClose: () => void
  document?: Document | null
}

export const AddDocumentModal = ({ open, onClose, document }: Props) => {
  const { handleSubmit, control, onSubmit } = useAddDocument(onClose, document)

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{document ? 'Редактировать документ' : 'Добавить документ'}</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <LocalizationProvider
            dateAdapter={AdapterDayjs}
            localeText={ruRU.components.MuiLocalizationProvider.defaultProps.localeText}
          >
            <ControlledDateTimePicker
              name={'companySigDate'}
              label={'Дата подписи компании'}
              control={control}
            />
            <ControlledTextField
              name="companySignatureName"
              control={control}
              label="Подписант компании"
            />
            <ControlledTextField name="documentName" control={control} label="Название" />
            <ControlledTextField name="documentStatus" control={control} label="Статус" />
            <ControlledTextField name="documentType" control={control} label="Тип" />
            <ControlledTextField name="employeeNumber" control={control} label="Номер сотрудника" />
            <ControlledDateTimePicker
              name={'employeeSigDate'}
              label={'Дата подписи сотрудника'}
              control={control}
            />
            <ControlledTextField name="employeeSignatureName" control={control} label="Сотрудник" />
          </LocalizationProvider>
        </DialogContent>
        <DialogActions>
          <Button type={'button'} onClick={onClose} color="secondary">
            Отмена
          </Button>
          <Button type={'submit'} color="primary">
            {document ? 'Сохранить' : 'Добавить'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}
