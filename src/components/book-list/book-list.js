// Так как есть компоненты жизненного цикла, то лучше делать Компонентом Класса
// Создает список Лишек из книг
import React, { Component } from "react";
import BookListItem from "../book-list-item";
import './book-list.css'

export default class BookList extends Component {
  render() {
    const { books } = this.props; //массив книг
    return (
      <ul>
        {
          books.map((book) => {
            return (
              <li key={book.id}><BookListItem book={book} /></li> //возвращает новый массив из Лишек основанный на каждой книге за массива Букс
            )
          })
        }
      </ul>
    );
  };
};

// export default BookList;