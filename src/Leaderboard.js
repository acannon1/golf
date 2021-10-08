import React, {useState, useEffect} from 'react';
// import golfDbApi from './api/GolfDbApi.js';
import './Leaderboard.css';

const Leaderboard = ({db=null}) => {
    const [results, setResults] = useState({});
    const [par, setPar] = useState([1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1])
    const [skins, setSkins] = useState({});
    const [winners, setWinners] = useState({});

    const ref = db.collection("Tournaments").where("status", "==", "In Progress");

    const getResults = () => {
        let data = {
            "Course": '',
            "Date": '',
            "Results":{}
        };

        let lowestScore = [8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8];
        let winner = ["", "", "", "", "", "", "", "", "","", "", "", "", "", "", "", "", ""];

        ref.onSnapshot((querySnapshot) => {
          if(querySnapshot.docs[0] !== undefined) {
            let ref = querySnapshot.docs[0].data();
            data.Course = ref.course;
            data.Date = ref.date;
            Object.keys(ref).forEach(key => {
                if((key !== 'course') && (key !== 'date') && (key !== 'status') &&
                  (key !== 'signUpList') && (key !== 'foursomes') && (key !== 'scores')) {
                    data.Results[key] = ref[key];
                    let numberOfSkins = 1;

                    //DETERMINE SKINS PAYOUTS
                    ref[key].map((score, idx) => {
                      if(score !== 0) {
                        if( score < lowestScore[idx]) {
                          lowestScore[idx] = score;
                          for(let i=0; i<numberOfSkins; i++) {
                            winner[idx-i] = key;
                          }
                          numberOfSkins = 1;
                        } else if ((winner[idx] !== '') && (score == lowestScore[idx])){
                          numberOfSkins++;
                        } else if (numberOfSkins > 1) {
                          for(let i=0; i<numberOfSkins; i++) {
                            winner[idx-i] = winner[idx];
                          }
                          numberOfSkins=1
                        }
                      }
                    })

                    // console.log(winner)
                }
            });

            setWinners(winner)
            const occurrences = winner.reduce((acc, curr) => {
              return acc[curr] ? ++acc[curr] : acc[curr] = 1, acc
            }, {});
            setSkins(occurrences);
            console.log(occurrences) // => {2: 5, 4: 1, 5: 3, 9: 1}

            db.collection("Courses").where("name", "==", ref.course).get()
              .then(value => setPar(value.docs[0].data()['par']))
            setResults(data);
          }
        }, (error) => {
            console.log(error)
        })
  }

    useEffect(() => {
        //  golfDbApi.getRealTimeScores(db)
        //    .then((data) => {
        //     //  console.log(data);

        //     setResults(data)
        //     // setPar(data.Par)
        //  });
        getResults();
    }, {})

    // const getData = () => {
    //   console.log("getData")
    //   const ref = db.collection("Tournaments").where("status", "==", "In Progress");

    //   ref.onSnapshot((querySnapshot) => {
    //     if(querySnapshot.docs[0] !== undefined) {
    //       let ref = querySnapshot.docs[0].data();
    //       console.log(ref.scores)
    //       ref.scores.map((score, idx) => {
    //         console.log(score)
    //         console.log(idx)
    //         console.log(score['Alan'])
    //         console.log(ref.scores[idx])
    //         console.log(Object.keys(ref.scores[idx]))
    //       })
    //     }
    //   }, (error) => {
    //       console.log(error)
    //   })
    // }

  var total = 0;
  return (
    <div id="leader-board">
      {/* <button onClick={getData}> Click </button> */}
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
              </tr>
            {
              Object.keys(results.Results).map((player, index) => {
                return(
                    <tr  key={index}>
                        <td> {player} </td>
                        {
                            results.Results[player].map((score, idx) => {
                                return(
                                  <td key={idx}>
                                    <div 
                                      className=
                                        {score < par[index] ?
                                          score !== 0 ? 
                                            (winners[idx] === player ? "leader-board red skin" : "leader-board red") : 
                                            null
                                        :
                                          winners[idx] === player ? "leader-board skin" : null
                                        }
                                      >
                                      {score !== 0 ? score : null}
                                    </div>
                                  </td>)
                            })
                        }
                        <td> {skins[player]} </td>
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
