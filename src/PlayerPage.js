import React, {useEffect, useState} from 'react';
import golfDbApi from './api/GolfDbApi.js';
import './PlayersPage.css';

const PlayerPage = ({db}) => {
    const [golfers, setGolfers] = useState([])

    useEffect(() => {
        golfDbApi.getGolfers(db)
            .then((data) => setGolfers(data));
    }, [])

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
                {golfers.map((golfer, idx) => {
                    return (
                        <tr key={idx} className="players-table-row">
                            <td>{idx+1}</td>
                            <td><a href="\"> {golfer.name} </a></td>
                            <td>{golfer.numOfEvents}</td>
                            <td>{golfer.handicap}</td>
                            <td>{golfer.winnings}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    </div>
  );
}

export default PlayerPage;