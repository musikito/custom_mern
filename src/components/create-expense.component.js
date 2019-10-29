import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class CreateExpense extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeCost = this.onChangeCost.bind(this);
    this.onChangeCurrency = this.onChangeCurrency.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onChangeCategory = this.onChangeCategory.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: '',
      description: '',
      cost: 0,
      currencies:[],
      currency: '',
      date: new Date(),
      category: '',
      categories: [],
      users: []
    }
  }

  componentDidMount() {
    // Get the users and show populate
    // dropdown
    axios.get('http://localhost:5000/users/')
    .then(response => {
      if (response.data.length > 0) {
        this.setState({ 
          users: response.data.map(user => user.username),
          username: response.data[0].username
        });
      }
    })
    .catch((error) => {
      console.log(error);
    });

    axios.get('http://localhost:5000/categories/')
    .then(response => {
      if (response.data.length > 0) {
        this.setState({ 
          categories: response.data.map(category => category.category),
          category: response.data[0].category
        });
      }
    })
    .catch((error) => {
      console.log(error);
    });

    axios.get('http://localhost:5000/currencies/')
    .then(response => {
      if (response.data.length > 0) {
        this.setState({ 
          currencies: response.data.map(currency => currency.currency),
          currency: response.data[0].currency
        });
      }
    })
    .catch((error) => {
      console.log(error);
    });

    
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onChangeCategory(e) {
    this.setState({
      category: e.target.value
    });
  }

  onChangeCurrency(e) {
    this.setState({
      currency: e.target.value
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    });
  }

  onChangeCost(e) {
    this.setState({
      cost: e.target.value
    });
  }

  onChangeDate(date) {
    this.setState({
      date: date
    });
  }

  onSubmit(e) {
    e.preventDefault();
  
    const expense = {
      username: this.state.username,
      description: this.state.description,
      cost: this.state.cost,
      category: this.state.category,
      currency: this.state.currency,
      date: this.state.date,
    };
  
    console.log(expense);
    axios.post('http://localhost:5000/expenses/add', expense)
        .then(res => console.log(res.data));
       window.location = '/';
  }

  render() {
    return (
      <div>
        <h3>Create New Expense Entry</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group"> 
            <label>Username: </label>
            <select ref="userInput"
                required
                className="form-control"
                value={this.state.username}
                onChange={this.onChangeUsername}>
                {
                  this.state.users.map(function(user) {
                    return <option 
                      key={user}
                      value={user}>{user}
                      </option>;
                  })
                }
            </select>
          </div>
          <div className="form-group"> 
            <label>Categories: </label>
            <select ref="userInput"
                required
                className="form-control"
                value={this.state.category}
                onChange={this.onChangeCategory}>
                {
                  this.state.categories.map(function(category) {
                    return <option 
                      key={category}
                      value={category}>{category}
                      </option>;
                  })
                }
            </select>
          </div>
          <div className="form-group"> 
            <label>Currency: </label>
            <select ref="userInput"
                required
                className="form-control"
                value={this.state.currency}
                onChange={this.onChangeCurrency}>
                {
                  this.state.currencies.map(function(currency) {
                    return <option 
                      key={currency}
                      value={currency}>{currency}
                      </option>;
                  })
                }
            </select>
          </div>
          <div className="form-group"> 
            <label>Description: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.description}
                onChange={this.onChangeDescription}
                />
          </div>
          <div className="form-group">
            <label>Cost: </label>
            <input 
                type="text" 
                required
                className="form-control"
                value={this.state.cost}
                onChange={this.onChangeCost}
                />
          </div>
          <div className="form-group">
            <label>Date: </label>
            <div>
              <DatePicker
                selected={this.state.date}
                onChange={this.onChangeDate}
              />
            </div>
          </div>

          <div className="form-group">
            <input type="submit" value="Create Expense Log" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}