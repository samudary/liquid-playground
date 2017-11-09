// Libraries
import React, { Component } from 'react';
import Liquid from 'liquid-node';
import 'bulma/css/bulma.css';

// Assets
import logo from './logo.svg';
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
        base: "",
        editedVariable: ""
      }
    }

    this.localStorageHandler = this.localStorageHandler.bind(this);
    this.inputChangedHandler = this.inputChangedHandler.bind(this);
  }

  outputLiquid = () => {
    let engine = new Liquid.Engine();
    engine
    .parse("Hello {{name}}")
    .then((template) => { return template.render({ name: "Robyn"})})
    .then((result) => { console.log(result)});
  }

  inputChangedHandler = (event) => {
    this.setState({ variables: { editedVariable: event.target.value } });
  }

  localStorageHandler = (event) => {
    event.preventDefault();
    // To do store variable in local storage
  }

  render() {
    return (
      <div className="App container">
        <Header />
        <Input storeVariable={this.localStorageHandler} inputChange={this.inputChangedHandler}/>
        <Renderer />

        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <button onClick={this.outputLiquid}>Do Liquid</button>
        <p>Base: {this.state.variables.editedVariable}</p>
      </div>
    );
  }
}

export default App;
