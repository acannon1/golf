import React from 'react';
import Select from 'react-select';
import './Golf.css';   
    
const IndivHole = ({index, par, score, handleSelectScore}) => {

    const optScores = [
        {label: 1, value: 1},
        {label: 2, value: 2},
        {label: 3, value: 3},
        {label: 4, value: 4},
        {label: 5, value: 5},
        {label: 6, value: 6},
        {label: 7, value: 7},
        {label: 8, value: 8}
    ];

    return (
        <div id="individual-hole">
            <div className="indiv-score-block">
                {index !== 18 ?
                    <Select
                        inputProps={{ id: index }}
                        options={ optScores }
                        onChange={e=>handleSelectScore(e, index)}
                        placeholder={score !== 0 ? score : null}
                        components={{ DropdownIndicator:() => null, IndicatorSeparator:() => null }}
                    /> :
                    <div className="total-score">{score}</div>}
            </div>
        </div>
    );
}

export default IndivHole;