import React from 'react';
import { BookstoreServiceConsumer } from '../bookstore-service-context';

const withBookstoreService = () => (Wrapped) => function (props) {
  return (
    <BookstoreServiceConsumer>
      {
        (bookstoreService) => (
          <Wrapped
            {...props}
            bookstoreService={bookstoreService}
          />
        )
      }
    </BookstoreServiceConsumer>
  );
};

export default withBookstoreService;
