import React from 'react';
import { Link } from "react-router-dom";
import './Golf.css';

const Tournament = ({tournament}) => {

    return (
        <tr>
            <td className="tournament-data"> {tournament.date} </td>
            <td className="tournament-data"> {tournament.course} </td>
            <td className="tournament-data">
                <Link 
                    to={{
                        pathname: "/results",
                        state: {
                            date: tournament.date,
                            course: tournament.course,
                        },
                    }}
                >
                    {tournament.played === true ? 
                        <div>Results</div> :
                        <div>Sign Up</div> 
                    }
                    {/* Results */}
                </Link>
            </td>
        </tr>
    );
}

export default Tournament;