import React from 'react'
import './App.scss'
import {BrowserRouter, Route} from 'react-router-dom'
import BooksList from "./components/BooksList";
import AddBook from "./components/AddBook";

class BooksApp extends React.Component {
  render() {
    return (
        <div className="app">
            <BrowserRouter>
                <Route exact path={"/"} component={BooksList} />
                <Route path={"/add-a-book"} component={AddBook} />
            </BrowserRouter>
        </div>
    )
  }
}

export default BooksApp
