import { pryanikyApi } from '@/common/api/commonApi'
import { AuthData, LoginParams } from '@/features/auth/api/authApi.types'
import { BaseResponse } from '@/common/types/common.types'

export const authApi = {
  login(data: LoginParams) {
    return pryanikyApi.post<BaseResponse<AuthData>>('/login', data)
  },
}
