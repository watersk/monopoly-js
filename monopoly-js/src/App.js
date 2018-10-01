import React, { Component, version } from 'react';
import image from './monopoly_board.jpg';
import './App.css';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Input from '@material-ui/core/Input';
import Typography from '@material-ui/core/Typography';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Paper from '@material-ui/core/Paper';

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

const ListProperties = ({ PropertyList }) => (
  <div>
    {PropertyList.map((property, index) => {
      return(
        <ExpansionPanel key={index}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="headline">{property.title}</Typography>
          </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Paper square={true}><b>Color Group:</b> {property.colorGroup}</Paper>
              <Paper square={true}><b>Cost:</b> ${property.cost}</Paper>
              <Paper square={true}><b>Rent:</b> ${property.rent}</Paper>
              <Paper square={true}><b>House Cost:</b> ${property.houseCost}</Paper>
              <Paper square={true}><b>Hotel Cost:</b> ${property.hotelCost} + 4 houses</Paper>
              <Paper square={true}><b>Mortgage:</b> ${property.mortgageValue}</Paper>
              <Paper square={true}><b>Available?</b> {property.isOwned === false ? "Yes" : "No"}</Paper>
            </ExpansionPanelDetails>
        </ExpansionPanel>
      )
    })}
  </div>
)

class App extends Component {
  constructor(props) {
    super(props);

    this.state={
      playerDialogOpen: false,
      propDialogOpen: false,
      isGameReady: false,
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
    this.handleClickProperties = this.handleClickProperties.bind(this);
  }

  handleClickOpen = () => {
    this.setState({
      playerDialogOpen: true,
    });
  };

  handleClose = () => {
    this.setState({
      playerDialogOpen: false,
      propDialogOpen: false
    });
  };

  handleGameInit = () => {
    const newPropertyList = [
      {
        title: 'Mediterranean Ave',
        colorGroup: 'purple',
        cost: 60,
        rent: 2,
        mortgageValue: 30,
        houseCost: 50,
        hotelCost: 50,
        isOwned: false,
        isMortgaged: false
      },
      {
        title: 'Baltic Ave',
        colorGroup: 'purple',
        cost: 60,
        rent: 4,
        mortgageValue: 30,
        houseCost: 50,
        hotelCost: 50,
        isOwned: false,
        isMortgaged: false
      },
      {
        title: 'Reading Railroad',
        colorGroup: 'railroad',
        cost: 200,
        rent: 0,
        mortgageValue: 100,
        houseCost: 0,
        hotelCost: 0,
        isOwned: false,
        isMortgaged: false
      },
      {
        title: 'Oriental Ave',
        colorGroup: 'light blue',
        cost: 100,
        rent: 6,
        mortgageValue: 50,
        houseCost: 50,
        hotelCost: 50,
        isOwned: false,
        isMortgaged: false
      },
      {
        title: 'Vermont Ave',
        colorGroup: 'light blue',
        cost: 100,
        rent: 6,
        mortgageValue: 50,
        houseCost: 50,
        hotelCost: 50,
        isOwned: false,
        isMortgaged: false
      },
      {
        title: 'Connecticut Ave',
        colorGroup: 'light blue',
        cost: 120,
        rent: 8,
        mortgageValue: 60,
        houseCost: 50,
        hotelCost: 50,
        isOwned: false,
        isMortgaged: false
      },
      {
        title: 'St. Charles Place',
        colorGroup: 'pink',
        cost: 140,
        rent: 10,
        mortgageValue: 70,
        houseCost: 100,
        hotelCost: 100,
        isOwned: false,
        isMortgaged: false
      },
      {
        title: 'Electric Company',
        colorGroup: 'utilities',
        cost: 150,
        rent: 0,
        mortgageValue: 75,
        houseCost: 0,
        hotelCost: 0,
        isOwned: false,
        isMortgaged: false
      },
      {
        title: 'States Ave',
        colorGroup: 'pink',
        cost: 140,
        rent: 10,
        mortgageValue: 70,
        houseCost: 100,
        hotelCost: 100,
        isOwned: false,
        isMortgaged: false
      },
      {
        title: 'Virginia Ave',
        colorGroup: 'pink',
        cost: 160,
        rent: 12,
        mortgageValue: 80,
        houseCost: 100,
        hotelCost: 100,
        isOwned: false,
        isMortgaged: false
      },
      {
        title: 'Pennsylvania Railroad',
        colorGroup: 'railroad',
        cost: 200,
        rent: 0,
        mortgageValue: 100,
        houseCost: 0,
        hotelCost: 0,
        isOwned: false,
        isMortgaged: false
      },
      {
        title: 'St. James Place',
        colorGroup: 'orange',
        cost: 180,
        rent: 14,
        mortgageValue: 90,
        houseCost: 100,
        hotelCost: 100,
        isOwned: false,
        isMortgaged: false
      },
      {
        title: 'Tennessee Ave',
        colorGroup: 'orange',
        cost: 180,
        rent: 14,
        mortgageValue: 90,
        houseCost: 100,
        hotelCost: 100,
        isOwned: false,
        isMortgaged: false
      },
      {
        title: 'New York Ave',
        colorGroup: 'orange',
        cost: 200,
        rent: 16,
        mortgageValue: 100,
        houseCost: 100,
        hotelCost: 100,
        isOwned: false,
        isMortgaged: false
      },
      {
        title: 'Kentucky Ave',
        colorGroup: 'red',
        cost: 220,
        rent: 18,
        mortgageValue: 110,
        houseCost: 150,
        hotelCost: 150,
        isOwned: false,
        isMortgaged: false
      },
      {
        title: 'Indiana Ave',
        colorGroup: 'red',
        cost: 220,
        rent: 18,
        mortgageValue: 110,
        houseCost: 150,
        hotelCost: 150,
        isOwned: false,
        isMortgaged: false
      },
      {
        title: 'Illinois Ave',
        colorGroup: 'red',
        cost: 240,
        rent: 20,
        mortgageValue: 120,
        houseCost: 150,
        hotelCost: 150,
        isOwned: false,
        isMortgaged: false
      },
      {
        title: 'B & O Railroad',
        colorGroup: 'railroad',
        cost: 200,
        rent: 0,
        mortgageValue: 100,
        houseCost: 0,
        hotelCost: 0,
        isOwned: false,
        isMortgaged: false
      },
      {
        title: 'Atlantic Ave',
        colorGroup: 'yellow',
        cost: 260,
        rent: 22,
        mortgageValue: 130,
        houseCost: 150,
        hotelCost: 150,
        isOwned: false,
        isMortgaged: false
      },
      {
        title: 'Ventnor Ave',
        colorGroup: 'yellow',
        cost: 260,
        rent: 22,
        mortgageValue: 130,
        houseCost: 150,
        hotelCost: 150,
        isOwned: false,
        isMortgaged: false
      },
      {
        title: 'Water Works',
        colorGroup: 'utilities',
        cost: 150,
        rent: 0,
        mortgageValue: 75,
        houseCost: 0,
        hotelCost: 0,
        isOwned: false,
        isMortgaged: false
      },
      {
        title: 'Marvin Gardens',
        colorGroup: 'yellow',
        cost: 280,
        rent: 24,
        mortgageValue: 140,
        houseCost: 150,
        hotelCost: 150,
        isOwned: false,
        isMortgaged: false
      },
      {
        title: 'Pacific Ave',
        colorGroup: 'green',
        cost: 300,
        rent: 26,
        mortgageValue: 150,
        houseCost: 200,
        hotelCost: 200,
        isOwned: false,
        isMortgaged: false
      },
      {
        title: 'North Carolina Ave',
        colorGroup: 'green',
        cost: 300,
        rent: 26,
        mortgageValue: 150,
        houseCost: 200,
        hotelCost: 200,
        isOwned: false,
        isMortgaged: false
      },
      {
        title: 'Pennsylvania Ave',
        colorGroup: 'green',
        cost: 320,
        rent: 28,
        mortgageValue: 160,
        houseCost: 200,
        hotelCost: 200,
        isOwned: false,
        isMortgaged: false
      },
      {
        title: 'Short Line Railroad',
        colorGroup: 'railroad',
        cost: 200,
        rent: 0,
        mortgageValue: 100,
        houseCost: 0,
        hotelCost: 0,
        isOwned: false,
        isMortgaged: false
      },
      {
        title: 'Park Place',
        colorGroup: 'blue',
        cost: 350,
        rent: 35,
        mortgageValue: 175,
        houseCost: 200,
        hotelCost: 200,
        isOwned: false,
        isMortgaged: false
      },
      {
        title: 'Boardwalk',
        colorGroup: 'blue',
        cost: 400,
        rent: 50,
        mortgageValue: 200,
        houseCost: 200,
        hotelCost: 200,
        isOwned: false,
        isMortgaged: false
      }
    ];

    this.setState({
      propertyList: newPropertyList,
      isGameReady: true
    });

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
      playerDialogOpen: false,
      player
    });
  }

  handleClickProperties = () => {
    this.setState(
      {
        propDialogOpen: true
      }
    );
  }

  render() {
    console.log(this.state.propertyList);
    return (
      <div className="App">
        <header>
          <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
          <img src={image} alt="Monopoly Board" />
          <h1 className="App-title">Monopoly-JS</h1>
        </header>
        <div>
          { (this.state.player.name === '') ? 
            <Button variant="outlined" onClick={this.handleClickOpen}>Start</Button> :
            <Button variant="outlined" onClick={this.handleGameInit}>Go</Button>
          }
          <Dialog open={this.state.playerDialogOpen} onClose={this.handleClose}>
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
        <br />
        <br />
        <div>
          { (!(this.state.player.name === '') && (this.state.isGameReady)) ?
            <ListProperties PropertyList={this.state.propertyList}/> :
            <div />
          }
        </div>
        </div>
    );
  }
}

export default App;
