import { IBook } from '../../models/interfaces/IBook';

export interface IBookService {
  getBooks(): Promise<IBook[]>;
  updateBook(book: IBook): Promise<void>;
  deleteBooks(ids: number[]): Promise<void>;
  addBook(book: IBook): Promise<void>;
}
