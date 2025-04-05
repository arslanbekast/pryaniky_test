import { pryanikyApi } from '@/common/api/commonApi'
import { BaseResponse } from '@/common/types/common.types'
import {
  Document,
  DocumentWithoutId,
  UpdateDocumentArgs,
} from '@/features/dashboard/api/dashboardApi.types'

export const dashboardApi = {
  getDocuments() {
    return pryanikyApi.get<BaseResponse<Document[]>>('/userdocs/get')
  },
  addDocument(document: DocumentWithoutId) {
    return pryanikyApi.post<BaseResponse<Document>>('/userdocs/create', document)
  },
  deleteDocument(id: string) {
    return pryanikyApi.delete<BaseResponse<null>>(`/userdocs/delete/${id}`)
  },
  updateDocument(args: UpdateDocumentArgs) {
    return pryanikyApi.post<BaseResponse<Document>>(`/userdocs/set/${args.id}`, args.document)
  },
}
