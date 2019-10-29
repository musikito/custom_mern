import React, { Component } from 'react';
import axios from 'axios';

export default class CreateCategory extends Component {
  constructor(props) {
    super(props);
    this.onChangeCategory = this.onChangeCategory.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      category: ''
    };
  }

  onChangeCategory(e) {
    this.setState({
      category: e.target.value
    });
  }
  onSubmit(e) {
    e.preventDefault();
    const newCategory = {
      category: this.state.category,
    };
    console.log(newCategory);
    axios.post('http://localhost:5000/categories/add', newCategory)
      .then(res => console.log(res.data));

      
    this.setState({
      category: ''
    })
  }
  render() {
    return (
      <div>
         <h3>Create New Category</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group"> 
           <label>Enter New Category: </label>
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