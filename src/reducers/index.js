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
      const addBookPrice = state.books.find((book) => book.id === addBookId).price;
      const cart= state.cartItems.find((book) => book.id === addBookId);
      // console.log(bookPrice);
      console.log(cart);
      const addCount = {
        id: cart.id,
        name: cart.name,
        count: cart.count + 1,
        total: cart.total + addBookPrice
        };
      state.cartItems.splice(addBookId-1, 1, addCount)     
      return {
        ...state,
        cartItems: [
        ...state.cartItems
        ]
      };
  
    case 'COUNT_DELETED_FROM_CART':
      const delBookId = action.payload;
      const delBookPrice = state.books.find((book) => book.id === delBookId).price;
      const delCart= state.cartItems.find((book) => book.id === delBookId);
      const delCount = {
        id: delCart.id,
        name: delCart.name,
        count: ((delCart.count>0) ? delCart.count - 1 : 0),
        total: ((delCart.total>0) ? delCart.total - delBookPrice: 0)
        };
      state.cartItems.splice(delBookId-1, 1, delCount)     
      return {
        ...state,
        cartItems: [
        ...state.cartItems
        ]
      };

      case 'BOOK_ERASED_FROM_CART':
        const erasedBookId = action.payload;
        console.log(state.cartItems);
        const erasedCart= state.cartItems.findIndex((book) => book.id === erasedBookId);
        state.cartItems.splice(erasedCart, 1);    
        return {
          ...state,
          cartItems: 
          ((state.cartItems.length>0 ) ? [...state.cartItems] : [])
          };
      
      default:
        return state;
  };
};

export default reducer;