import React from 'react';
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import Main from '../pages/main';
import store from "../../store";
import ErrorBoundry from '../../components/error-boundry';
// import { withBookstoreService } from '../hoc'
import './app.css';
import { BookstoreServiceProvider } from '../bookstore-service-context';
import BookstoreService from '../../services/bookstore-service';

const bookstoreService = new BookstoreService();

const App = () => {
  return (
    <Provider store={store}>
      <ErrorBoundry>
        <BookstoreServiceProvider value = {bookstoreService} >
          <Router> 
            <Main />
          </Router>
        </BookstoreServiceProvider>
      </ErrorBoundry>
    </Provider>
  );
};

export default App;
