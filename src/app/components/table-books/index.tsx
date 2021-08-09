import React, { useState } from 'react';
import { IBook } from '../../../models/interfaces/IBook';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import UpdateBook from '../book-update';

interface IPropTypes {
  selectedBooks: number[];
  setSelectedBooks(ids: number[]): void;
  books: IBook[];
  setIsGlobalLoad(value: boolean): void;
  setBooks(books: IBook[]): void;
}

const TableBooks = ({ books, selectedBooks, setSelectedBooks, setIsGlobalLoad, setBooks }: IPropTypes) => {
  const sortBooks = books.sort(function (a, b) {
    if (a.id > b.id) {
      return 1;
    }
    if (a.id < b.id) {
      return -1;
    }
    return 0;
  });
  return (
    <table className='table'>
      <thead>
        <tr>
          <th scope='col'>#</th>
          <th scope='col'>Name</th>
          <th scope='col'>Date</th>
          <th scope='col'>Genre</th>
          <th scope='col'>Author</th>
          <th scope='col' className='text-helper'>
            Selected
          </th>
          <th scope='col' className='text-helper'>
            Update
          </th>
        </tr>
      </thead>
      <tbody>
        {sortBooks.map((book) => (
          <tr key={book?.id || book.name}>
            <th scope='row'>{book?.id || '#'}</th>
            <td>{book.name}</td>
            <td>{book.date}</td>
            <td>{book.genre}</td>
            <td>{book.author}</td>
            <td>
              <input
                type='checkbox'
                onClick={(e) => {
                  const index = selectedBooks.findIndex((id) => id === book.id);

                  if (index === -1) {
                    selectedBooks.push(book.id);
                  } else {
                    selectedBooks.splice(index, 1);
                  }

                  setSelectedBooks(selectedBooks);
                }}
              />
            </td>

            <td>
              <Popup trigger={<button className='btn-small btn-primary button'>Change</button>}>
                <UpdateBook book={book} setIsGlobalLoad={setIsGlobalLoad} setBooks={setBooks} books={books} />
              </Popup>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableBooks;
