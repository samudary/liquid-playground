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
import PasteModal from './PasteModal/PasteModal';

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
      errors: [],
      showModal: false
    }

    this.inputChangedHandler = this.inputChangedHandler.bind(this);
    this.handleLiquidInput = this.handleLiquidInput.bind(this);
    this.localStorageHandler = this.localStorageHandler.bind(this);
    this.modalHandler = this.modalHandler.bind(this);
  }

  handleLiquidInput = (event) => {
    this.setState({ liquidInput: event.target.value });

    const engine = new Liquid.Engine();
    let chosenObject = this.state.variables.chosenObjectName;

    engine
      .parse(this.state.liquidInput)
      .then((template) => { return template.render({ [chosenObject]: { name: "Robyn"}})})
      .catch((ex) => { this.setState({ errors: [ex.name] }) })
      // TODO: Better error handling
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

  modalHandler = () => {
    const modalShown = this.state.showModal;
    this.setState({showModal: !modalShown});
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
              modalHandler={this.modalHandler}
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
        <PasteModal showModal={this.state.showModal}/>
      </div>
    );
  }
}

export default App;
