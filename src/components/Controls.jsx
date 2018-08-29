import React, { Component } from 'react';

class Controls extends Component {
  state = { currentInput: '' };

  onInputChange = ({ nativeEvent }) => {
    const currentInput = nativeEvent.target.value.trim();
    this.setState({ currentInput });
  }

  onKeyDown = ({ nativeEvent }) => {
    const { currentInput } = this.state;
    if (nativeEvent.keyCode === 13 && currentInput.length !== 0) {
      this.onSubmitScore();
    }
  }

  onSubmitScore = () => {
    const { updateScore, players, currentPlayer } = this.props;
    const { currentInput } = this.state;

    updateScore(players[currentPlayer], Number.parseInt(currentInput, 10));
    this.input.focus();
    this.setState({ currentInput: '' });
  }

  render() {
    const { players, currentPlayer } = this.props;
    const { currentInput } = this.state;

    const playerName = players[currentPlayer];
    const disabled = currentInput.length === 0;

    return (
      <div className="controls-container">
        <div className="controls">
          <div className="current-player">{`Player: ${playerName}`}</div>
          <div className="input-container">
            <input className="score-input" ref={input => this.input = input} type="number" value={currentInput} placeholder="Score..." onChange={this.onInputChange} onKeyDown={this.onKeyDown} />
            <button className="submit-score-btn" type="button" disabled={disabled} onClick={this.onSubmitScore}>Submit</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Controls;
