import React from 'react';
import { Link } from "react-router-dom";
// import golfDbApi from './Authorize/GolfDbApi.js';
// import { useDispatch } from 'react-redux'
// import { updateResults } from './redux/resultsSlice'
import './Golf.css';

const Tournament = ({tournament}) => {

    return (
        <tr>
            <td className="tournament-data"> {tournament.date} </td>
            <td className="tournament-data"> {tournament.course} </td>
            <td className="tournament-data">
                <Link 
                    // to="/results" params={outing.date}
                    to={{
                        pathname: "/results",
                        state: {
                            date: tournament.date,
                            course: tournament.course,
                        },
                    }}
                >
                    Results
                </Link>
            </td>
        </tr>
    );
}

export default Tournament;