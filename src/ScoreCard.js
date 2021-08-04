import React, {useState, useEffect} from 'react';
// import SelectFoursome from './SelectFoursome.js';
import PlayerScoreCard from './PlayerScoreCard.js';
import ParHeader from './ParHeader';
import golfDbApi from './GolfDbApi.js';
import { useDispatch,useSelector } from "react-redux";
import './Golf.css';

const ScoreCard = ({db=null}) => {
  const [date, setDate] = useState("");
  const pool = useSelector((state) => state.pool);
  const selected = useSelector((state) => state.selected);
  const foursome = useSelector((state) => state.foursome);
  const start = useSelector((state) => state.start);
  // const currentPlayer = useSelector((state) => state.currentPlayer);
  const dispatch = useDispatch();

  // const [hole, setHole] = useState(1)
  // const [score, setScore] = useState(4);
  const [par, setPar] = useState([4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,72]);
  // const [players, setPlayers] = useState["a", "b", "c", "d"];
  const [tournament, setTournament] = useState({});

  const ref = db.collection("Tournaments").where("status", "==", "In Progress");

  const getPlayerPool = () => {
    ref.onSnapshot((querySnapshot) => {
      let ref = querySnapshot.docs[0].data();
      const items = [];
      ref.signUpList.map((player) => {
          items.push(player);
      })
      setDate(ref.date)
      dispatch({type: 'INIT_POOL', payload: items})
    }, (error) => {
        console.log(error)
    })
  }

  useEffect(() => {
    golfDbApi.getCurrentTournament(db)
      .then((data) => setTournament(data));
    getPlayerPool();
  }, [])

  // const handleScore = () => {
  //   golfDbApi.saveScoreRealTime(db,date,currentPlayer,foursome[currentPlayer])
  //   let data = {player: currentPlayer, hole: hole, score: score}
  //   dispatch({type: 'UPDATE_SCORE', payload: data})
  // }

  const handleScore = (player, hole, score) => {
    golfDbApi.saveScoreRealTime(db,date,player,foursome[player])
    let data = {player: player, hole: hole, score: score}
    dispatch({type: 'UPDATE_SCORE', payload: data})
  }

  // const changeHole = (direction) => {
  //   if(direction === 'up') {
  //     if(hole < 18) {
  //       setHole(hole + 1)
  //     }
  //   } else {
  //     if(hole > 1) {
  //       setHole(hole - 1)
  //     }
  //   }
  // }

  // const changePlayer = (pl) => {
  //   dispatch({type: 'UPDATE_CURRENT_PLAYER', payload: pl});
  // }

  const selectPlayer = (index) => {
    dispatch({type: 'SELECT_PLAYER', payload: index});
  }

  const deSelectPlayer = (index) => {
    dispatch({type: 'DESELECT_PLAYER', payload: index});
  }

  const handleStart = () => {
    if(selected.length > 0) {
      let data = {player: (Object.keys(foursome)[0]), start: true}
      dispatch({
        type: 'START_ROUND',
        payload: data
      });
    }
  }

  return (
    <div id="play" className="container-home">
        <div className="tournament-data"> {tournament.date} </div>
        <div className="tournament-data"> {tournament.course} </div>
        {!start?
          <div className="player-pool">
            <h4>Select Foursome</h4>
            <div className="player-available">
                <div>Available:</div>
                {
                  pool.map((player, idx) => {
                      return(
                          <div key={idx} className="pool-indiv" onClick={() => selectPlayer(idx)}>
                              {player}
                          </div>
                      )
                    })
                }
            </div>

            <div className="player-select">
              <div>Selected:</div>
              {
                selected.map((player, idx) => {
                    return(
                        <div key={idx} className="selected-indiv" onClick={() => deSelectPlayer(idx)}>
                            {player}
                        </div>
                    )
                })
              }
            </div>
          <button onClick={handleStart}> Start </button>
        </div>
        :
        <div className="score-card">
          {/* <div className="keep-score"> */}
          <ParHeader par={par}/>
          {/* </div> */}
          
          {Object.keys(foursome).map((player, idx) => {
            return(
              <PlayerScoreCard
                key={idx}
                player={player}
                par={par}
                scores={foursome[player]}
                handleHoleScore={handleScore}
              />
            )
          })}
        </div>
        }
    </div>
  );
}

export default ScoreCard;