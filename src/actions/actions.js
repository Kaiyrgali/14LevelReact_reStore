const booksRequested = () => {
  return {
    type: 'FETCH_BOOKS_REQUEST'
  };
};

const booksLoaded = (newBooks) => {
  return {
    type: 'FETCH_BOOKS_SUCCESS',
    payload: newBooks
  };
};

const booksError = (error) => {
  return {
    type: 'FETCH_BOOKS_FAILURE',
    payload: error
  }; 
};

export const bookAddedToCart = (bookId) => {
  return {
    type: 'BOOK_ADDED_TO_CART',
    payload: bookId
  };
};

export const countAddedToCart = (bookId) => {
  return {
    type: 'COUNT_ADDED_TO_CART',
    payload: bookId
  };
};



export const bookDelFromCart = (bookId) => {
  return {
    type: 'BOOK_DELETED_FROM_CART',
    payload: bookId
  };
};

const fetchBooks = (bookstoreService, dispatch) => () => { //функция, которая возвращает функцию, внешняя для - работы в МатчДиспТоПропс, внутренняя для -компонента -
  dispatch(booksRequested());
  bookstoreService.getBooks()
    // .then(() => console.log('get books'))
    .then((data) => dispatch(booksLoaded(data)))
    .catch((err) => dispatch(booksError(err)));
}

export {
  // booksLoaded,
  // booksRequested,
  // booksError
  // меняетм все на фетчБук
  fetchBooks
};