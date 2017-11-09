// Libraries
import React, { Component } from 'react';
import Liquid from 'liquid-node';
import 'bulma/css/bulma.css';

// Assets
import './App.css';

// Components
import Input from './Input/Input';
import Renderer from './Renderer/Renderer';
import Header from './Header/Header';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      variables: {
        editedObjectName: "",
        chosenObjectName: ""
      },
      liquidInput: ""
    }

    this.localStorageHandler = this.localStorageHandler.bind(this);
    this.inputChangedHandler = this.inputChangedHandler.bind(this);
    this.handleLiquidInput = this.handleLiquidInput.bind(this);
  }

  handleLiquidInput = (event) => {
    this.setState({
      liquidInput: event.target.value
    })
  }

  liquidHandler = () => {
    const engine = new Liquid.Engine();
    let chosenObject = this.state.variables.chosenObjectName;

    engine
    // .parse("Hello {{subscriber.name}}")
    .parse(this.state.liquidInput)
    .then((template) => { return template.render({ [chosenObject]: { name: "Robyn"}})})
    .then((result) => { console.log(result)});
  }

  inputChangedHandler = (event) => {
    this.setState({ variables: { editedObjectName: event.target.value } });
  }

  localStorageHandler = (event) => {
    event.preventDefault();
    this.setState({
      variables: {
        chosenObjectName: this.state.variables.editedObjectName
      }
    });
    // To do store variable in local storage
  }

  render() {
    return (
      <div className="App container">
        <Header />
        <Input
          storeVariable={this.localStorageHandler}
          inputChange={this.inputChangedHandler}
          chosenObject={this.state.variables.chosenObjectName}
          handleLiquidInput={this.handleLiquidInput}
        />
        <Renderer />
        <button onClick={this.liquidHandler}>Do Liquid</button>
        <p>Base: {this.state.variables.editedVariable}</p>
        <p>Chosen Object Name: {this.state.variables.chosenObjectName}</p>
      </div>
    );
  }
}

export default App;
