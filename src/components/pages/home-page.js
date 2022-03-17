import React from "react";
import { withBookstoreService } from "../hoc";
import BookListContainer from "../book-list";
import ShopingCartTable from "../shopping-cart-table"
import './main.css'

const HomePage = ({ bookstoreService }) => {
  // console.log(bookstoreService.getBooks())
  return (
    <div>
      <BookListContainer books={[]}/>
      <ShopingCartTable />
    </div>
  );
};

// export default withBookstoreService()(Main);
export default HomePage;