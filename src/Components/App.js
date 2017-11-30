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
import TagModal from './TagModal';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      variables: {
        editedObjectName: "",
        chosenObjectName: "subscriber"
      },
      customVariables: [],
      variablesEdited: {
      },
      editedIdentifier: "",
      editedValue: "",
      liquidInput: "",
      parsedLiquid: "",
      errors: [],
      modalShown: false,
      lastEditorCursorLocation: null
    }

    this.inputChangedHandler = this.inputChangedHandler.bind(this);
    this.handleLiquidInput = this.handleLiquidInput.bind(this);
    this.localStorageHandler = this.localStorageHandler.bind(this);
    this.liquidParser = this.liquidParser.bind(this);
    this.showModal = this.showModal.bind(this);
    this.handleFilterInsertion = this.handleFilterInsertion.bind(this);
    this.testVar = this.testVar.bind(this);
    this.tagIdentifierHandler = this.tagIdentifierHandler.bind(this);
    this.tagValueHandler = this.tagValueHandler.bind(this);
    this.engine = new Liquid.Engine();
  }

  handleLiquidInput = (html, text) => {
    // this.setState({ liquidInput: event.target.value });
    this.setState({ liquidInput: text });
  }

  handleFilterInsertion = (event) => {
    // TODO: Append selected filter to editor body at last cursor location
    console.log(event.target.getAttribute("data-insertion-name"));
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

  tagIdentifierHandler = (event) => {
    event.preventDefault();
    this.setState({ editedIdentifier: event.target.value });
  }

  tagValueHandler = (event) => {
    event.preventDefault();
    this.setState({ editedValue: event.target.value });
  }

  testVar = (event) => {
    let identifier = this.state.editedIdentifier;
    let value = this.state.editedValue;
    event.preventDefault();
    document.getElementById("identifier").value = "";
    document.getElementById("value").value = "";
  }

  localStorageHandler = (event) => {
    event.preventDefault();
    document.getElementById("variable").value = "";
    this.setState({
      variables: {
        chosenObjectName: this.state.variables.editedObjectName
      }
    });
    // TODO: store variable in local storage
  }

  showModal = (event) => {
    let modalState = this.state.modalShown;
    this.setState({ modalShown: !modalState });
  }

  render() {
    return (
      <div className="App container">
        <PageHeader />

        ID: {this.state.editedIdentifier}
        Value: {this.state.editedValue}

        <InputHeader
          storeVariable={this.localStorageHandler}
          inputChange={this.inputChangedHandler}
          defaultObject={this.state.variables.editedObjectName}
          customVariables={this.state.customVariables}
          testVar={this.testVar}
          tagIdentifierHandler={this.tagIdentifierHandler}
          tagValueHandler={this.tagValueHandler}
        />

        <div className="columns">
          <div className="column column-adjusted">
            <Input
              handleLiquidInput={this.handleLiquidInput}
            />

            <a
              className="button is-pulled-left modal__trigger"
              onClick={this.showModal}
            >Liquid Reference</a>
          </div>

          <div className="column column-adjusted">
            <Renderer
              parsedLiquid={this.state.parsedLiquid}
            />
          </div>
        </div>

        <p className="has-text-left">Errors: {this.state.errors}</p>

        <Footer />
        <TagModal
          modalShown={this.state.modalShown}
          showModal={this.showModal}
          handleFilterInsertion={this.handleFilterInsertion}
        />
      </div>
    );
  }
}
