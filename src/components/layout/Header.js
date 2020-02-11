import React, {Component} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faBook } from '@fortawesome/free-solid-svg-icons';
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import {Link} from "react-router-dom";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";

class Header extends Component {
	constructor(props) {
		super(props);

		this.state = {
			showAddButton: this.props.showAddButton,
			isFixed: this.props.fixed
		}
	}


	render() {
		return (
			<header role="banner" className={this.state.isFixed ? "fixed" : ""}>
				<Navbar bg="beige" expand>
					<Navbar.Brand href="#home"><FontAwesomeIcon className={"book-icon"} icon={faBook} /> MyReads</Navbar.Brand>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					{this.state.showAddButton ?
						<Navbar.Collapse id="title-nav">
							<Nav className="open-search">
								<Link to={"/add-a-book"} className={"add-a-book"}>Add a Book</Link>
							</Nav>
						</Navbar.Collapse>
						:
						""
					}

				</Navbar>
			</header>
		);
	}
}

export default Header;