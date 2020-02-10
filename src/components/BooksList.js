import React, {Component} from 'react';
import {Link} from "react-router-dom";
import * as BooksApi from '../api/BooksAPI';
import escapeStringRegexp from "escape-string-regexp";
import Book from "./Book";

class BooksList extends Component {
	constructor(props) {
		super(props);

		this.state = {
			allBooks: [],
			currentlyReading: [],
			wantToRead: [],
			booksRead: []
		}
	}

	componentDidMount() {
		BooksApi.getAll().then((books) => {
			// store the books in state to reduce API calls when the component mounts
			this.setState(() => ({
				...this.state,
				allBooks: books
			}), () =>{
				this.getAllBooks();
			});
		})
	}

	getAllBooks() {
		const books = this.state.allBooks;
		console.log("getAllBooks books: ", books);

		const currentlyReadingRegEx = new RegExp(escapeStringRegexp('currentlyReading'));
		const wantToReadRegEx = new RegExp(escapeStringRegexp('wantToRead'));
		const booksReadRegEx = new RegExp(escapeStringRegexp('booksRead'));
		const currentlyReading = books ? books.filter(book => currentlyReadingRegEx.test(book.shelf)) : null;
		const wantToRead = books ? books.filter(book => wantToReadRegEx.test(book.shelf)) : null;
		const booksRead = books ? books.filter(book => booksReadRegEx.test(book.shelf)) : null;

		console.log("getAllBooks booksRead: ", booksRead);

		this.setState(() => ({
			...this.state,
			currentlyReading: currentlyReading,
			wantToRead: wantToRead,
			booksRead: booksRead
		}), () => {
			console.log("getAllBooks: ", this.state)
		})
	};

	handleSwapShelf(book, shelf) {
		BooksApi.update(book, shelf).then(() => {
			this.getAllBooks()
		});
	}

	mapBooks(books) {
		console.log("mapBooks books: ", books);

		return books.map((book, index) => {
			return (
				<Book
					key={index}
					book={book}
					handleSwapShelf={this.handleSwapShelf.bind(this)} />
			)
		})

	}

	displayBookShelves(books, shelfTitle) {
		console.log("mapBooks displayBookShelves boos/title: ", books, shelfTitle);
		return (
			<div>
				<div className="bookshelf">
					<h2 className="bookshelf-title">{shelfTitle}</h2>
					<div className="bookshelf-books">
						<ol className="books-grid">
							{this.mapBooks(books)}
						</ol>
					</div>
				</div>
			</div>
		);
	};


	render() {
		// this prevents multiple rendering
		if (this.state.allBooks.length > 0) {
			const {allBooks, currentlyReading, wantToRead, booksRead} = this.state;

			console.log("render allBooks: ", allBooks)
			console.log("render currentlyReading: ", currentlyReading)
			// console.log("wantToRead: ", wantToRead)
			// console.log("booksRead: ", booksRead)

			return (
				<div className="list-books">
					<div className="list-books-title">
						<h1>MyReads</h1>
					</div>
					<div className="list-books-content">
						{this.displayBookShelves(currentlyReading, 'Books I Am Currently Reading')}
						{this.displayBookShelves(wantToRead, 'Books I Want to Read')}
						{this.displayBookShelves(booksRead, 'Books I\'ve Read')}
					</div>
					<div className="open-search">
						<Link to={"/add-a-book"} className={"add-a-book"}>Add a book</Link>
					</div>
				</div>
			);
		} else {
			return (
				<div className="list-books">
					<div className="list-books-title">
						<h1>MyReads</h1>
					</div>
					<div className="list-books-content">
						<p>Please Add a book to get started</p>
					</div>
					<div className="open-search">
						<Link to={"/add-a-book"} className={"add-a-book"}>Add a book</Link>
					</div>
				</div>
			)
		}
	}
}

export default BooksList;