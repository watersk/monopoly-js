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
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

//SubmitForm component for player creation
const SubmitForm = (
  {
    handleFormSubmit, handleNameChange, labelName
  }
) => (
  <CardContent style={{ border: '0px' }}>
    {labelName}: <Input type='text' onChange={handleNameChange} />
    <br />
    <br />
    <br />
    <Button variant='outlined' onClick={handleFormSubmit}>Submit</Button>
  </CardContent>
)

//ListProperties component to display all information for all properties
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

// ListPlayers component to generate player info for user to see
const ListPlayers = ({ PlayerList, BoardArr }) => (
  <div>
    {PlayerList.map((player, index) => {
      return(
        <Card key={index}>
          <CardContent style={{ textAlign: 'left' }}>
            <div><b>Name:</b> {player.name}</div>
            <div><b>Current Bank:</b> {player.bank}</div>
            <div><b>Number of Properties Owned: </b> {player.properties.length}</div>
            <br/>
            { (player.properties.length > 0) ?
              <ListProperties PropertyList = {player.properties} /> :
              <div />
            }
            <br/>
            <div><b>Current Location:</b> 
              { (player.currentLocation === '') ?
                " Not on the board yet. Click Go to initialize player location." :
                (" " + BoardArr[player.currentLocation].title)
              }
            </div>
          </CardContent>
        </Card>
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
        currentLocation: '',
        properties: [],
        cards: [],
      },
      die1: '',
      die2: '',
      rollTotal: '',
      doublesCounter: 0,
      propertyList: [],
      playerList: [],
      communityCards: [],
      chanceCards: []
    };

    //binding functions
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleGameInit = this.handleGameInit.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleClickProperties = this.handleClickProperties.bind(this);
    this.handleClickRoll = this.handleClickRoll.bind(this);
    this.initializePlayerLocation = this.initializePlayerLocation.bind(this);
    this.shuffleDeck = this.shuffleDeck.bind(this);
    //this.getNewLocation = this.getNewLocation.bind(this);
    this.endRoll = this.endRoll.bind(this);
  }

  //initialize players locations to go by taking in the player list an the board
  initializePlayerLocation(playerList, boardArr) {
    const newPlayerList = playerList;

    var i;
    for (i=0; i<newPlayerList.length; i++) {
      newPlayerList[i].currentLocation = boardArr[0].id;
    }

    this.setState({
      playerList: newPlayerList
    });
  }

  //open playerDialog to open form (player generation)
  handleClickOpen = () => {
    this.setState({
      playerDialogOpen: true,
    });
  };

  //close function for all dialogs
  handleClose = () => {
    this.setState({
      playerDialogOpen: false,
      propDialogOpen: false
    });
  };

  shuffleDeck(deck) {
    const newDeck = deck;

    var newLoc, temp, i;
    for (i = (deck.length - 1); i > 0; i--) {
      newLoc = Math.floor(Math.random() * (i + 1));
      temp = newDeck[i];
      newDeck[i] = newDeck[newLoc];
      newDeck[newLoc] = temp;
    }

    return newDeck;
  };

  //initialize all basic game info (properties, chance, community chest, players start at go)
  handleGameInit = () => {
    const newPropertyList = [
      {
        id: 0,
        title: 'Go',
        colorGroup: 'corner',
        cost: 0,
        rent: 0,
        mortgageValue: 0,
        houseCost: 0,
        hotelCost: 0,
        isOwned: false,
        isMortgaged: false
      },
      {
        id: 1,
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
        id: 2,
        title: 'Community Chest',
        colorGroup: 'community chest',
        cost: 0,
        rent: 0,
        mortgageValue: 0,
        houseCost: 0,
        hotelCost: 0,
        isOwned: false,
        isMortgaged: false
      },
      {
        id: 3,
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
        id: 4,
        title: 'Income Tax',
        colorGroup: 'tax',
        cost: 0,
        rent: 0,
        mortgageValue: 0,
        houseCost: 0,
        hotelCost: 0,
        isOwned: false,
        isMortgaged: false
      },
      {
        id: 5,
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
        id: 6,
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
        id: 7,
        title: 'Chance',
        colorGroup: 'chance',
        cost: 0,
        rent: 0,
        mortgageValue: 0,
        houseCost: 0,
        hotelCost: 0,
        isOwned: false,
        isMortgaged: false
      },
      {
        id: 8,
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
        id: 9,
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
        id: 10,
        title: 'Jail/Just Visiting',
        colorGroup: 'corner',
        cost: 0,
        rent: 0,
        mortgageValue: 0,
        houseCost: 0,
        hotelCost: 0,
        isOwned: false,
        isMortgaged: false
      },
      {
        id: 11,
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
        id: 12,
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
        id: 13,
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
        id: 14,
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
        id: 15,
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
        id: 16,
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
        id: 17,
        title: 'Community Chest',
        colorGroup: 'community chest',
        cost: 0,
        rent: 0,
        mortgageValue: 0,
        houseCost: 0,
        hotelCost: 0,
        isOwned: false,
        isMortgaged: false
      },
      {
        id: 18,
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
        id: 19,
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
        id: 20,
        title: 'Free Parking',
        colorGroup: 'corner',
        cost: 0,
        rent: 0,
        mortgageValue: 0,
        houseCost: 0,
        hotelCost: 0,
        isOwned: false,
        isMortgaged: false
      },
      {
        id: 21,
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
        id: 22,
        title: 'Chance',
        colorGroup: 'chance',
        cost: 0,
        rent: 0,
        mortgageValue: 0,
        houseCost: 0,
        hotelCost: 0,
        isOwned: false,
        isMortgaged: false
      },
      {
        id: 23,
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
        id: 24,
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
        id: 25,
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
        id: 26,
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
        id: 27,
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
        id: 28,
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
        id: 29,
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
        id: 30,
        title: 'Go To Jail',
        colorGroup: 'corner',
        cost: 0,
        rent: 0,
        mortgageValue: 0,
        houseCost: 0,
        hotelCost: 0,
        isOwned: false,
        isMortgaged: false
      },
      {
        id: 31,
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
        id: 32,
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
        id: 33,
        title: 'Community Chest',
        colorGroup: 'community chest',
        cost: 0,
        rent: 0,
        mortgageValue: 0,
        houseCost: 0,
        hotelCost: 0,
        isOwned: false,
        isMortgaged: false
      },
      {
        id: 34,
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
        id: 35,
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
        id: 36,
        title: 'Chance',
        colorGroup: 'chance',
        cost: 0,
        rent: 0,
        mortgageValue: 0,
        houseCost: 0,
        hotelCost: 0,
        isOwned: false,
        isMortgaged: false
      },
      {
        id: 37,
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
        id: 38,
        title: 'Luxury Tax',
        colorGroup: 'tax',
        cost: 0,
        rent: 0,
        mortgageValue: 0,
        houseCost: 0,
        hotelCost: 0,
        isOwned: false,
        isMortgaged: false
      },
      {
        id: 39,
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

    const newChance = [
      {
        cardText: 'Advance to Go. Collect $200.',
        cardType: 'advance',
        amountInvolved: 200,
        propertyLoc: 'Go',
        canBeSaved: false
      },
      {
        cardText: 'Advance to Illinois Ave. If you pass Go, collect $200.',
        cardType: 'advance',
        amountInvolved: 0,
        propertyLoc: 'Illinois Ave',
        canBeSaved: false
      },
      {
        cardText: 'Advance to St. Charles Place. If you pass Go, collect $200.',
        cardType: 'advance',
        amountInvolved: 200,
        propertyLoc: 'St. Charles Place',
        canBeSaved: false
      },
      {
        cardText: 'Advance token to the nearest Railroad and pay owner twice the rental to which they are otherwise entitled. If Railroad is unowned, you may buy it from the Bank.',
        cardType: 'advance',
        amountInvolved: 0,
        propertyLoc: 'railroad',
        canBeSaved: false
      },
      {
        cardText: 'Advance token to the nearest Railroad and pay owner twice the rental to which they are otherwise entitled. If Railroad is unowned, you may buy it from the Bank.',
        cardType: 'advance',
        amountInvolved: 0,
        propertyLoc: 'railroad',
        canBeSaved: false
      },
      {
        cardText: 'Bank pays you dividend of $50',
        cardType: 'earn',
        amountInvolved: 200,
        propertyLoc: '',
        canBeSaved: false
      },
      {
        cardText: 'Get out of Jail Free. This card may be kept until needed, or traded/sold.',
        cardType: 'jail',
        amountInvolved: 0,
        propertyLoc: 'Jail/Just Visiting',
        canBeSaved: true
      },
      {
        cardText: 'Go Back Three Spaces',
        cardType: 'back',
        amountInvolved: 0,
        propertyLoc: '',
        canBeSaved: false
      },
      {
        cardText: 'Go to Jail. Go directly to Jail. Do not pass Go, do not collect $200.',
        cardType: 'advance',
        amountInvolved: 0,
        propertyLoc: 'Jail/Just Visiting',
        canBeSaved: false
      },
      {
        cardText: 'Make general repairs on all your property: For each house pay $25, For each hotel $100.',
        cardType: 'pay',
        amountInvolved: 0,
        propertyLoc: '',
        canBeSaved: false
      },
      {
        cardText: 'Pay poor tax of $15.',
        cardType: 'pay',
        amountInvolved: 15,
        propertyLoc: '',
        canBeSaved: false
      },
      {
        cardText: 'Take a trip to Reading Railroad. If you pass Go, collect $200.',
        cardType: 'advance',
        amountInvolved: 0,
        propertyLoc: 'Reading Railroad',
        canBeSaved: false
      },
      {
        cardText: 'Take a walk on the Boardwalk. Advance token to Boardwalk.',
        cardType: 'advance',
        amountInvolved: 0,
        propertyLoc: 'Boardwalk',
        canBeSaved: false
      },
      {
        cardText: 'You have been elected Chairman of the Board. Pay each player $50.',
        cardType: 'pay',
        amountInvolved: 50,
        propertyLoc: '',
        canBeSaved: false
      },
      {
        cardText: 'Your building loan matures. Receive $150.',
        cardType: 'earn',
        amountInvolved: 150,
        propertyLoc: '',
        canBeSaved: false
      },
      {
        cardText: 'Advance token to nearest Utility. If unowned, you may buy it from the Bank. If owned, throw dice and pay owner a total ten times the amount thrown.',
        cardType: 'advance',
        amountInvolved: 0,
        propertyLoc: 'utilities',
        canBeSaved: false
      }
    ];

    const newCommChest = [
      {
        cardText: 'Advance to Go. Collect $200.',
        cardType: 'advance',
        amountInvolved: 200,
        propertyLoc: 'Go',
        canBeSaved: false
      },
      {
        cardText: 'Bank error in your favor. Collect $200.',
        cardType: 'earn',
        amountInvolved: 200,
        propertyLoc: '',
        canBeSaved: false
      },
      {
        cardText: 'Doctors fees. Pay $50.',
        cardType: 'pay',
        amountInvolved: 50,
        propertyLoc: '',
        canBeSaved: false
      },
      {
        cardText: 'From sale of stock you get $50.',
        cardType: 'earn',
        amountInvolved: 50,
        propertyLoc: '',
        canBeSaved: false
      },
      {
        cardText: 'Get Out of Jail Free. This card may be kept until needed or sold/traded.',
        cardType: 'jail',
        amountInvolved: 0,
        propertyLoc: 'Jail/Just Visiting',
        canBeSaved: true
      },
      {
        cardText: 'Go to Jail. Go directly to jail. Do not pass Go, Do not collect $200.',
        cardType: 'advance',
        amountInvolved: 0,
        propertyLoc: 'Jail/Just Visiting',
        canBeSaved: false
      },
      {
        cardText: 'Grand Opera Night. Collect $50 from every player for opening night seats.',
        cardType: 'earn',
        amountInvolved: 50,
        propertyLoc: '',
        canBeSaved: false
      },
      {
        cardText: 'Holiday Fund matures. Receive $100.',
        cardType: 'earn',
        amountInvolved: 100,
        propertyLoc: '',
        canBeSaved: false
      },
      {
        cardText: 'Income tax refund. Collect $20.',
        cardType: 'earn',
        amountInvolved: 20,
        propertyLoc: '',
        canBeSaved: false
      },
      {
        cardText: 'Life insurance matures. Collect $100.',
        cardType: 'earn',
        amountInvolved: 100,
        propertyLoc: '',
        canBeSaved: false
      },
      {
        cardText: 'Hospital fees. Pay $50.',
        cardType: 'pay',
        amountInvolved: 50,
        propertyLoc: '',
        canBeSaved: false
      },
      {
        cardText: 'School fees. Pay $50.',
        cardType: 'pay',
        amountInvolved: 50,
        propertyLoc: '',
        canBeSaved: false
      },
      {
        cardText: 'Receive $25 consultancy fee.',
        cardType: 'earn',
        amountInvolved: 25,
        propertyLoc: '',
        canBeSaved: false
      },
      {
        cardText: 'You are assessed for street repairs: Pay $40 per house and $115 per hotel you own.',
        cardType: 'pay',
        amountInvolved: 0,
        propertyLoc: '',
        canBeSaved: false
      },
      {
        cardText: 'You have won second prize in a beauty contest. Collect $10.',
        cardType: 'earn',
        amountInvolved: 10,
        propertyLoc: '',
        canBeSaved: false
      },
      {
        cardText: 'You inherit $100.',
        cardType: 'earn',
        amountInvolved: 100,
        propertyLoc: '',
        canBeSaved: false
      },
    ];
    
    //initialize players to start at Go, shuffle chance/community chest decks
    this.initializePlayerLocation(this.state.playerList, newPropertyList);
    this.shuffleDeck(newChance);
    this.shuffleDeck(newCommChest);

    this.setState({
      propertyList: newPropertyList,
      isGameReady: true,
      chanceCards: newChance,
      communityCards: newCommChest
    });

  };

  //update player when user enters a name in the select field
  handleNameChange(e) {
    let player = Object.assign({}, this.state.player);
    player.name = e.target.value;
    player.bank = '';
    player.properties = [];
    player.cards = [];
    this.setState({player});
  };

  //submit form function (when submit is clicked)
  handleFormSubmit() {
    //Name is a required field
    if (this.state.player.name === '') {
      window.alert("Name is required.");
      return false;
    }

    //update playerList as users are added
    const newPlayerList = this.state.playerList;

    let player = Object.assign({}, this.state.player);
    player.name = this.state.player.name;
    player.bank = 1500;
    player.properties = [];
    player.cards = [];

    newPlayerList.push(player);

    this.setState({
      playerDialogOpen: false,
      playerList: newPlayerList
    });
  };

  //open up the properties dialog
  handleClickProperties = () => {
    this.setState(
      {
        propDialogOpen: true
      }
    );
  };

  //roll function - still needs kinks worked out (eventually to move player(s))
  handleClickRoll = () => {

    const firstRoll = Math.floor((Math.random() * ((6-1)+1) + 1));
    const secondRoll = Math.floor((Math.random() * ((6-1)+1) + 1));

    const rollTotal = firstRoll + secondRoll;

    var doubles = this.state.doublesCounter;

    if (firstRoll === secondRoll) {
      doubles = doubles + 1;
    }

    //const newPlayerList = this.state.playerList;

    //const moveToIndex = this.getNewLocation(rollTotal, this.state.playerList[0].currentLocation, this.state.propertyList);

    //newPlayerList[0].currentLocation = this.state.propertyList[moveToIndex].title;

    console.log("Roll 1: " + firstRoll);
    console.log("Roll 2: " + secondRoll);
    console.log("Roll Total: " + rollTotal);
    //console.log("New Location: " + newPlayerList[0].currentLocation);

    this.setState({
      die1: firstRoll,
      die2: secondRoll,
      rollTotal: rollTotal,
      doublesCounter: doubles,
      //playerList: newPlayerList
    });

    this.endRoll();
  };

  /*getNewLocation(roll, currentLoc, boardArr) {
    const prevLoc = currentLoc;
    const locIndex = boardArr.indexOf(prevLoc) + 1;
    const newLocIndex = locIndex + roll;

    return newLocIndex;
  };*/

  endRoll() {
    this.setState({
      die1: '',
      die2: '',
      rollTotal: '',
    });
  }

  render() {
    return (
      <div className="App">
        <header>
          <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
          <img src={image} alt="Monopoly Board" />
          <h1 className="App-title">Monopoly-JS</h1>
        </header>
        <div>
          { (this.state.playerList.length <= 0) ? 
            <Button variant="outlined" onClick={this.handleClickOpen}>Add Player</Button> :
            <div style={{ paddingLeft: '25%', paddingRight: '25%' }}>
              <ExpansionPanel>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="headline">Players</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <ListPlayers PlayerList={this.state.playerList} BoardArr={this.state.propertyList} />
                </ExpansionPanelDetails>
                <Button variant="outlined" onClick={this.handleClickOpen} style={{ marginBottom: '5%' }}>Add Player</Button>
              </ExpansionPanel>
              <br /><br />
              <Button variant="outlined" onClick={this.handleGameInit}>Go</Button>
            </div>
          }
          <Dialog open={this.state.playerDialogOpen} onClose={this.handleClose}>
            <div style={{padding: '50px'}}>
              <Card>
              <Typography variant="headline" header="h2">Add Player</Typography>
              <SubmitForm
                handleFormSubmit={this.handleFormSubmit}
                handleNameChange={this.handleNameChange}
                labelName="Name"
                tokenList={this.state.tokenList}
              />
              </Card>
            </div>
          </Dialog>
        </div>
        <br />
        <br />
        <div>
          { (!(this.state.player.name === '') && (this.state.isGameReady)) ?
            <div>
            <Button variant="outlined" onClick={this.handleClickProperties}>View Properties</Button>
            <Dialog open={this.state.propDialogOpen} onClose={this.handleClose}>
              <ListProperties PropertyList={this.state.propertyList}/> :
            </Dialog>
            <br /><br />
            <div>
              <Button variant="outlined" onClick={this.handleClickRoll}>Roll!</Button>
            </div>
            </div>
            :
            <div />
          }
        </div>
        {console.log("Die1: " + this.state.die1)}
        {console.log("Die2: " + this.state.die2)}
        {console.log("Total: " + this.state.rollTotal)}
        {console.log("Doubles Count: " + this.state.doublesCounter)}
        </div>
    );
  }
}

export default App;
