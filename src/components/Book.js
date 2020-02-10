import React, {Component} from 'react';
import PropTypes from 'prop-types'

class Book extends Component {
	constructor(props) {
		super(props);

		this.state = {
			shelf: props.book.shelf
		}

		console.log("inside Book")
	}

	static propTypes = {
		handleSwapShelf: PropTypes.func.isRequired,
		book: PropTypes.shape({
			title: PropTypes.string.isRequired,
			authors: PropTypes.array,
			imageURLs: PropTypes.object
		})
	}

	swapBookShelf = (event) => {
		// gets the shelf target
		const shelf = event.target.value;

		// gets the current selected book to move
		let changedBook = this.props.book;

		// set the shelf to move the book to
		changedBook.shelf = shelf;

		// the shelf in state
		this.setState(() => ({
			...this.state,
			shelf: shelf
		}));

		// use the function passed to props
		this.props.handleSwapShelf(changedBook);
	}

	render() {
		const { title, imageURLs } = this.props.book;
		let { authors } = this.props.book;

		// if a book doesn't have a cover we want to show SOMETHING to the user so it's not blank.
		// They may think the app isn't working properly otherwise.
		let bookImageUrl = (imageURLs && imageURLs.thumbnail && imageURLs.thumbnail.length > 0)
			? imageURLs.thumbnail
			: 'https://dummyimage.com/123x192/b8b8b8/333333.png&text=No+Cover+Available';

		// set the author/s
		authors = authors ? authors.join(', ') : '';

		// sets the book url css properly
		const styles = {
			width: '128px',
			height: '193px',
			backgroundImage: `url(${bookImageUrl})`
		};

		return (
			<li>
				<div className="book">
					<div className="book-top">
						<div className="book-cover" style={styles}></div>
						<div className="book-shelf-changer">
							<select value={this.state.shelf} onChange={this.swapBookShelf}>
								<option value="move" disabled>Move to...</option>
								<option value="currentlyReading">Currently Reading</option>
								<option value="wantToRead">Want to Read</option>
								<option value="read">Read</option>
								<option value="none">None</option>
							</select>
						</div>
					</div>
					<div className="book-title">{title}</div>
					<div className="book-authors">{authors}</div>
				</div>
			</li>
		);
	}
}

export default Book;