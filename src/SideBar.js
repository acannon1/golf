import React from 'react'
import { Link } from "react-router-dom";
import './Golf.css';

const SideBar = ({isAdmin}) => {

    return (        
        <div className="side-nav">
            <ul className="nav-links">
                <li>
                    <Link to="/">Home</Link>
                </li>
                {/* <li>
                    <Link to="/news">News</Link>
                </li> */}
                <li>
                    <Link to="/sign-up">Sign Up</Link>
                </li>
                <li>
                    <Link to="/tournaments">Tournaments</Link>
                </li>
                <li>
                    <Link to="/players">Tour Players</Link>
                </li>
                <li>
                    <Link to="/score-card">Score Card</Link>
                </li>
                <li>
                    <Link to="/leaderboard">Leaderboard</Link>
                </li>
                {isAdmin ? 
                    <div>
                        <li>
                            <Link to="/create-course">Create Course</Link>
                        </li>
                        <li>
                            <Link to="/create-golfer">Create Golfer</Link>
                        </li>
                        <li>
                            <Link to="/create-tournament">Create Tournament</Link>
                        </li>
                    </div>
                    : null
                }
                <li>
                    {/* <Link to="/handicap">Handicaps</Link> */}
                </li>
            </ul>
        </div>
    )
}

export default SideBar;