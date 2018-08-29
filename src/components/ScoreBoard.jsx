import React from 'react';

const ScoreBoard = ({ points, players, currentPlayer }) => {
  // const { points, players, currentPlayer } = props;

  const renderPlayers = () => {
    const pointsArray = Object.entries(points);
    pointsArray.sort((a, b) => a[1] < b[1]);
    return pointsArray.map(([key, value], index) => {
      const className = players[currentPlayer] === key ? 'scoreboard-item selected' : 'scoreboard-item';
      return (
        <li className={className} key={key}>
          {`${index + 1}. ${key}: ${value}`}
        </li>
      );
    });
  };

  return (
    <ul className="scoreboard">
      {renderPlayers()}
    </ul>
  );
};

export default ScoreBoard;
