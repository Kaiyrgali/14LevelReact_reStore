const initialState = {
  books: [],
  loading: true,
  error: null,
  cartItems: [],
  orderTotal: 220
};

const reducer = (state = initialState, action) => {

  console.log(action.type);

  switch (action.type) {
    case 'FETCH_BOOKS_REQUEST':
      return {
        ...state,
        books: [],
        loading: true,
        error: null,
      };
    case 'FETCH_BOOKS_SUCCESS':
      return {
        ...state,
        books: action.payload,
        loading: false,
        error: null,
      };
    case 'FETCH_BOOKS_FAILURE':
      return {
        ...state,
        books: [],
        loading: false,
        error: action.payload,
      };
    case 'BOOK_ADDED_TO_CART':
      const bookId = action.payload;
      const book = state.books.find((book) => book.id === bookId);
      const newItem = {
        id: book.id,
        name: book.title,
        count: 1,
        total: book.price
      };
            
      return {
        ...state,
        cartItems: [
          ...state.cartItems,
          newItem
        ]
      };

    case 'COUNT_ADDED_TO_CART':
      const addBookId = action.payload;
      const bookPrice = state.books.find((book) => book.id === addBookId).price;
      const cart= state.cartItems.find((book) => book.id === addBookId);
      // console.log(bookPrice);
      console.log(cart);
      const addCount = {
        id: cart.id,
        name: cart.name,
        count: cart.count + 1,
        total: cart.total + bookPrice
        };
      console.log(addBookId, state.cartItems[0] )
      state.cartItems.splice(addBookId-1, 1, addCount)     
        return {
          ...state,
        cartItems: [
          ...state.cartItems
        ]
        };
  

      case 'BOOK_DELETED_FROM_CART':
      const bookDelId = action.payload;
      console.log(bookDelId);
      const bookDel = state.books.find((items) => items.id === bookDelId);
      const delItem = {
      };
              
      return {
        ...state,
        cartItems: []
      };

    default:
      return state;
  };
};

export default reducer;