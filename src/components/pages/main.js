import React from "react";
import { withBookstoreService } from "../hoc";
import './main.css'

const Main = ({ bookstoreService }) => {
  console.log(bookstoreService.getBooks())
  return <div>Main</div>
};

export default withBookstoreService()(Main);