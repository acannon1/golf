import React, {useState, useEffect} from 'react';
import { Link } from "react-router-dom";
import './Golf.css';

const Tournament = ({tournament}) => {

    const [path, setPath] = useState("");
    const [title, setTitle] = useState("");

    useEffect(() => {
        if(tournament.status === "Sign Up") {
            setPath("/sign-up");
            setTitle("Sign Up");
        } else if(tournament.status === "In Progress") {
            setPath("/results");
            setTitle("In Progress");
        } else{
            setPath("./results");
            setTitle("Results");
        }
    }, [])

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
        </tr>
    );
}

export default Tournament;


// {
//     tournament.status === "Done" ? 
//         <Link 
//             to={{
//                 pathname: path,
//                 state: {
//                     date: tournament.date,
//                     course: tournament.course,
//                 },
//             }}
//         >
//             {title} 
//         </Link>
//          : 
//         <Link 
//             to={{
//                 pathname: "/sign-up",
//             }}
//         >
//             Sign Up 
//         </Link>
// }