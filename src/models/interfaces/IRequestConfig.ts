import { IBook } from './IBook';

interface IHeadersProps {
  Authorization: string;
  Accept: string;
}

export interface IRequestConfig {
  method: string;
  service: string;
  headers?: IHeadersProps;
  url?: string;
  data?: any;
}
