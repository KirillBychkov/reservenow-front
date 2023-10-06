export interface ResponseWithErrors<T> {
  data: T;
  error: string;
}
