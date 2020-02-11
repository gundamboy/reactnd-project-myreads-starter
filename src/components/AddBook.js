import React, {Component} from 'react';
import {Link} from "react-router-dom";
import * as BooksAPI from '../api/BooksAPI';
import Book from "./Book";
import Header from "./layout/Header";

class AddBook extends Component {
	constructor(props) {
		super(props);

		this.state = {
			searchedBooks: [],
			currentBooks: [],
			searchQ:  '',
			showAddBook: false
		};
	}

	componentDidMount() {
		BooksAPI.getAll().then((books) => {
			console.log("AddBook getAll: ", books);
			this.setState({
				...this.state,
				currentBooks: books
			}, ()=>{

			})
		})
	}

	handleSearchUpdate(searchQ) {
		BooksAPI.search(searchQ.trim(), 20).then((books) => {
			if (books) {
				books.length > 0
					? this.setState({...this.state, searchedBooks: books})
					: this.setState({...this.state, searchedBooks: []})
			}
		});
		this.setState({
			...this.state,
			searchQ
		});
	}

	handleSwapShelf(book, shelf) {
		BooksAPI.update(book, shelf)
			//TODO: make this a div or something
			.then(() => shelf !== 'none' ? alert(`${book.title} has been added to your shelf!`) : null)
			.catch(() => alert('Something went wrong! Please try again!'));
	}

	showResults() {
		const {searchedBooks, currentBooks, searchQ} = this.state;
		searchedBooks.forEach((book) => {
			let match = currentBooks.find((sb) => sb.id === book.id);
			if (match) {
				book.shelf = match.shelf;
			} else {
				book.shelf = 'none'
			}
		});

		if (searchQ) {
			console.log("searchedBooks: ", searchedBooks);
			return searchedBooks.error || searchedBooks.length <= 0 ?
				<div>No results found</div>
				: searchedBooks.map((book, index) => {
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
			<>
				<Header showAddButton={false} fixed={true}/>
				<div className="search-books">
					<div className="search-books-bar">
						<Link title='Go Back To Your Books' className='close-search' to='/'>
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
				</>
		);
	}
}

export default AddBook;