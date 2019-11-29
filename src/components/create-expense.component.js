import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
//import Checkbox from "./checkbox.component";




export default class CreateExpense extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeCost = this.onChangeCost.bind(this);
    this.onChangeCurrency = this.onChangeCurrency.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onChangePaidBy = this.onChangePaidBy.bind(this);
    this.onChangePlanned = this.onChangePlanned.bind(this);
    this.onChangeCategory = this.onChangeCategory.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.renderRedirect = this.renderRedirect.bind(this);

    this.state = {
      username: '',
      description: '',
      cost: 0,
      currencies:[],
      currency: '',
      date: new Date(),
      category: '',
      categories: [],
      users: [],
      paidby: new Date(),
      planned: false,
      checked: false
    };
    
  }



  

  renderRedirect = async () => {
    console.log("in redirect");
      //return <Redirect to='/' />;
       //window.location.href="/";
       this.props.history.push('/');
   
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

  onChangePaidBy(date)
  {
    this.setState({
      paidby: date
    })
  }

  onChangePlanned(e)
  {
    if (e.target.checked){
      console.log("checked")
      this.setState({
        planned: true
      })
    }else{
      console.log("un - checked")
      this.setState({
        planned: false
      })
    }
   
  }
  handleChange({target}){
    if (target.checked){
       console.log(!target.setAttribute('checked', true));
       //this.planned = true;
       
    } else {
       console.log(!!target.removeAttribute('checked'));
       //this.planned = false;
       
    }
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
      paidby: this.state.paidby,
      planned: this.state.planned 

    };
  console.log(expense.planned)
    //console.log(expense);
    axios.post('http://localhost:5000/expenses/add', expense)
        .then(res => console.log(res.data))
        .then(this.renderRedirect);
      // window.location = '/';
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
          <div className="form-check">
             <input 
             type="checkbox" 
             className="form-check-input" 
             id="planned" 
             value={this.state.planned}
             onChange={this.onChangePlanned}
             />
             <label className="form-check-label" for="planned">Planned</label>
          </div>
          <div>
          <input type="checkbox"
                        onClick={this.handleChange}
                        defaultChecked={this.props.complete}
                  />
                  <label>check test</label>
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
            <input type="submit" value="Create Expense Log" className="btn btn-outline-success"  />
          </div>
        </form>
      </div>
    )
  }
}