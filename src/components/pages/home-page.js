import React from "react";
import { withBookstoreService } from "../hoc";
import BookList from "../book-list";
import './main.css'

const HomePage = ({ bookstoreService }) => {
  // console.log(bookstoreService.getBooks())
  return (
    <div>
      <BookList books={[]}/>
    </div>
  );
};

// export default withBookstoreService()(Main);
export default HomePage;