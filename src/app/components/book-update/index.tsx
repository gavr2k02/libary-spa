import React, { useState } from 'react';
import { IBook } from '../../../models/interfaces/IBook';
import Swal from 'sweetalert2';
import { api } from '../../../service';
import LoadAlert from '../loadAlert';
import ErrorAlert from '../errorAlert';
import SucsessAlert from '../sucsessAlert';

interface IPropTypes {
  book: IBook;
  books: IBook[];
  setIsGlobalLoad(value: boolean): void;
  setBooks(books: IBook[]): void;
}

const BookUpdate = ({ book, books, setIsGlobalLoad, setBooks }: IPropTypes) => {
  const [isSucesss, setIsSucsess] = useState<boolean>(false);
  const [isLoad, setIsLoad] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [newBook, setNewBook] = useState<IBook>(book);

  const clickHandler = async () => {
    try {
      setIsSucsess(false);
      setIsLoad(true);
      setIsError(false);
      setIsGlobalLoad(true);

      if (!validateData()) {
        return;
      }

      await api.bookService.updateBook(newBook);
      const newBooks = books;

      newBooks.splice(
        books.findIndex((item) => item.id === book.id && item.name === book.name && book.genre === item.genre),
        1,
      );
      newBooks.push(newBook);
      setBooks(newBooks);

      setIsSucsess(true);
    } catch (e) {
      setIsError(true);
    } finally {
      setIsLoad(false);
      setIsGlobalLoad(false);
    }
  };

  const validateData = () => {
    if (!newBook.name.length) {
      Swal.fire('Error', 'Please provide a field name');
      return false;
    }

    if (!newBook.date) {
      Swal.fire('Error', 'Please provide a field date');
      return false;
    }

    if (!newBook.genre.length) {
      Swal.fire('Error', 'Please provide a field genre');
      return false;
    }

    if (!newBook.author.length) {
      Swal.fire('Error', 'Please provide a field author');
      return false;
    }

    return true;
  };

  return (
    <div>
      <form>
        {newBook?.id && (
          <div className='form-group'>
            <label>Id</label>
            <input type='text' className='form-control' value={newBook.id} disabled={true} />
          </div>
        )}

        <div className='form-group'>
          <label>Name</label>
          <input
            type='text'
            className='form-control'
            value={newBook.name}
            onChange={(e) =>
              setNewBook({ ...newBook, name: (e.target as unknown as HTMLTextAreaElement).value } as IBook)
            }
          />
        </div>

        <div className='form-group'>
          <label>Date</label>
          <input
            type='date'
            className='form-control'
            value={newBook.date}
            onChange={(e) => setNewBook({ ...newBook, date: (e.target as any).value } as IBook)}
          />
        </div>

        <div className='form-group'>
          <label>Genre</label>
          <input
            type='text'
            className='form-control'
            value={newBook.genre}
            onChange={(e) =>
              setNewBook({ ...newBook, genre: (e.target as unknown as HTMLTextAreaElement).value } as IBook)
            }
          />
        </div>

        <div className='form-group'>
          <label>Author</label>
          <input
            type='text'
            className='form-control'
            value={newBook.author}
            onChange={(e) =>
              setNewBook({ ...newBook, author: (e.target as unknown as HTMLTextAreaElement).value } as IBook)
            }
          />
        </div>
      </form>
      <button className={'btn btn-success button m-2'} onClick={() => clickHandler()}>
        Update
      </button>
      {isLoad && <LoadAlert />}
      {isError && <ErrorAlert />}
      {isSucesss && <SucsessAlert />}
    </div>
  );
};

export default BookUpdate;
