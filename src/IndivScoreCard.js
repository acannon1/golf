import React, {useEffect, useState} from 'react';
import IndivHole from './IndivHole.js';
import './Golf.css';   
    
const IndivScoreCard = ({player="", par, scores, handleScoreCard}) => {

    const [scores2, setScores2] = useState([]);

    useEffect(() => {
        setScores2(scores);
    }, [])

    const handleSelectScore = (e, hole) => {
        const tempScore = [...scores];
        tempScore[hole] = e.value;
        tempScore[18] = tempScore.reduce((a, b) => a + b, 0) - tempScore[18];
        setScores2(tempScore);

        handleScoreCard(player, tempScore);
    }

    return (
        <div id="player-score-card">
            <div className="name"> {player} </div>
            {
                scores2 !== undefined ?
                    scores2.map((score, idx) => {
                        return (
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