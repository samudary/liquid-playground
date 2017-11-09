// Libraries
import React, { Component } from 'react';
import Liquid from 'liquid-node';

// Assets
import logo from './logo.svg';
import './App.css';

// Components
import Input from './Input/Input';
import Renderer from './Renderer/Renderer';
import Header from './Header/Header';

class App extends Component {
  outputLiquid = () => {
    let engine = new Liquid.Engine();
    engine
    .parse("Hello {{name}}")
    .then((template) => { return template.render({ name: "Robyn"})})
    .then((result) => { console.log(result)});
  }

  render() {
    return (
      <div className="App">
        <Header />
        <Input />
        <Renderer />
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <button onClick={this.outputLiquid}>Do Liquid</button>
      </div>
    );
  }
}

export default App;
