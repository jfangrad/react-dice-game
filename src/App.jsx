import React, { Component } from 'react';
import InputNames from './components/InputNames';
import Game from './components/Game';
import './styles/App.scss';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inGame: false,
      players: [],
    };
  }

  onFinishSetup = () => {
    this.setState({ inGame: true });
  }

  onAddPlayer = (player) => {
    this.setState(p => ({ players: [...p.players, player] }));
  }

  menu = () => {
    this.setState({ inGame: false, players: [] });
  }

  render() {
    const { inGame, players } = this.state;
    return (
      <div className="app">
        <h1>Dice Game!</h1>
        {!inGame && <InputNames onFinish={this.onFinishSetup} addPlayer={this.onAddPlayer} players={players} />}
        {inGame && <Game players={players} menu={this.menu} />}
      </div>
    );
  }
}

export default App;
