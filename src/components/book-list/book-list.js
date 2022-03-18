// Так как есть компоненты жизненного цикла, то лучше делать Компонентом Класса
// Создает список Лишек из книг
import React, { Component } from "react";
import BookListItem from "../book-list-item";
import { connect } from "react-redux"; // функция высшего порядка
// import { bindActionCreators } from "redux"; // дополнительная вспомогательная функция, делает еще проще функцию диспатч
import { withBookstoreService } from "../hoc";
// заменили на ФетчБукс import { booksLoaded, booksRequested, booksError } from "../../actions";
import { fetchBooks, bookAddedToCart } from "../../actions";
import { compose } from "../../utils";
import Spinner from "../spinner";
import ErrorIndicator from '../error-indicator';

import './book-list.css'

const BookList = ({ books, onAddedToCart }) => {
  console.log('BookList')
  return (
    <ul className="book-list">
      {
        books.map((book) => {
          return (
            <li key={book.id}>
              <BookListItem
                book={book}
                onAddedToCart={() => onAddedToCart(book.id)} />
            </li> //возвращает новый массив из Лишек основанный на каждой книге за массива Букс
          )
        })
      }
    </ul>
  );
};

// переименовали в БукЛист контейнер, чтобы рендеринг
// финальный вывести в отдельный компонент class BookList extends Component {
class BookListContainer extends Component {

  componentDidMount() { // вызывается после отрисовки в ДОМ дереве
    // 1. receive data
    // const { bookstoreService, booksLoaded, booksRequested, booksError } = this.props;
    // рефакторинг ДидМоунт, выводим все в одну функцию
    this.props.fetchBooks();
    // const data = bookstoreService.getBooks();
    // строку меняет, так как начали использовать промис
    // booksRequested();
    // bookstoreService.getBooks()
    //   .then((data) => booksLoaded(data))
    //   .catch((err) => booksError(err))

    // 2. dispatch action to store
    //this.props.booksLoaded(data);
    // переносим наверх
  }
  render() {
    const { books, loading, error, onAddedToCart } = this.props; //массив книг
    // console.log( error );
    if (loading) {
      return <Spinner />
    } 
    if (error) {
      // console.log('Error');
      return <ErrorIndicator />
    }  

    return <BookList
              books = {books}
              onAddedToCart = {onAddedToCart}
     />
// создаем отдельно БукЛист, который оборачиваем в БукЛистКонтейнер

  };
};

const mapStateToProps = ({ bookList: {books, loading, error}}) => {
   return { books, loading, error };
  }

const mapDispatchToProps = (dispatch, { bookstoreService }) => {
  // return {
    // booksLoaded: (newBooks) =>
    //   dispatch(booksLoaded(newBooks))
    // заменили на ....
  // return bindActionCreators({
  //   booksLoaded
  // }, dispatch);
  // и это затем упростили благодаря и убрали booksActionCreators до ...
  // {booksLoaded,
  // booksRequested, 
  // booksError}
  // и это потом переделали в отдельную функцию Фетч
  // const { bookstoreService } = ownProps;
  return {
    fetchBooks: fetchBooks(bookstoreService, dispatch),
    // вынесли в актионс fetchBooks: () => {
    //   dispatch(booksRequested());
    //   bookstoreService.getBooks()
    //     .then((data) => dispatch(booksLoaded(data)))
    //     .catch((err) => dispatch(booksError(err)))
    // onAddedToCart: (id) => {
    //   console.log('Added to cart', id)
    // }
    onAddedToCart: (id) => dispatch(bookAddedToCart(id))
    };
  };

export default compose(
// compose просто переписали фцнкцию с целью разбить ее на два аргумента вместо вложенности
  withBookstoreService(),
  connect(mapStateToProps, mapDispatchToProps)
)(BookListContainer);
//  withBookstoreService()(
//   connect(mapStateToProps, mapDispatchToProps)(BookList));

// Наш компонент БукЛист оборачивается в функцию фысшего порядка, которая вызывает две функции которые 1. Указывают какой стейт мы используем и 2. Что мы с ним делаем
// после этого буксЛоад не просто берет данные, но одновременно и производит с ним действие