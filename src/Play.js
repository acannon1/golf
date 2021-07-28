import React, {useState, useEffect} from 'react';
import SelectFoursome from './SelectFoursome.js';
import SelectPlayer from './SelectPlayer.js';
import EnterScore from './EnterScore.js';
import IndivScoreCard from './IndivScoreCard.js';
import golfDbApi from './GolfDbApi.js';
import { useDispatch,useSelector } from "react-redux";
import './Golf.css';

const Play = ({db=null}) => {
  const pool = useSelector((state) => state.pool);
  const selected = useSelector((state) => state.selected);
  const foursome = useSelector((state) => state.foursome);
  const start = useSelector((state) => state.start);
  const dispatch = useDispatch();

  const [currentPlayer, setCurrentPlayer] = useState('');
  const [hole, setHole] = useState(1)
  const [score, setScore] = useState(4);    

  const ref = db.collection("Tournaments").where("status", "==", "In Progress");

  const getPlayerPool = () => {
    ref.onSnapshot((querySnapshot) => {
      let ref = querySnapshot.docs[0].data();
      const items = [];
      ref.signUpList.map((player) => {
          items.push(player);
      })
      dispatch({type: 'INIT_POOL', payload: items})
    }, (error) => {
        console.log(error)
    })
  }

  useEffect(() => {
    getPlayerPool()
  }, [])

  const handleScore = () => {
    let data = {player: currentPlayer, hole: hole, score: score}
    dispatch({type: 'UPDATE_SCORE', payload: data})
  }

  const changeHole = (direction) => {
    if(direction === 'up') {
      setHole(hole + 1)
    } else {
      setHole(hole - 1)
    }
  }

  const changePlayer = (pl) => {
    setCurrentPlayer(pl)
  }

  const selectPlayer = (index) => {
    dispatch({type: 'SELECT_PLAYER', payload: index});
  }

  const deSelectPlayer = (index) => {
    dispatch({type: 'DESELECT_PLAYER', payload: index});
  }

  const handleStart = () => {
    if(selected.length > 0) {
      setCurrentPlayer(Object.keys(foursome)[0])
      dispatch({type: 'START_ROUND', payload: true});
    }
  }

  return (
    <div className="container-home">
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
        <div>            

          <div className="enter-score">            
            <SelectPlayer foursome={foursome} changePlayer={changePlayer}/>
            <div>
              <button onClick={() => changeHole('down')}> &lt; </button>
              <div>{hole - 1}</div>
            </div>

            <EnterScore
              score={score}
              setScore={setScore}
              par={4}
              player={currentPlayer}
            />

            <div>
              <div>{hole + 1}</div>
              <button onClick={handleScore}> Enter </button>
              <button onClick={() => changeHole('up')}> &gt; </button>
            </div>
          </div>

          <IndivScoreCard db={db} players={foursome}/>
        </div>
        }
    </div>
  );
}

export default Play;