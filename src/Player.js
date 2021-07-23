import React from 'react';
import './Golf.css';

const Player = ({player}) => {
  return (
    <div className="player">
        <div> {player.name} </div>
        <div> Handicap: {player.handicap} </div>
        <div> Number of Events: {player.numOfEvents} </div>
        <div> Winnings: {player.winnings} </div>
    </div>
  );
}

export default Player;