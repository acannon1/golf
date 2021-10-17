import React, {useState, useEffect} from 'react';
import './Leaderboard.css';

const Leaderboard = ({db=null}) => {
    const [results, setResults] = useState({});
    const [par, setPar] = useState([1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1])
    const [skins, setSkins] = useState({});
    const [winners, setWinners] = useState({});

    const ref = db.collection("Tournaments").where("status", "==", "In Progress");

    const getResults = () => {

        ref.onSnapshot((querySnapshot) => {
          if(querySnapshot.docs[0] !== undefined) {
            let ref = querySnapshot.docs[0].data();



            Object.keys(ref.scores).map((key) => {
              ref.scores[key] = ref.scores[key].split(",").map(Number);
            });

            db.collection("Courses").where("name", "==", ref.course).get()
            .then(value => {
              setPar(value.docs[0].data()['par']);
            });

            
            const birdieTotals = ref.skins.reduce(function (acc, curr) {
              return acc[curr] ? ++acc[curr] : acc[curr] = 1, acc
            }, {});                  

            const skinTotals = ref.skins.reduce(function (acc, curr) {
              return acc[curr] ? ++acc[curr] : acc[curr] = 1, acc
            }, {});

            ref.skinTotals = skinTotals;
            ref.birdieTotals = birdieTotals;
                            
            console.log(ref)
          }
        }, (error) => {
            console.log(error)
        })
    }

    useEffect(() => {
        getResults();
    }, {})


  var total = 0;
  return (
    <div id="leader-board">
      {Object.keys(results).length===0 ? 
        null
      :
        <div>
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
                <th>Skins</th>
                <th>Birdies</th>
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
                <td></td>
                <td></td>
              </tr>
            {
                Object.keys(results.scores).map((player, index) => {
                  return(
                      <tr  key={index}>
                          <td> {player} </td>
                          {
                              results.scores[player].map((score, idx) => {
                                  return(
                                    <td key={idx}>
                                      <div 
                                        className=
                                          {score < par[index] ?
                                            score !== 0 ? 
                                              (results.skins[idx] === player ? "leader-board red skin" : "leader-board red") : 
                                              null
                                          :
                                            results.skins[idx] === player ? "leader-board skin" : null
                                          }
                                        >
                                        {score !== 0 ? score : null}
                                      </div>
                                    </td>)
                              })
                          }
                          <td> {results.skinTotals[player]} </td>
                          <td> {results.birdieTotals[player]} </td>
                      </tr>
                  )})
            }
            </tbody>
          </table>
        </div>
      }
    </div>
  );
}

export default Leaderboard;
