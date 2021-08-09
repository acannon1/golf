import React from 'react';
import Tournament from './Tournament.js';
import './Golf.css';

const Tournaments = ({tournaments=[]}) => {
     return (
        <div className="tournaments-page">
        <h3> Tournaments </h3>
        <table>
            <tbody>
            {
                tournaments.map((tournament, idx) => {
                    return (
                        <Tournament key={idx} tournament={tournament}/>
                    )
                })
            }
            </tbody>
        </table>
        </div>
    );
}

export default Tournaments;