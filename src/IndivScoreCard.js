import React, {useEffect, useState} from 'react';
import IndivHole from './IndivHole.js';
import './Golf.css';   
    
const IndivScoreCard = ({player="", par, scores, handleHoleScore}) => {

    const [scores2, setScores2] = useState([]);

    useEffect(() => {
        setScores2(scores);
    }, [])

    const handleSelectScore = (e, hole) => {
        const tempScore = scores;
        tempScore[hole] = e.value;
        tempScore[18] = tempScore.reduce((a, b) => a + b, 0) - tempScore[18];
        console.log(tempScore)
        setScores2(tempScore);

        handleHoleScore(player, hole, e.value);
    }

    return(
        <div id="player-score-card">
            {console.log(scores2)}
            <div className="name"> {player} </div>
            {
                scores2 !== undefined ?
                    scores2.map((score, idx) => {
                        return(
                            <IndivHole
                                key={idx}
                                index={idx}
                                par={par[idx]}
                                score={score}
                                handleSelectScore={handleSelectScore}
                            />
                        )
                    }) : 
                    null
        }
        </div>
    );
}

export default IndivScoreCard;