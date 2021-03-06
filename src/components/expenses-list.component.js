import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Expense = props => (
  <tr>
    <td>{props.expense.username}</td>
    <td>{props.expense.category}</td>
    <td>{props.expense.currency}</td>
    <td>{props.expense.description}</td>
    <td>{props.expense.cost}</td>
    <td>{props.expense.date.substring(0,10)}</td>
    <td>
    
      <Link to={"/edit/"+props.expense._id}>
      <button type="button" className="btn btn-outline-primary">Edit</button>
     </Link> | <button type="button" className="btn btn-outline-danger" onClick={() => { props.deleteExpense(props.expense._id) }}>Delete</button>
    </td>
  </tr>
)

export default class ExpensesList extends Component {
  constructor(props) {
    super(props);

    this.deleteExpense = this.deleteExpense.bind(this)

    this.state = {expenses: []};
  }

  componentDidMount() {
    axios.get('http://localhost:5000/expenses/')
      .then(response => {
        this.setState({ expenses: response.data })
       // console.log(response.data)
      })
      
      
      .catch((error) => {
        console.log(error);
      })
  }

  deleteExpense(id) {
    axios.delete('http://localhost:5000/expenses/'+id)
      .then(response => { console.log(response.data)});

    this.setState({
      expenses: this.state.expenses.filter(el => el._id !== id)
    })
  }

  expenseList() {
    return this.state.expenses.map(currentexpense => {
      return <Expense expense={currentexpense} deleteExpense={this.deleteExpense} key={currentexpense._id}/>;
    })
  }

  render() {
    return (
      <div>
        <h3>Logged Expenses</h3>
        <table className="table" style={{backgroundColor: '#6fd992'}}>
          <thead className="thead-light" > 
            <tr>
              <th>Username</th>
              <th>Category</th>
              <th>Currency</th>
              <th>Description</th>
              <th>Cost</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            { this.expenseList() }
          </tbody>
        </table>
      </div>
    )
  }
}