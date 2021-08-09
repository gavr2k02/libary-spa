import axios from 'axios';
import { API_URL } from '../models/common';
import { IBook } from '../models/interfaces/IBook';
import { AuthService } from './auth-service/AuthService';
import { IAuthService } from './auth-service/IAuthService';
import { BookService } from './book-service/BookService';
import { IBookService } from './book-service/IBookService';
import { IAPIService } from './IAPIService';

export class APIService implements IAPIService {
  private readonly _bookService: IBookService;
  private readonly _authService: IAuthService;

  constructor() {
    this._bookService = new BookService();
    this._authService = new AuthService();
  }

  public get bookService(): IBookService {
    return this._bookService;
  }

  public get authService(): IAuthService {
    return this._authService;
  }
}
