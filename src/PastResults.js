import React, {useState, useEffect} from 'react';
import { useLocation } from "react-router-dom";
import golfDbApi from './api/GolfDbApi.js';
import './Leaderboard.css';

const PastResults = ({db=null}) => {
    const [results, setResults] = useState({});
    const location = useLocation();

    useEffect(() => {
      golfDbApi.getPastResults(db, location.state.date, location.state.course)
        .then((data) => {
          setResults(data)
        })
    }, {})

    var total = 0;
    return (
    <div id="leader-board">
        { Object.keys(results).length === 0 ? 
        null
        :
        <div>
            <h2> {results.course} </h2>
            <h4> {results.date} </h4>
            <table>
                <thead>
                    <tr>
                    <th></th>
                    {
                        results.par.map((score, idx) => {
                            return ( <th key={idx}>{idx+1}</th> )
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
                                total += score;
                                return ( <td key={idx}>{score}</td> )
                            })
                        }
                        <td>{total}</td>
                        <td></td>
                        <td></td>
                    </tr>
                    {
                        results.scores !== undefined ?
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
                                                            {score < results.par[index] ?
                                                                score !== 0 ? 
                                                                    (results.skins[idx] === player ?
                                                                        "leader-board red skin" :
                                                                        "leader-board red") : 
                                                                    null
                                                                :
                                                                results.skins[idx] === player ?
                                                                    "leader-board skin" : null
                                                            }
                                                        >
                                                        {score !== 0 ? score : null}
                                                        </div>
                                                    </td>
                                                )
                                            })
                                        }
                                        <td>
                                            {
                                                results.skinTotals[player] !== undefined ?
                                                    results.skinTotals[player] : null
                                            }
                                        </td>
                                        <td>
                                            {
                                                results.birdieTotals[player] !== undefined ?
                                                    results.birdieTotals[player] : null
                                            }
                                        </td>
                                    </tr>
                            )})
                            :
                            null
                    }
                </tbody>
            </table>
        </div>
        }
    </div>
    );
}

export default PastResults;
