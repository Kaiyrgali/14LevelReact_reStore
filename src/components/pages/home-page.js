import React from "react";
import { withBookstoreService } from "../hoc";
import BookList from "../book-list";
import ShopingCartTable from "../shopping-cart-table"
import './main.css'

const HomePage = ({ bookstoreService }) => {
  // console.log(bookstoreService.getBooks())
  return (
    <div>
      <BookList books={[]}/>
      <ShopingCartTable />
    </div>
  );
};

// export default withBookstoreService()(Main);
export default HomePage;