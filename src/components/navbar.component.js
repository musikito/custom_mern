import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand">Expenses Tracker</Link>
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
          <Link to="/" className="nav-link">Expenses</Link>
          </li>
          <li className="navbar-item">
          <Link to="/create" className="nav-link">Create Expense Log</Link>
          </li>
          <li className="navbar-item">
          <Link to="/category" className="nav-link">Create Category</Link>
          </li>
          <li className="navbar-item">
          <Link to="/currency" className="nav-link">Create Currency</Link>
          </li>
          <li className="navbar-item">
          <Link to="/user" className="nav-link">Create User</Link>
          </li>
        </ul>
        </div>
      </nav>
    );
  }
}