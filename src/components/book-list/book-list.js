// Так как есть компоненты жизненного цикла, то лучше делать Компонентом Класса
// Создает список Лишек из книг
import React, { Component } from "react";
import BookListItem from "../book-list-item";
import { connect } from "react-redux"; // функция высшего порядка
// import { bindActionCreators } from "redux"; // дополнительная вспомогательная функция, делает еще проще функцию диспатч
import { withBookstoreService } from "../hoc";
import { booksLoaded } from "../../actions/actions";
import { compose } from "../../utils";

import './book-list.css'

class BookList extends Component {

  componentDidMount() { // вызывается после отрисовки в ДОМ дереве
    // 1. receive data
    const { bookstoreService } = this.props;
    const data = bookstoreService.getBooks();
    console.log(data);
    // 2. dispatch action to store
    this.props.booksLoaded(data);
  }
  render() {
    const { books } = this.props; //массив книг
    return (
      <ul className="book-list">
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

const mapStateToProps = (books) => books;

const mapDispatchToProps = 
// (dispatch) => {
  // return {
    // booksLoaded: (newBooks) =>
    //   dispatch(booksLoaded(newBooks))
    // заменили на ....
  // return bindActionCreators({
  //   booksLoaded
  // }, dispatch);
  // и это затем упростили благодаря и убрали booksActionCreators до ...
  {booksLoaded};

export default compose(
// compose просто переписали фцнкцию с целью разбить ее на два аргумента вместо вложенности
  withBookstoreService(),
  connect(mapStateToProps, mapDispatchToProps)
)(BookList);
//  withBookstoreService()(
//   connect(mapStateToProps, mapDispatchToProps)(BookList));

// Наш компонент БукЛист оборачивается в функцию фысшего порядка, которая вызывает две функции которые 1. Указывают какой стейт мы используем и 2. Что мы с ним делаем
// после этого буксЛоад не просто берет данные, но одновременно и производит с ним действие