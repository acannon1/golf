import React from 'react';
import './Golf.css';

const IndivScoreCard = ({db=null, players}) => {
    const scores = new Array(19).fill(0);

    const makeRow = (score2) => {
        let temp=[];
        scores.map((score, idx) => {
            temp.push(
                <td key={idx}>
                    {
                        score2[idx] !== undefined ? 
                            score2[idx] :
                            0                        
                    }
                </td>
            )
        })
        return (temp)
    }

    return(
        <table>
            <thead>
                <tr>
                    <th>Player</th>
                    {
                    scores.map((score, idx) => {
                        if(idx<18) {
                            return(
                                <th key={idx}>{idx+1}</th>
                            )
                        }
                    })
                    }
                    <td>Total</td>
                </tr>
            </thead>
            <tbody>
            {
                Object.keys(players).map((player, idx) => {
                    return(
                        <tr key={idx}>
                            <td>{player}</td>
                            { makeRow(players[player]) } 
                        </tr>
                    )
                })
            }
            </tbody>
        </table>
    )
}

export default IndivScoreCard;