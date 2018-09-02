import React, { Component } from 'react';
import PropTypes from 'prop-types';

class InputNames extends Component {
  state = {
    currentInput: '',
  }

  onInputChange = ({ nativeEvent }) => {
    const currentInput = nativeEvent.target.value.trim();
    this.setState({ currentInput });
  }

  onKeyDown = ({ nativeEvent }) => {
    if (nativeEvent.keyCode === 13) {
      this.onAddPlayer();
    }
  }

  onAddPlayer = () => {
    const { addPlayer, players } = this.props;
    const { currentInput } = this.state;

    if (currentInput.trim().length > 0 && !players.includes(currentInput.trim())) {
      addPlayer(currentInput);
      this.input.focus();
      this.setState({ currentInput: '' });
    }
  }

  renderPlayerList = () => {
    const { players } = this.props;
    const className = players.length !== 0 ? 'player-list' : 'player-list hidden';
    return (
      <ul className={className}>
        {
          players.map((player, index) => (
            <li className="player-item" key={player}>
              {`${index + 1}. ${player}`}
            </li>
          ))
      }
      </ul>
    );
  }

  render() {
    const { currentInput } = this.state;
    const { onFinish, players } = this.props;

    const disableFinish = players.length < 2;
    const disableAdd = currentInput.trim().length < 1 || players.includes(currentInput.trim());

    return (
      <div className="input-names">
        {this.renderPlayerList()}
        <div className="add-player-container">
          <input className="player-input" ref={input => this.input = input} type="text" value={currentInput} placeholder="Player Name..." onChange={this.onInputChange} onKeyDown={this.onKeyDown} />
          <div className="btn-container">
            <button className="add-btn" type="button" disabled={disableAdd} onClick={this.onAddPlayer}>Add</button>
            <button className="finish-btn" type="button" disabled={disableFinish} onClick={onFinish}>Finish</button>
          </div>
        </div>
      </div>
    );
  }
}

InputNames.propTypes = {
  players: PropTypes.array.isRequired,
  onFinish: PropTypes.func.isRequired,
  addPlayer: PropTypes.func.isRequired,
}

export default InputNames;
