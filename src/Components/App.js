// Libraries & Utilities
import React, { Component } from 'react';
import Liquid from 'liquid-node';
import _ from 'lodash';
import 'bulma/css/bulma.css';
import helpers from './helpers';

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
    this.deleteCustomField = this.deleteCustomField.bind(this);
    this.engine = new Liquid.Engine();
  }

  deleteCustomField = (key) => {
    helpers.liquidStorageDeleter(key)
    let customFields = this.state.customLiquidObject;
    delete customFields[key];
    this.setState({ customLiquidObject: customFields });
  }

  showModal = (event) => {
    let modalState = this.state.modalShown;
    this.setState({ modalShown: !modalState });
    this.setState({ filterCopied: false })
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
    this.setState({ liquidInput: text });
  }

  handleTabSelection = (tab) => {
    this.setState({activeTab: tab.name});
  }

  handleFilterInsertion = (event) => {
    let selectedFilter = event.target.getAttribute("data-insertion-name");
    let filterShortcut = liquidReferences.filter(ref => ref.filter === selectedFilter)
    helpers.copyToClipBoard(filterShortcut[0].shortcut);
    this.setState({filterCopied: true})
  }

  liquidParser = () => {
    let localStorageLiquidObject = helpers.isJsonString(helpers.liquidStorageGetter()) ?
      JSON.parse(helpers.liquidStorageGetter()) :
        {};
    
    let combinedFields = _.assign(
      {},
      this.state.customLiquidObject,
      defaultLiquidObject().subscriber,
      localStorageLiquidObject
    );

    this.engine
      .parse(this.state.liquidInput)
      .then((template) => { return template.render({subscriber: combinedFields}) })
      .catch((ex) => { this.setState({ errors: [ex.name] }) })
      // TODO: Better error handling
      .then((result) => {
        this.setState({ parsedLiquid: result });
      });
  }

  componentDidMount() {
    helpers.promiseGetter()
      .then(response => {
        if (response !== null) {
          this.setState({ customLiquidObject: response })
        }
      })
      .catch(response => {
        console.log(response)
      });
  }

  componentDidUpdate(prevProps, prevState) {
    if (!_.isEqual(prevState, this.state)) {
      this.liquidParser();
    }

    if (!_.isEqual(prevState.customLiquidObject, this.state.customLiquidObject)) {
      helpers.liquidStorageSetter(this.state.customLiquidObject);
    }
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
          deleteCustomField={this.deleteCustomField}
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
