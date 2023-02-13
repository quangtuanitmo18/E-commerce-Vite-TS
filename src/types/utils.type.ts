export interface SuccessResponseApi<Data> {
  message: string
  data: Data
}
export interface ErrorResponseApi<Data> {
  message: string
  data?: Data
}

export type NotUndefinedFiled<T> = {
  [P in keyof T]-?: NotUndefinedFiled<NonNullable<T[P]>>
}
