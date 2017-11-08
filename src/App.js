import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Liquid from 'liquid-node';

class App extends Component {
  render() {
    let engine = new Liquid.Engine();
    engine
    .parse("Hello {{name}}")
    .then((template) => { template.render({ name: "Robyn"})})
    .then((result) => { console.log(result)});

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
