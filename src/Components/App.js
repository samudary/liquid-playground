// Libraries
import React, { Component } from 'react';
import Liquid from 'liquid-node';
import _ from 'lodash';
import 'bulma/css/bulma.css';

// Assets
import './App.css';

// Components
import PageHeader from './PageHeader';
import InputHeader from './InputHeader';
import Input from './Input';
import Renderer from './Renderer';
import Footer from './Footer';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      variables: {
        editedObjectName: "",
        chosenObjectName: "subscriber"
      },
      liquidInput: "",
      parsedLiquid: "",
      errors: []
    }

    this.inputChangedHandler = this.inputChangedHandler.bind(this);
    this.handleLiquidInput = this.handleLiquidInput.bind(this);
    this.localStorageHandler = this.localStorageHandler.bind(this);
    this.liquidParser = this.liquidParser.bind(this);
    this.engine = new Liquid.Engine();
  }

  handleLiquidInput = (event) => {
    this.setState({ liquidInput: event.target.value });
  }

  liquidParser = () => {
    let chosenObject = this.state.variables.chosenObjectName;

    this.engine
      .parse(this.state.liquidInput)
      .then((template) => { return template.render({ [chosenObject]: { name: "Robyn"}})})
      .catch((ex) => { this.setState({ errors: [ex.name] }) })
      // TODO: Better error handling
      .then((result) => {
        this.setState({ parsedLiquid: result });
      });
  }

  componentDidUpdate(prevProps, prevState) {
    if (!_.isEqual(prevState, this.state)) {
      this.liquidParser();
    }
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

        <p className="has-text-left">Errors: {this.state.errors}</p>

        <Footer />
      </div>
    );
  }
}

export default App;
