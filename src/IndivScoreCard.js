import React from 'react';
import IndivHole from './IndivHole.js';
import './Golf.css';   
    
const IndivScoreCard = ({player="JD", par, scores, handleHoleScore}) => {

    const handleSelectScore = (e, hole) => {
        handleHoleScore(player, hole, e.value);
    }

    return(
        <div id="player-score-card">
            <div className="name"> {player} </div>
            {
                scores !== undefined ?
                    scores.map((score, idx) => {
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