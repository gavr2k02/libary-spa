import { IBook } from '../../models/interfaces/IBook';
import { IRequestConfig } from '../../models/interfaces/IRequestConfig';
import { RequestService } from '../request-service';
import { IBookService } from './IBookService';

export class BookService extends RequestService implements IBookService {
  public async getBooks(): Promise<IBook[]> {
    const config: IRequestConfig = {
      method: 'get',
      service: 'book',
    };
    return this.sendRequest(config);
  }

  public async updateBook(book: IBook): Promise<void> {
    const config: IRequestConfig = {
      method: 'patch',
      data: book,
      service: 'book',
    };
    return this.sendRequest(config);
  }

  public async deleteBooks(ids: number[]): Promise<void> {
    const config: IRequestConfig = {
      method: 'delete',
      data: ids,
      service: 'book',
    };
    return this.sendRequest(config);
  }

  public async addBook(book: IBook): Promise<void> {
    const config: IRequestConfig = {
      method: 'post',
      data: book,
      service: 'book',
    };
    return this.sendRequest(config);
  }
}
