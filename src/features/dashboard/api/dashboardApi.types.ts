export type Document = {
  id: string
  documentStatus: string
  employeeNumber: string
  documentType: string
  documentName: string
  companySignatureName: string
  employeeSignatureName: string
  employeeSigDate: string
  companySigDate: string
}

export type DocumentWithoutId = Omit<Document, 'id'>

export type UpdateDocumentArgs = {
  id: string
  document: DocumentWithoutId
}
