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

  setTurn = (value) => {
    this.setState({ currentPlayer: value });
  }

  playAgain = () => {
    const newState = this.getInitialState(this.props);

    this.setState(newState);
  }

  updateScore = (player, value, updateTurn = true) => {
    const { players } = this.props;
    const { points, lastRound, currentPlayer } = this.state;

    if (points[player] + value >= 10000 && !lastRound) {
      this.setState({ lastRound: player });
    }

    if (lastRound === players[(currentPlayer + 1) % players.length]) {
      const winner = Object.entries(points).sort((a, b) => a[1] < b[1])[0][0];
      this.setState({ gameOver: true, winner });
    }

    if (updateTurn) {
      this.setState(p => ({
        points: {
          ...p.points,
          [player]: p.points[player] + value,
        },
        currentPlayer: (p.currentPlayer + 1) % players.length,
      }));
    } else {
      this.setState(p => ({
        points: {
          ...p.points,
          [player]: p.points[player] + value,
        },
      }));
    }
  }

  render() {
    const { gameOver, winner, lastRound } = this.state;
    const { menu } = this.props;
    const lastRoundClass = lastRound ? 'last-round' : 'last-round display-none';

    return (
      <div className="game-container">
        <div className={lastRoundClass}>Last Round!</div>
        <div className="game">
          <ScoreBoard {...this.props} {...this.state} />
          <Controls {...this.props} {...this.state} updateScore={this.updateScore} setTurn={this.setTurn} />
          {gameOver &&
          <Modal playAgain={this.playAgain} menu={menu}>
            <div className='game-over'>{`${winner} Wins!`}</div>
          </Modal>
          }
        </div>
      </div>
    );
  }
}

export default Game;
