import React, {useState, useEffect} from 'react';
import Tournament from './Tournament.js';
import './Golf.css';

const Tournaments = ({db}) => {
    const [tournaments, setTournaments] = useState([]);

    const ref = db.collection("Tournaments");

    const getTournaments = () => {
        ref.onSnapshot((querySnapshot) => {
            const items = [];
            querySnapshot.docs.map((doc) => {
                items.push(doc.data())
            });
            setTournaments(items);
        }, (error) => {
            console.log(error)
        })
    }

    useEffect(() => {
        getTournaments();
    }, [])

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