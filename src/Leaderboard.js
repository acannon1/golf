import React, {useState, useEffect} from 'react';
import golfDbApi from './api/GolfDbApi.js';
import './Leaderboard.css';

const Leaderboard = ({db=null}) => {
    const [results, setResults] = useState({});

    useEffect(() => {
      golfDbApi.getLeaderBoard(db)
            .then((data) => {
                setResults(data);
            })
    }, {})

    return (
        <div id="leader-board">
        {Object.keys(results).length===0 ? 
            null
        :
            <div>
            <h2> {results.course}</h2>
            <h4> {results.date}</h4>
            <table>
                <thead>
                    <tr>
                        <th> Hole </th>
                        {
                            results.par.map((score, idx) => {
                                if (idx < 18) {
                                    return ( <th key={idx}>{idx+1}</th> )
                                }
                            })
                        }
                        <th>Tot</th>
                        <th>Skins</th>
                        <th>Birdies</th>
                    </tr>
                </thead>
                <tbody>
                <tr>
                    <td>Par</td>
                    {
                    results.par.map((score, idx) => {
                        return ( <td key={idx}>{score}</td> )
                    })
                    }
                    <td></td>
                    <td></td>
                </tr>
                {
                    Object.keys(results.scores).map((player, index) => {
                    return (
                        <tr  key={index}>
                            <td> {player} </td>
                            {
                                results.scores[player].map((score, idx) => {
                                    return (
                                        <td key={idx}>
                                            <div 
                                                className=
                                                    {idx < 18 ?                                            
                                                        score < results.par[idx] ?
                                                        (results.skins[idx] === player ?
                                                            "leader-board red skin" :
                                                            "leader-board red")
                                                        :
                                                        results.skins[idx] === player ?
                                                            "leader-board skin" : null
                                                    :
                                                    null
                                                    }
                                            >
                                                {score !== 0 ? score : null}
                                            </div>
                                        </td>
                                    )
                                })
                            }
                            <td> {results.skinTotals[player]} </td>
                            <td> {results.birdieTotals[player]} </td>
                        </tr>
                    )})
                }
                </tbody>
            </table>
            </div>
        }
        </div>
    );
}

export default Leaderboard;
