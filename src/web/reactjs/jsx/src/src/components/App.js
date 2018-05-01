import React, { Component } from 'react';
import Board from "./Board";
import Game from "../Game";
import MessageDisplay from "./MessageDisplay";

import './App.css';

class App extends Component {
  constructor() {
    super()
    this.game = new Game();
  }

  componentDidMount() {
    this.game.start();
  }

  restart = () => {
    this.game.start();
  }

  render() {
    return (
      <div class="container">
        <Board game={this.game} />
        <MessageDisplay game={this.game}/>
        <input class="restart" onClick={this.restart} type="button" value="Restart" title="Press 'R' to Restart"/>
      </div>
    );
  }
}

export default App;
