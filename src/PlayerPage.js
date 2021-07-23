import React from 'react';
import './PlayersPage.css';

const PlayerPage = ({players}) => {
  return (
    <div id="players-page" className="players-container">
        <h3> Tour Players </h3>
        {/* <div className="title"> PlayerPage </div> */}
        <table className="players-table">
            <thead className="players-table-header">
                <tr>
                    <th>Rank</th>
                    <th>NAME</th>
                    <th>EVENTS</th>
                    <th>HANDICAP</th>
                    <th>WININGS</th>
                </tr>
            </thead>
            <tbody className="players-table-body">
                {players.map((player, idx) => {
                    return(
                        <tr key={idx} className="players-table-row">
                            <td>{idx+1}</td>
                            <td><a href="\"> {player.name} </a></td>
                            <td>{player.numOfEvents}</td>
                            <td>{player.handicap}</td>
                            <td>{player.winnings}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    </div>
  );
}

export default PlayerPage;