import React, {Component} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faBook, faSearch } from '@fortawesome/free-solid-svg-icons';
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import {Link} from "react-router-dom";

class Header extends Component {
	constructor(props) {
		super(props);

		this.state = {
			showAddButton: this.props.showAddButton,
			isFixed: this.props.fixed,
			classes: this.props.classes,
			searchBar: this.props.searchBar
		}
	}

	render() {
		const classes = [this.state.isFixed ? "fixed" : "", this.state.classes].join(' ')
		return (
			<header role="banner" className={classes}>
				<Navbar bg="beige" expand>
					<Navbar.Brand><FontAwesomeIcon className={"book-icon"} icon={faBook} /> MyReads</Navbar.Brand>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="title-nav">
						<Nav className="open-search">
							{this.state.showAddButton ?
								<Link to={"/add-a-book"} className={"add-a-book"}>Add a Book</Link>
							:
								<div className="search-container">
									<div className="search-books-input-wrapper">
										<FontAwesomeIcon className={"search-icon"} icon={faSearch} size="lg"/> {this.props.searchBar}
									</div>
									<Link to={"/"} className={"back-to-shelves"}>Back to Shelves</Link>
								</div>
							}
						</Nav>
					</Navbar.Collapse>
				</Navbar>

			</header>
		);
	}
}

export default Header;