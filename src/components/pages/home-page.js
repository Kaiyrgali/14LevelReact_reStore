import React from 'react';
import BookListContainer from '../book-list';
import ShopingCartTable from '../shopping-cart-table';
import './main.css';

function HomePage({ bookstoreService }) {
  return (
    <div>
      <BookListContainer books={[]} />
      <ShopingCartTable />
    </div>
  );
}

export default HomePage;
