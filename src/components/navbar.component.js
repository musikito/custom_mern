import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { NavDropdown } from 'react-bootstrap'

/*
class NavDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isToggleOn: false
    };
  }
  showDropdown(e) {
    e.preventDefault();
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));
  }
  render() {
    const classDropdownMenu = 'dropdown-menu' + (this.state.isToggleOn ? ' show' : '')
    return (
      <li className="nav-item dropdown">
        <a className="nav-link dropdown-toggle" href="/" id="navbarDropdown" role="button" data-toggle="dropdown"
          aria-haspopup="true" aria-expanded="false"
          onClick={(e) => {this.showDropdown(e)}}>
          {this.props.name}
        </a>
        <div className={classDropdownMenu} aria-labelledby="navbarDropdown">
          {this.props.children}
        </div>
      </li>
    )
  }
}
*/

export default class Navbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-light" style={{backgroundColor: '#6fd992'}}>
        <Link to="/" className="navbar-brand">Expenses Tracker</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
          <Link to="/" className="nav-link">Expenses</Link>
          </li>
          <li className="navbar-item">
          <Link to="/create" className="nav-link">Create Expense Log</Link>
          </li>
   
          <NavDropdown  title="Settings" id="basic-nav-dropdown">
              <Link to="/category" className="dropdown-item">Create Category</Link>
              <Link to="/currency" className="dropdown-item">Create Currency</Link>
              <Link to="/user" className="dropdown-item">Create User</Link>
            
          </NavDropdown>
          
        </ul>
        </div>
      </nav>
    );
  }
}