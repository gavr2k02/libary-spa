import React, { FunctionComponent, useEffect, useState } from 'react';
import { IBook } from '../../../models/interfaces/IBook';
import { api } from '../../../service';
import Loader from '../../components/loader';
import TableBooks from '../../components/table-books';
import Swal from 'sweetalert2';
import ErrorAlert from '../../components/errorAlert';
import './style.scss';
import LoadAlert from '../../components/loadAlert';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import BookCreate from '../../components/book-create';

const Home: FunctionComponent = () => {
  const [books, setBooks] = useState<IBook[]>([]);
  const [selectedBooks, setSelectedBooks] = useState<number[]>([]);
  const [isLoad, setIsLoad] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    async function getBooks() {
      try {
        setIsLoad(true);
        const res: IBook[] = await api.bookService.getBooks();
        setBooks(res);
      } catch (ex) {
        setIsError(true);
      } finally {
        setIsLoad(false);
      }
    }

    getBooks();
  }, []);

  const deleteHandler = async (): Promise<void> => {
    try {
      if (!selectedBooks.length) {
        Swal.fire('Error', 'Please select books', 'error');
        return;
      }
      setIsError(false);
      setIsLoad(true);
      const newBooks: IBook[] = [];
      await api.bookService.deleteBooks(selectedBooks);

      books.map((book) => {
        if (selectedBooks.findIndex((item) => book.id === item) === -1) {
          newBooks.push(book);
        }
      });

      setBooks(newBooks);
    } catch (e) {
      setIsError(true);
    } finally {
      setIsLoad(false);
    }
  };

  return (
    <>
      {isLoad && <Loader />}
      <div className='home'>
        <TableBooks
          books={books}
          setSelectedBooks={setSelectedBooks}
          selectedBooks={selectedBooks}
          setIsGlobalLoad={setIsLoad}
          setBooks={setBooks}
        />

        <Popup
          trigger={
            <button className={'btn btn-success button m-2'} disabled={isLoad}>
              Add book
            </button>
          }
        >
          <BookCreate setIsGlobalLoad={setIsLoad} setBooks={setBooks} books={books} />
        </Popup>
        <button className={'btn btn-danger button'} onClick={() => deleteHandler()} disabled={isLoad}>
          Delete selected books
        </button>
        {isError && <ErrorAlert />}
        {isLoad && <LoadAlert />}
      </div>
    </>
  );
};

export default Home;
