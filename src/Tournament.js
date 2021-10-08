import React, {useState, useEffect} from 'react';
import { Link } from "react-router-dom";
import golfDbApi from './api/GolfDbApi.js';
import './Golf.css';

const Tournament = ({db=null, tournament, isAdmin=false}) => {

    const [path, setPath] = useState("");
    const [title, setTitle] = useState("");

    useEffect(() => {
        if(tournament.status === "Sign Up") {
            setPath("/sign-up");
            setTitle("Sign Up");
        } else if(tournament.status === "Ready to Start") {
            setPath("/results");
            setTitle("Ready to Start");
        } else if(tournament.status === "In Progress") {
            setPath("/results");
            setTitle("In Progress");
        } else{
            setPath("./results");
            setTitle("Results");
        }
    }, [])

    const handleStart = () => {
        console.log("start")
        golfDbApi.startTournament(db, tournament)
    }

    return (
        <tr>
            <td className="tournament-data"> {tournament.date} </td>
            <td className="tournament-data"> {tournament.course} </td>
            <td className="tournament-data">
                <Link 
                    to={{
                        pathname: path,
                        state: {
                            date: tournament.date,
                            course: tournament.course,
                        },
                    }}
                >
                    {title} 
                </Link>
            </td>
            {isAdmin ?
                tournament.status === 'Sign Up' ?
                    <td className="tournament-data"> 
                        <button onClick={handleStart}> Start </button>
                    </td>
                    :
                    <td className="tournament-data"/>
                :
                null
            }
        </tr>
    );
}

export default Tournament;
