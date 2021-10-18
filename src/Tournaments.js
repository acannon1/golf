import React, {useState, useEffect} from 'react';
import Tournament from './Tournament.js';
import golfDbApi from './api/GolfDbApi.js';
import './Golf.css';

const Tournaments = ({db, isAdmin=false}) => {

    const [tournaments, setTournaments] = useState([])
    
    useEffect(() => {
        golfDbApi.getTournaments(db)
            .then((data) => setTournaments(data));
    }, [])

    return (
        <div className="tournaments-page">
            <h3> Tournaments </h3>
            <table>
                <tbody>
                {
                    tournaments.map((tournament, idx) => {
                        return (
                            <Tournament
                                key={idx}
                                tournament={tournament}
                                isAdmin={isAdmin}
                                db={db}
                            />
                        )
                    })
                }
                </tbody>
            </table>
        </div>
    );
}

export default Tournaments;