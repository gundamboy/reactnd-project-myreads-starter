import React, {Component, useState} from 'react';
import {Link} from "react-router-dom";
import * as BooksAPI from '../api/BooksAPI';
import Book from "./Book";
import Header from "./layout/Header";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

class AddBook extends Component {
	constructor(props) {
		super(props);

		this.state = {
			searchedBooks: [],
			currentBooks: [],
			searchQ:  '',
			showAddBook: false,
			showModal: false,
			bookTitle: ''
		};
	}

	componentDidMount() {
		BooksAPI.getAll().then((books) => {
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
			.then(() => {
				if(shelf !== 'none') {
					this.showModal(book);
				}
			})
			.catch(() => alert('We\'re sorry but something went wrong. Please try again'));
	}

	showModal(book) {
		this.setState({
			...this.state,
			showModal: true,
			bookTitle: book.title
		})
	};

	closeModal = () => {
		this.setState({
			...this.state,
			showModal: false,
			bookTitle: ''
		})
	};

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
			return searchedBooks.error || searchedBooks.length <= 0 ?
				<div>No results found</div>
				: searchedBooks.map((book, index) => {
					const classes = (book.shelf !== 'none') ? `inShelf ${book.shelf}` : '';

					return (
						<Book
							key={index}
							book={book}
							classes={classes}
							handleSwapShelf={this.handleSwapShelf.bind(this)}/>
					);
				});
		}
	}

	render() {
		const searchInput = (
			<div className="search-books-bar">
				<div className="search-books-input-wrapper">
					<input
						type="text"
						placeholder="Search by title or author"
						value={this.state.search}
						onChange={e => this.handleSearchUpdate(e.target.value)}/>

				</div>
			</div>
		);

		return (
			<>
				<Header showAddButton={false} fixed={true} classes={'search'} searchBar={searchInput}/>
				<Modal show={this.state.showModal} onHide={this.closeModal}>
					<Modal.Header closeButton>
						<Modal.Title>MyReads</Modal.Title>
					</Modal.Header>
					<Modal.Body>{`Woohoo! ${this.state.bookTitle} has been added to your shelf!`}</Modal.Body>
					<Modal.Footer>
						<Button variant="secondary" onClick={this.closeModal}>
							Close
						</Button>
					</Modal.Footer>
				</Modal>
				<div className="search-books">
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