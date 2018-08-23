import React, { Component } from 'react';
import logo from './logo.svg';
import image from './monopoly_board.jpg';
import './App.css';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Input from '@material-ui/core/Input';

const SubmitForm = (
  {
    handleFormSubmit, playerName, handleNameChange, labelName
  }
) => (
  <div style={{ paddingLeft: '25%', paddingRight: '25%' }}>
    {labelName}: <Input type='text' onChange={handleNameChange} />
    <br />
    <br />
    <br />
    <Button variant='outlined' onClick={handleFormSubmit}>Submit</Button>
  </div>
)

class App extends Component {
  constructor(props) {
    super(props);

    this.state={
      dialogOpen: false,
      player: {
        name: '',
        bank: '',
        properties: [],
        cards: []
      },
      property: {
        title: '',
        colorGroup: '',
        cost: '',
        rent: '',
        mortgageValue: '',
        houseCost: '',
        hotelCost: '',
        isOwned: false,
        isMortgaged: false
      },
      propertyList: []
    };

    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleGameInit = this.handleGameInit.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
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

  handleGameInit = () => {
    const newState = this.state.propertyList;

    // all of the properties and their info //
    let property = Object.assign({}, this.state.property);
      property.title = 'Mediterranean Ave';
      property.colorGroup = 'purple';
      property.cost = 60;
      property.rent = 2;
      property.mortgageValue = 30;
      property.houseCost = 50;
      property.hotelCost = 50;
      property.isOwned = false;
      property.isMortgaged = false;
    this.setState({property});
    newState.push({property});
    
      property.title = 'Baltic Ave';
      property.colorGroup = 'purple';
      property.cost = 60;
      property.rent = 4;
      property.mortgageValue = 30;
      property.houseCost = 50;
      property.hotelCost = 50;
      property.isOwned = false;
      property.isMortgaged = false;
    this.setState({property});
    newState.push({property});

      property.title = 'Reading Railroad';
      property.colorGroup = 'railroad';
      property.cost = 200;
      property.rent = 0;
      property.mortgageValue = 100;
      property.houseCost = 0;
      property.hotelCost = 0;
      property.isOwned = false;
      property.isMortgaged = false;
    this.setState({property});
    newState.push({property});

      property.title = 'Oriental Ave';
      property.colorGroup = 'light blue';
      property.cost = 100;
      property.rent = 6;
      property.mortgageValue = 50;
      property.houseCost = 50;
      property.hotelCost = 50;
      property.isOwned = false;
      property.isMortgaged = false;
      this.setState({property});
    newState.push({property});

      property.title = 'Vermont Ave';
      property.colorGroup = 'light blue';
      property.cost = 100;
      property.rent = 6;
      property.mortgageValue = 50;
      property.houseCost = 50;
      property.hotelCost = 50;
      property.isOwned = false;
      property.isMortgaged = false;
      this.setState({property});
    newState.push({property});

      property.title = 'Connecticut Ave';
      property.colorGroup = 'light blue';
      property.cost = 120;
      property.rent = 8;
      property.mortgageValue = 60;
      property.houseCost = 50;
      property.hotelCost = 50;
      property.isOwned = false;
      property.isMortgaged = false;
      this.setState({property});
    newState.push({property});

      property.title = 'St. Charles Place';
      property.colorGroup = 'pink';
      property.cost = 140;
      property.rent = 10;
      property.mortgageValue = 70;
      property.houseCost = 100;
      property.hotelCost = 100;
      property.isOwned = false;
      property.isMortgaged = false;
      this.setState({property});
    newState.push({property});

      property.title = 'Electric Company';
      property.colorGroup = 'utilities';
      property.cost = 150;
      property.rent = 0;
      property.mortgageValue = 75;
      property.houseCost = 0;
      property.hotelCost = 0;
      property.isOwned = false;
      property.isMortgaged = false;
      this.setState({property});
    newState.push({property});

      property.title = 'States Ave';
      property.colorGroup = 'pink';
      property.cost = 140;
      property.rent = 10;
      property.mortgageValue = 70;
      property.houseCost = 100;
      property.hotelCost = 100;
      property.isOwned = false;
      property.isMortgaged = false;
      this.setState({property});
    newState.push({property});

      property.title = 'Virginia Ave';
      property.colorGroup = 'pink';
      property.cost = 160;
      property.rent = 12;
      property.mortgageValue = 80;
      property.houseCost = 100;
      property.hotelCost = 100;
      property.isOwned = false;
      property.isMortgaged = false;
      this.setState({property});
    newState.push({property});

      property.title = 'Pennsylvania Railroad';
      property.colorGroup = 'railroad';
      property.cost = 200;
      property.rent = 0;
      property.mortgageValue = 100;
      property.houseCost = 0;
      property.hotelCost = 0;
      property.isOwned = false;
      property.isMortgaged = false;
      this.setState({property});
    newState.push({property});

      property.title = 'St. James Place';
      property.colorGroup = 'orange';
      property.cost = 180;
      property.rent = 14;
      property.mortgageValue = 90;
      property.houseCost = 100;
      property.hotelCost = 100;
      property.isOwned = false;
      property.isMortgaged = false;
      this.setState({property});
    newState.push({property});

      property.title = 'Tennessee Ave';
      property.colorGroup = 'orange';
      property.cost = 180;
      property.rent = 14;
      property.mortgageValue = 90;
      property.houseCost = 100;
      property.hotelCost = 100;
      property.isOwned = false;
      property.isMortgaged = false;
      this.setState({property});
    newState.push({property});

      property.title = 'New York Ave';
      property.colorGroup = 'orange';
      property.cost = 200;
      property.rent = 16;
      property.mortgageValue = 100;
      property.houseCost = 100;
      property.hotelCost = 100;
      property.isOwned = false;
      property.isMortgaged = false;
      this.setState({property});
    newState.push({property});

      property.title = 'Kentucky Ave';
      property.colorGroup = 'red';
      property.cost = 220;
      property.rent = 18;
      property.mortgageValue = 110;
      property.houseCost = 150;
      property.hotelCost = 150;
      property.isOwned = false;
      property.isMortgaged = false;
      this.setState({property});
    newState.push({property});

      property.title = 'Indiana Ave';
      property.colorGroup = 'red';
      property.cost = 220;
      property.rent = 18;
      property.mortgageValue = 110;
      property.houseCost = 150;
      property.hotelCost = 150;
      property.isOwned = false;
      property.isMortgaged = false;
      this.setState({property});
    newState.push({property});

      property.title = 'Illinois Ave';
      property.colorGroup = 'red';
      property.cost = 240;
      property.rent = 20;
      property.mortgageValue = 120;
      property.houseCost = 150;
      property.hotelCost = 150;
      property.isOwned = false;
      property.isMortgaged = false;
      this.setState({property});
    newState.push({property});

      property.title = 'B & O Railroad';
      property.colorGroup = 'railroad';
      property.cost = 200;
      property.rent = 0;
      property.mortgageValue = 100;
      property.houseCost = 0;
      property.hotelCost = 0;
      property.isOwned = false;
      property.isMortgaged = false;
      this.setState({property});
    newState.push({property});

      property.title = 'Atlantic Ave';
      property.colorGroup = 'yellow';
      property.cost = 260;
      property.rent = 22;
      property.mortgageValue = 130;
      property.houseCost = 150;
      property.hotelCost = 150;
      property.isOwned = false;
      property.isMortgaged = false;
      this.setState({property});
    newState.push({property});

      property.title = 'Ventnor Ave';
      property.colorGroup = 'yellow';
      property.cost = 260;
      property.rent = 22;
      property.mortgageValue = 130;
      property.houseCost = 150;
      property.hotelCost = 150;
      property.isOwned = false;
      property.isMortgaged = false;
      this.setState({property});
    newState.push({property});

      property.title = 'Water Works';
      property.colorGroup = 'utilities';
      property.cost = 150;
      property.rent = 0;
      property.mortgageValue = 75;
      property.houseCost = 0;
      property.hotelCost = 0;
      property.isOwned = false;
      property.isMortgaged = false;
      this.setState({property});
    newState.push({property});

      property.title = 'Marvin Gardens';
      property.colorGroup = 'yellow';
      property.cost = 280;
      property.rent = 24;
      property.mortgageValue = 24;
      property.houseCost = 150;
      property.hotelCost = 150;
      property.isOwned = false;
      property.isMortgaged = false;
      this.setState({property});
    newState.push({property});

      property.title = 'Pacific Ave';
      property.colorGroup = 'green';
      property.cost = 300;
      property.rent = 26;
      property.mortgageValue = 150;
      property.houseCost = 200;
      property.hotelCost = 200;
      property.isOwned = false;
      property.isMortgaged = false;
      this.setState({property});
    newState.push({property});

      property.title = 'North Carolina Ave';
      property.colorGroup = 'green';
      property.cost = 300;
      property.rent = 26;
      property.mortgageValue = 150;
      property.houseCost = 200;
      property.hotelCost = 200;
      property.isOwned = false;
      property.isMortgaged = false;
      this.setState({property});
    newState.push({property});

      property.title = 'Pennsylvania Ave';
      property.colorGroup = 'green';
      property.cost = 320;
      property.rent = 28;
      property.mortgageValue = 160;
      property.houseCost = 200;
      property.hotelCost = 200;
      property.isOwned = false;
      property.isMortgaged = false;
      this.setState({property});
    newState.push({property});

      property.title = 'Short Line Railroad';
      property.colorGroup = 'railroad';
      property.cost = 200;
      property.rent = 0;
      property.mortgageValue = 100;
      property.houseCost = 0;
      property.hotelCost = 0;
      property.isOwned = false;
      property.isMortgaged = false;
      this.setState({property});
    newState.push({property});

      property.title = 'Park Place';
      property.colorGroup = 'blue';
      property.cost = 350;
      property.rent = 35;
      property.mortgageValue = 175;
      property.houseCost = 200;
      property.hotelCost = 200;
      property.isOwned = false;
      property.isMortgaged = false;
      this.setState({property});
    newState.push({property});

      property.title = 'Boardwalk';
      property.colorGroup = 'blue';
      property.cost = 400;
      property.rent = 50;
      property.mortgageValue = 200;
      property.houseCost = 200;
      property.hotelCost = 200;
      property.isOwned = false;
      property.isMortgaged = false;
      this.setState({property});
    newState.push({property});

    this.setState({
      propertyList: newState,
      property: {
        title: '',
        colorGroup: '',
        cost: '',
        rent: '',
        mortgageValue: '',
        houseCost: '',
        hotelCost: '',
        isOwned: false,
        isMortgaged: false
      }
    })

  }

  handleNameChange(e) {
    let player = Object.assign({}, this.state.player);
    player.name = e.target.value;
    player.bank = '';
    player.properties = [];
    player.cards = [];
    this.setState({player});
  }

  handleFormSubmit() {
    if (this.state.player.name === '') {
      window.alert("Name is required.");
      return false;
    }

    let player = Object.assign({}, this.state.player);
    player.name = this.state.player.name;
    player.bank = 1500;
    player.properties = [];
    player.cards = [];
    this.setState({
      dialogOpen: false,
      player
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
          { (this.state.player.name === '') ? 
            <Button variant="outlined" onClick={this.handleClickOpen}>Start</Button> :
            <Button variant="outlined" onClick={this.handleGameInit}>Go</Button>
          }
          <Dialog open={this.state.dialogOpen} onClose={this.handleClose}>
            <div style={{padding: '50px'}}>
              <SubmitForm
                handleFormSubmit={this.handleFormSubmit}
                playerName={this.state.player.name}
                handleNameChange={this.handleNameChange}
                labelName="Name"
              />
            </div>
          </Dialog>
        </div>
      </div>
    );
  }
}

export default App;
