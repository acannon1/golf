import React, {useState, useEffect} from 'react';
import { useLocation } from "react-router-dom";
import golfDbApi from './GolfDbApi.js';
import './Golf.css';

const Results = ({db=null}) => {
  const location = useLocation();
  const [results, setResults] = useState({
    "Course": "Hilton Head",
    "Date": "September 11, 2018",
    "Results":{
      "Par": [5,3,4,4,4,4,5,3,4],
      "Alan Cannon": [4,3,4,4,5,4,4,2,4],}});
    const [par, setPar] = useState([])

  useEffect(() => {    
    golfDbApi.getTournament(db, location.state.date, location.state.course)
    .then((data) => {
        setResults(data);
    }); 

    golfDbApi.getCourse(db, location.state.course)
    .then((data) => {
        setPar(data);
    });
  }, [golfDbApi.getTournament]);

  var total = 0;
  return (
    <div id="tournament-results" className="results">
      <h2> {results.Course}</h2>
      <h4> {results.Date}</h4>
      <table>
        <thead>
          <tr>
            <th></th>
            {
              par.map((score, idx) => {
                return( <th key={idx}>{idx+1}</th> )
              })
            }
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Par</td>
            {
              par.map((score, idx) => {
                total += score
                return( <td key={idx}>{score}</td> )
              })
            }
            <td>{total}</td>
          </tr>
        {
          Object.keys(results.Results).map((player, index) => {
            if(player !== 'signUpList') {
              return(
                <tr  key={index}>
                  <td> {player} </td>
                  {
                    results.Results[player].map((score, idx) => {
                      return(
                        <td key={idx}>{score}</td>
                      )
                    })
                  }
                </tr>
              )
            }
          })
        }
        </tbody>
      </table>
    </div>
  );
}

export default Results;