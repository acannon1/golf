import React, {useState} from 'react';
import './Golf.css';

const EnterScore = ({score, par=4, player, setScore}) => {
    // const [score, setScore] = useState(par);

    return(
        <div className="enterScore">
            <div>Enter Score</div>
            <div>{player}</div>
            <div className="score-group">
                <div className={score<par? "score red":"score black"}>{score}</div>
                <div className="adjust-score">
                    <button onClick={() => setScore(score + 1)}>+</button>
                    <button onClick={() => setScore(score - 1)}>-</button>
                </div>
            </div>
        </div>
    );
}

export default EnterScore