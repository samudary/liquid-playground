// Libraries
import React, { Component } from 'react';
import Liquid from 'liquid-node';
import 'bulma/css/bulma.css';

// Assets
import './App.css';

// Components
import PageHeader from './PageHeader/PageHeader';
import InputHeader from './InputHeader/InputHeader';
import Input from './Input/Input';
import Renderer from './Renderer/Renderer';
import Footer from './Footer/Footer';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      variables: {
        editedObjectName: "",
        chosenObjectName: "subscriber"
      },
      liquidInput: "",
      parsedLiquid: ""
    }

    this.localStorageHandler = this.localStorageHandler.bind(this);
    this.inputChangedHandler = this.inputChangedHandler.bind(this);
    this.handleLiquidInput = this.handleLiquidInput.bind(this);
  }

  handleLiquidInput = (event) => {
    this.setState({ liquidInput: event.target.value });

    const engine = new Liquid.Engine();
    let chosenObject = this.state.variables.chosenObjectName;

    engine
    .parse(this.state.liquidInput)
    .then((template) => { return template.render({ [chosenObject]: { name: "Robyn"}})})
    .then((result) => {
      this.setState({ parsedLiquid: result });
    });
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
    // TODO: store variable in local storage
  }

  render() {
    return (
      <div className="App container">
        <PageHeader />

        <InputHeader
          storeVariable={this.localStorageHandler}
          inputChange={this.inputChangedHandler}
          defaultObject={this.state.variables.chosenObjectName}
        />

        <div className="columns">
          <div className="column column-adjusted">
            <Input
              handleLiquidInput={this.handleLiquidInput}
            />
          </div>

          <div className="column column-adjusted">
            <Renderer
              parsedLiquid={this.state.parsedLiquid}
            />
          </div>
        </div>

        <Footer />
      </div>
    );
  }
}

export default App;
