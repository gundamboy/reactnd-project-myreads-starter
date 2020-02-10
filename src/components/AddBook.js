import React, {Component} from 'react';
import {Link} from "react-router-dom";
import * as BooksAPI from '../api/BooksAPI';
import Book from "./Book";

class AddBook extends Component {
	constructor(props) {
		super(props);

		this.state = {
			books: [],
			searchQ:  ''
		}
	}

	handleSearchUpdate(q) {

		BooksAPI.search(q).then(books =>
			books ?
				this.setState({
					...this.state,
					books: books
				}) : []
		);

		this.setState({
			...this.state,
			searchQ: q
		});
	}

	handleSwapShelf(book, shelf) {
		console.log("handleSwapShelf")
		BooksAPI.update(book, shelf)
			//TODO: make this a div or something
			.then(() => shelf !== 'none' ? alert(`${book.title} has been added to your shelf!`) : null)
			.catch(() => alert('Something went wrong! Please try again!'));
	}

	showResults() {
		const {books, searchQ} = this.state;

		if (searchQ) {
			return books.error ?
				<div>No results found</div>
				: books.map((book, index) => {
					return (
						<Book
							key={index}
							book={book}
							handleSwapShelf={this.handleSwapShelf.bind(this)}/>
					);
				});
		}
	}

	render() {
		return (
			<div className="search-books">
				<div className="search-books-bar">
					<Link className='close-search' to='/'>
						Close
					</Link>
					<div className="search-books-input-wrapper">
						<input
							type="text"
							placeholder="Search by title or author"
							value={this.state.search}
							onChange={e => this.handleSearchUpdate(e.target.value)}/>

					</div>
				</div>
				<div className="search-books-results">
					<ol className="books-grid">
						{this.showResults()}
					</ol>
				</div>
			</div>
		);
	}
}

export default AddBook;