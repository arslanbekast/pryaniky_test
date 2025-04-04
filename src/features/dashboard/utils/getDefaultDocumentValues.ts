import { Document } from '@/features/dashboard/api/dashboardApi.types'
import { FormValues } from '@/features/dashboard/hooks/useAddDocument'

export const getDefaultDocumentValues = (document?: Document | null): FormValues => ({
  companySigDate: document?.companySigDate || '',
  companySignatureName: document?.companySignatureName || '',
  documentName: document?.documentName || '',
  documentStatus: document?.documentStatus || '',
  documentType: document?.documentType || '',
  employeeNumber: document?.employeeNumber || '',
  employeeSigDate: document?.employeeSigDate || '',
  employeeSignatureName: document?.employeeSignatureName || '',
})
