import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { getDefaultDocumentValues } from '@/features/dashboard/utils/getDefaultDocumentValues'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useAppDispatch } from '@/common/hooks/useAppDispatch'
import { addDocument, updateDocument } from '@/features/dashboard/model/dashboardSlice'
import { Document } from '@/features/dashboard/api/dashboardApi.types'

const formSchema = z.object({
  companySigDate: z.string().datetime('Неверный формат даты.'),
  companySignatureName: z.string().min(1, 'Вы не ввели подписанта компании'),
  documentName: z.string().min(1, 'Вы не ввели название документа'),
  documentStatus: z.string().min(1, 'Вы не ввели статус документа'),
  documentType: z.string().min(1, 'Вы не ввели тип документа'),
  employeeNumber: z.string().min(1, 'Вы не ввели номер сотрудника'),
  employeeSigDate: z.string().datetime('Неверный формат даты.'),
  employeeSignatureName: z.string().min(1, 'Вы не ввели подпись сотрудника'),
})

export type FormValues = z.infer<typeof formSchema>

export const useAddDocument = (onClose: () => void, document?: Document | null) => {
  const { handleSubmit, reset, control } = useForm<FormValues>({
    defaultValues: getDefaultDocumentValues(),
    resolver: zodResolver(formSchema),
  })

  useEffect(() => {
    reset(getDefaultDocumentValues(document))
  }, [document, reset])

  const dispatch = useAppDispatch()
  const onSubmit = (formData: FormValues) => {
    if (document) {
      dispatch(updateDocument({ id: document.id, document: formData }))
    } else {
      dispatch(addDocument(formData))
    }
    onClose()
    reset(getDefaultDocumentValues())
  }

  return {
    handleSubmit,
    control,
    onSubmit,
  }
}
