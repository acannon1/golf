import React, {useState, useEffect} from 'react';
import golfDbApi from './GolfDbApi.js';
import './Leaderboard.css';

const Results = ({db=null}) => {
  const [results, setResults] = useState({
    "Course": "Hilton Head",
    "Date": "September 11, 2018",
    "Results":{
      "Par": [5,3,4,4,4,4,5,3,4],
      "Alan Cannon": [4,3,4,4,5,4,4,2,4],}});
    const [par, setPar] = useState([])

    const ref = db.collection("Tournaments").where("status", "==", "In Progress");

    const getResults = () => {
        let data = {
            "Course": '',
            "Date": '',
            "Results":{}
        };

        ref.onSnapshot((querySnapshot) => {
          let ref = querySnapshot.docs[0].data();
          data.Course = ref.course;
          data.Date = ref.date;
          Object.keys(ref).forEach(key => {
              if((key !== 'course') && (key !== 'date') &&(key !== 'status') && (key !== 'signUpList')) {
                  data.Results[key] = ref[key];
              }
          });
          
          db.collection("Courses").where("name", "==", ref.course).get()
            .then(value => setPar(value.docs[0].data()['par']))

          setResults(data);
        }, (error) => {
            console.log(error)
        })
  }

    useEffect(() => {
        getResults();
    }, [])

  var total = 0;
  return (
    <div id="leader-board">
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
            <th>Tot</th>
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
            return(
                <tr  key={index}>
                    <td> {player} </td>
                    {
                        results.Results[player].map((score, idx) => {
                            return(
                              <td 
                                key={idx} 
                                className=
                                  {score < par[index] ? 
                                    score !== 0 ? 
                                      "leader-board red" :
                                      null : 
                                      null}
                              >
                                {score !== 0 ? score : null}
                              </td>)
                        })
                    }
                </tr>
            )})
        }
        </tbody>
      </table>
    </div>
  );
}

export default Results;
