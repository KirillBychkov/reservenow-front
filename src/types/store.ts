export interface ResponseOrError<T> {
  data: T;
  error: string;
}

export interface SuccessOrError {
  successMsg: string;
  errorMsg: string;
}
