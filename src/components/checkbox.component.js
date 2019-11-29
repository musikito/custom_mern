import React, { Component } from 'react';

export default class Checkbox extends Component {
    getInitialState: function() {
      return {checked: true}
    },
    handleCheck: function() {
      this.setState({checked: !this.state.checked});
    },
    render: function() {
      var msg;
      if (this.state.checked) {
        msg = "Checked";
      } else {
        msg = "Un-checked";
      }
      return (
        <div>
          <input type="checkbox" onChange={this.handleCheck} defaultChecked={this.state.checked}/>
          <p>Checkbox: {msg}</p>
        </div>
      );
    }
  };