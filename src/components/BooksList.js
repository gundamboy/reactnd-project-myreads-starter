import React, {Component} from 'react';
import * as BooksApi from '../api/BooksAPI';
import escapeStringRegexp from "escape-string-regexp";
import Book from "./Book";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {Container} from "react-bootstrap";
import Header from "./layout/Header";



class BooksList extends Component {
	constructor(props) {
		super(props);

		this.state = {
			currentlyReading: [],
			wantToRead: [],
			read: [],
			show: false,
			showAddBook: true
		}
	}

	componentDidMount() {
		this.getAllBooks();
	}

	getAllBooks() {
		BooksApi.getAll().then((books) => {
			const currentlyReadingRegEx = new RegExp(escapeStringRegexp('currentlyReading'));
			const wantToReadRegEx = new RegExp(escapeStringRegexp('wantToRead'));
			const readRegEx = new RegExp(escapeStringRegexp('read'));
			const currentlyReading = books ? books.filter(book => currentlyReadingRegEx.test(book.shelf)) : null;
			const wantToRead = books ? books.filter(book => wantToReadRegEx.test(book.shelf)) : null;
			const read = books ? books.filter(book => readRegEx.test(book.shelf)) : null;

			this.setState(() => ({
				...this.state,
				currentlyReading: currentlyReading,
				wantToRead: wantToRead,
				read: read,
			}), () => {

			})
		});
	};

	handleSwapShelf(book, shelf) {
		BooksApi.update(book, shelf).then(() => {
			this.getAllBooks()
		});
	}

	mapBooks(books) {
		console.log("BookList books: ", books.length);
		return books.map((book, index) => {
			return (
				<Book
					key={index}
					book={book}
					shelf={book.shelf}
					handleSwapShelf={this.handleSwapShelf.bind(this)} />
			)
		})

	}

	displayBookShelves(books, shelfTitle, wrapperClass) {
		const shelfClasses = ['shelf-wrapper', wrapperClass];
		if (books.length) {
			shelfClasses.push('show');
		}
		return (
			<>
				<Header showAddButton={true} fixed={false}/>
				<section className={shelfClasses.join(' ')}>
					<Container>
						<Row>
							<Col xs={12}>
								<h2 className="bookshelf-title">{shelfTitle}</h2>
							</Col>
						</Row>
						<Row>
							<Col xs={12}>
								<div className="bookshelf">
									<div className="bookshelf-books">
										<ol className="books-grid">
											{this.mapBooks(books)}
										</ol>
									</div>
								</div>
							</Col>
						</Row>
					</Container>
				</section>
			</>
		);
	};


	render() {
		// this prevents multiple rendering
		const {currentlyReading, wantToRead, read} = this.state;

		return (
			<div className="list-books">

				<div className="list-books-content">
					{this.displayBookShelves(currentlyReading, 'Books I Am Currently Reading', 'currentlyReading')}
					{this.displayBookShelves(wantToRead, 'Books I Want to Read', 'wantToRead')}
					{this.displayBookShelves(read, 'Books I\'ve Read', 'haveRead')}
				</div>
				<div className="open-search">
					{/*<Link to={"/add-a-book"} className={"add-a-book"}>Add a book</Link>*/}
				</div>
			</div>
		);
	}
}

export default BooksList;