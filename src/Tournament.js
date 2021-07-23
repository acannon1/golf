import React from 'react';
import { Link } from "react-router-dom";
import './Golf.css';

const Tournament = ({tournament}) => {

    return (
        <tr>
            <td className="tournament-data"> {tournament.date} </td>
            <td className="tournament-data"> {tournament.course} </td>
            <td className="tournament-data">
                    {tournament.played === true ? 
                        <Link 
                            to={{
                                pathname: "/results",
                                state: {
                                    date: tournament.date,
                                    course: tournament.course,
                                },
                            }}
                        >
                            Results 
                        </Link> : 
                        <Link 
                            to={{
                                pathname: "/sign-up",
                            }}
                        >
                            Sign Up 
                        </Link>
                    }
                    {/* Results */}
            </td>
        </tr>
    );
}

export default Tournament;