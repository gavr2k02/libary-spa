import { IAuthService } from './auth-service/IAuthService';
import { IBookService } from './book-service/IBookService';

export interface IAPIService {
  get bookService(): IBookService;
  get authService(): IAuthService;
}
