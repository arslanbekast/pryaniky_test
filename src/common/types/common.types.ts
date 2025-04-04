export type BaseResponse<D = null> = {
  error_code: number
  error_message: string
  data: D
  profiling: string
  timings: string | null
}
