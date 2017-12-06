// Libraries
import React, { Component } from 'react';
import Liquid from 'liquid-node';
import _ from 'lodash';
import 'bulma/css/bulma.css';

// Data
import liquidReferences from '../data/liquidReferences';
import defaultLiquidObject from '../data/subscriberObject';

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
      customVariables: [],
      liquidInput: "",
      parsedLiquid: "",
      errors: [],
      modalShown: false,
      filterCopied: false,
      activeTab: 'Default Fields',
      customLiquidObject: {},
      customFieldIdentifier: "",
      customFieldValue: ""
    }

    this.handleLiquidInput = this.handleLiquidInput.bind(this);
    this.liquidParser = this.liquidParser.bind(this);
    this.showModal = this.showModal.bind(this);
    this.handleFilterInsertion = this.handleFilterInsertion.bind(this);
    this.handleCustomFieldCreation = this.handleCustomFieldCreation.bind(this);
    this.handleTabSelection = this.handleTabSelection.bind(this);
    this.handleFieldInputChange = this.handleFieldInputChange.bind(this);
    this.engine = new Liquid.Engine();
  }

  storageAvailable = (type) => {
    try {
      let storage = window[type],
        x = '__storage__test';
      storage.setItem(x, x);
      storage.removeItem(x);
      return true;
    }
    catch(e) {
      let storage = window[type];
      return e instanceof DOMException && (
        // everything except Firefox
        e.code === 22 ||
        // Firefox
        e.code === 1014 ||
        // test name field too, because code might not be present
        // everything except Firefox
        e.name === 'QuotaExceededError' ||
        //Firefox
        e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
        // acknowledge QuotaExceededError only if there's something already stored
        storage.length !== 0;
    }
  }

  handleLiquidStorage = (customLiquidObject) => {
    if (this.storageAvailable('localStorage')) {
      localStorage.setItem('customLiquidObject', JSON.stringify(customLiquidObject));
    } else {
      console.log("Storage not available");
    }
  }

  handleFieldInputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState({[name]: value})
  }

  handleCustomFieldCreation = () => {
    const editedFields = {
      [this.state.customFieldIdentifier]: this.state.customFieldValue
    }
    const allCustomFields = _.assign({}, this.state.customLiquidObject, editedFields);

    this.setState({
      customLiquidObject: allCustomFields,
      activeTab: "Your Custom Fields"
    });
  }

  handleLiquidInput = (html, text) => {
    // this.setState({ liquidInput: event.target.value });
    this.setState({ liquidInput: text });
  }

  handleTabSelection = (tab) => {
    this.setState({activeTab: tab.name});
  }

  copyToClipBoard = (data) => {
    // Create a "hidden" input
    let aux = document.createElement("input");
    // Assign it the value of the specified element
    aux.setAttribute("value", data);
    // Append it to the body
    document.body.appendChild(aux);
    // Highlight its content
    aux.select();
    // Copy the highlighted text
    document.execCommand("copy");
    // Remove it from the body
    document.body.removeChild(aux);
  }

  handleFilterInsertion = (event) => {
    let selectedFilter = event.target.getAttribute("data-insertion-name");
    let filterShortcut = liquidReferences.filter(ref => ref.filter === selectedFilter)
    this.copyToClipBoard(filterShortcut[0].shortcut);
    this.setState({filterCopied: true})
  }

  liquidParser = () => {
    let combinedFields = _.assign({}, this.state.customLiquidObject, defaultLiquidObject().subscriber);

    this.engine
      .parse(this.state.liquidInput)
      .then((template) => { return template.render({subscriber: combinedFields}) })
      .catch((ex) => { this.setState({ errors: [ex.name] }) })
      // TODO: Better error handling
      .then((result) => {
        this.setState({ parsedLiquid: result });
      });
  }

  componentDidUpdate(prevProps, prevState) {
    if (!_.isEqual(prevState, this.state)) {
      this.liquidParser();
      this.handleLiquidStorage(this.state.customLiquidObject);
    }
  }

  showModal = (event) => {
    let modalState = this.state.modalShown;
    this.setState({ modalShown: !modalState });
    this.setState({ filterCopied: false })
  }

  render() {
    return (
      <div className="App container">
        <PageHeader />

        <InputHeader
          handleCustomFieldCreation={this.handleCustomFieldCreation}
          handleTabSelection={this.handleTabSelection}
          activeTab={this.state.activeTab}
          handleFieldInputChange={this.handleFieldInputChange}
          customFields={this.state.customLiquidObject}
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
          filterCopied={this.state.filterCopied}
        />
      </div>
    );
  }
}
