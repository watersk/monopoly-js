import React, { Component } from 'react';
import logo from './logo.svg';
import image from './monopoly_board.jpg';
import './App.css';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import { InputLabel } from '@material-ui/core';

const PlayerNames = ({values}) => (
  <div>
    {values.map(function(currentValue, index) {
      return(<div key={index}>
        <div>
          <div>Name: {currentValue.playerName}</div>  
        </div>
      </div>)
    })}
  </div>
)

class App extends Component {
  constructor(props) {
    super(props);

    this.state={
      dialogOpen: false,
      playerName: '',
      playerList: []
    };

    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleClickOpen = () => {
    this.setState({
      dialogOpen: true,
    });
  };

  handleClose = () => {
    this.setState({
      dialogOpen: false
    });
  };

  handleNameChange = e => {
    this.setState({
      playerName: e.target.value
    });
  };

  handleSubmit = () => {
    const newState = this.state.playerList;

    newState.push({
      playerName: this.state.playerName
    });

    this.setState({
      dialogOpen: false,
      playerName: '',
      playerList: newState
    });
  }

  render() {
    return (
      <div className="App">
        <header>
          <img src={image} alt="Monopoly Board" />
          <h1 className="App-title">Monopoly-JS</h1>
        </header>
        <div>
          <Button variant="outlined" onClick={this.handleClickOpen}>Start</Button>
          <Dialog open={this.state.dialogOpen} onClose={this.handleClose}>
            <div style={{padding: '50px'}}>
              <FormControl>
                <InputLabel id="name">Name</InputLabel>
                <Input id="playerName" value={this.state.playerName} onChange={this.handleNameChange}></Input>
              </FormControl>
              <br />
              <FormControl>
                <Button variant="outlined" onClick={this.handleSubmit}>Submit</Button>
              </FormControl>
            </div>
          </Dialog>
        </div>
        <div>
          { ((this.state.playerList).length <= 0) ? <div /> : <PlayerNames values={this.state.playerList} /> }
        </div>
      </div>
    );
  }
}

export default App;
