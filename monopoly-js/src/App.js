import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Button from '@material-ui/core/Button';

class App extends Component {
  constructor(props) {
    super(props);

    this.state={
      d1: 1,
      d2: 1,
      rollTotal: 2
    };

    this.handleRoll = this.handleRoll.bind(this);
  }

  handleRoll(e) {
    this.state.d1 = Math.floor((Math.random()*6) + 1);
    this.state.d2 = Math.floor((Math.random()*6) + 1);
    this.state.rollTotal = this.state.d1 + this.state.d2;

    window.alert("Die 1: " + this.state.d1 + " and Die 2: " + this.state.d2 + " = " + this.state.rollTotal);
    return false;
  }

  render() {
    return (
      <div className="App">
        <h1 className="App-title">Monopoly-JS</h1>
        <div>
          <Button onClick={this.handleRoll}>Roll</Button>
        </div>
      </div>
    );
  }
}

export default App;
