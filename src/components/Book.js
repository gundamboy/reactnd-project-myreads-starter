import React, {Component} from 'react';
import PropTypes from 'prop-types'

const Book = ({ book, handleSwapShelf }) => {

	// if a book doesn't have a cover we want to show SOMETHING to the user so it's not blank.
	// They may think the app isn't working properly otherwise.
	const bookImageUrl = book.imageLinks ? book.imageLinks.smallThumbnail : 'https://dummyimage.com/123x192/b8b8b8/333333.png&text=No+Cover+Available';

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
						<select value={book.shelf}
						        onChange={e => handleSwapShelf(book, e.target.value)}>
							<option value="move" disabled>Move to...</option>
							<option value="currentlyReading">Currently Reading</option>
							<option value="wantToRead">Want to Read</option>
							<option value="read">Read</option>
							<option value="none">None</option>
						</select>
					</div>
				</div>
				<div className="book-title">{book.title}</div>
				<div className="book-authors">{book.authors}</div>
			</div>
		</li>
	)
}

export default Book;