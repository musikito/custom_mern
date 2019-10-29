import React, { Component } from 'react';
import axios from 'axios';

export default class CreateCurrency extends Component {
  constructor(props) {
    super(props);
    this.onChangeCurrency = this.onChangeCurrency.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
    currency: ''
    };
  }

  onChangeCurrency(e) {
    this.setState({
    currency: e.target.value
    });
  }
  onSubmit(e) {
    e.preventDefault();
    const newCurrency = {
      currency: this.state.currency,
    };
    console.log(newCurrency);
    axios.post('http://localhost:5000/currency/add', newCurrency)
      .then(res => console.log(res.data));

      
    this.setState({
        currency: ''
    })
  }
  render() {
    return (
      <div>
         <h3>Create New Category</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group"> 
           <label>Category: </label>
           <input  type="text"
          required
          className="form-control"
          value={this.state.category}
          onChange={this.onChangeCategory}
          />
    </div>
    <div className="form-group">
      <input type="submit" value="Create Category" className="btn btn-primary" />
    </div>
  </form>
      </div>
    )
  }
}