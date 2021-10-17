import React, {useState, useEffect} from 'react';
import SelectFoursome from './SelectFoursome.js';
import IndivScoreCard from './IndivScoreCard.js';
import ParHeader from './ParHeader';
import golfDbApi from './api/GolfDbApi.js';
import './Golf.css';

const ScoreCard = ({db=null, user=null}) => {

  const [par, setPar] = useState([4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,72]);
  const [tournament, setTournament] = useState({}); //holds the scores
  //Just holds the names for reference to tournament object
  const [foursome, setFoursome] = useState([]);
  const [startRound, setStartRound] = useState(false);

  useEffect(() => {
    golfDbApi.getCurrentTournament(db)
      .then((data) => {
        if(Object.keys(data).length !== 0) {
          if(Object.keys(user).length > 0) {
            data.foursomes.map((foursome, idx) => {
                if( foursome.search(user.name) >= 0 ) {
                  setFoursome(foursome.split(","))
                  setStartRound(true)
                }
            });
          }
          setTournament(data)
        }
      });
  }, [])

  const handleScore = (player, hole, score) => {
    const tempScore = tournament['scores'][player].split(",").map(Number);
    tempScore[hole]=score;
    tournament['scores'][player] = tempScore.join(",");
    setTournament(tournament)    
    golfDbApi.saveScoreRealTime(db,tournament.date,player,tournament['scores'][player])
  }

  const handleStartRound = (names) => {
    setStartRound(true)
    let grouping = "";
    names.map((name, idx) => {
      grouping = grouping.concat(name + ",")
    })
    setFoursome(names)
    grouping = grouping.substring(0, grouping.length - 1);
    golfDbApi.saveGrouping(db, tournament.date, grouping)
  }
  
  return (
    <div id="play" className="container-home">
        <div className="tournament-data"> {tournament.date} </div>
        <div className="tournament-data"> {tournament.course} </div>     
        {!startRound ?
          <SelectFoursome
            db={db}
            handleStartRound={handleStartRound}
          />
        :
        <div className="score-card">
          <div> Round in Progress </div>
          <ParHeader par={par}/>
          {
            tournament['scores'] !== undefined ?
              foursome.map((player, idx) => {
                return(
                  <IndivScoreCard
                    key={idx}
                    player={player}
                    par={par}
                    scores={tournament['scores'][player].split(',').map(Number)}
                    handleHoleScore={handleScore}
                  />
                )
              })
            :
              null
          }
        </div>
        }
    </div>
  );
}

export default ScoreCard;