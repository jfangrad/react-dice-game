import React, { PureComponent } from 'react';
import ScoreBoard from './ScoreBoard';
import Controls from './Controls';
import Modal from './Modal';

class Game extends PureComponent {

  constructor(props) {
    super(props);

    this.state = this.getInitialState(props);
  }

  getInitialState = (props) => {
    const { players } = props;
    const points = {};
    players.forEach((player) => {
      points[player] = 0;
    });

    return {
      points,
      currentPlayer: 0,
      lastRound: null,
      gameOver: false,
      winner: null,
    };
  }

  updateScore = (player, value) => {
    const { players } = this.props;
    const { points, lastRound, currentPlayer } = this.state;

    if (points[player] + value >= 10000 && !lastRound) {
      this.setState({ lastRound: player });
    }

    console.log(lastRound, players[(currentPlayer + 1) % players.length]);
    if (lastRound === players[(currentPlayer + 1) % players.length]) {
      const winner = Object.entries(points).sort((a, b) => a[1] < b[1])[0][0];
      this.setState({ gameOver: true, winner });
    }

    this.setState(p => ({
      points: {
        ...p.points,
        [player]: p.points[player] + value,
      },
      currentPlayer: (p.currentPlayer + 1) % players.length,
    }));
  }

  playAgain = () => {
    const newState = this.getInitialState(this.props);

    this.setState(newState);
  }

  render() {
    const { gameOver, winner } = this.state;
    const { menu } = this.props;

    return (
      <div className="game">
        <ScoreBoard {...this.props} {...this.state} />
        <Controls {...this.props} {...this.state} updateScore={this.updateScore} />
        <Modal isShowing={gameOver} playAgain={this.playAgain} menu={menu}>
          <div className='game-over'>{`${winner} Wins!`}</div>
        </Modal>
      </div>
    );
  }
}

export default Game;
