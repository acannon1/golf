import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";
import SelectFoursome from './SelectFoursome.js';
import IndivScoreCard from './IndivScoreCard.js';
import ParHeader from './ParHeader';
import golfDbApi from './api/GolfDbApi.js';
import './Golf.css';

const ScoreCard = ({db=null}) => {
  const [date, setDate] = useState("");
  const foursome = useSelector((state) => state.foursome);
  const startRound = useSelector((state) => state.startRound);
  const dispatch = useDispatch();

  const [par, setPar] = useState([4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,72]);
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
    console.log('scorecard')
    golfDbApi.getCurrentTournament(db)
      .then((data) => setTournament(data));
      console.log('get pool')
    getPlayerPool();
  }, [])

  const handleScore = (player, hole, score) => {
    golfDbApi.saveScoreRealTime(db,date,player,foursome[player])
    let data = {player: player, hole: hole, score: score}
    dispatch({type: 'UPDATE_SCORE', payload: data})
  }

  return (
    <div id="play" className="container-home">
        <div className="tournament-data"> {tournament.date} </div>
        <div className="tournament-data"> {tournament.course} </div>        
        {!startRound ? null : <div> Round in Progress </div>}
        {!startRound ?
          <SelectFoursome/>
        :
        <div className="score-card">
          <ParHeader par={par}/>
          
          {Object.keys(foursome).map((player, idx) => {
            return(
              <IndivScoreCard
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