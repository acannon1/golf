import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import './Golf.css';

const SelectFoursome = () => {

    const pool = useSelector((state) => state.pool);
    const selected = useSelector((state) => state.selected);
    const foursome = useSelector((state) => state.foursome);
    const dispatch = useDispatch();

    const selectPlayer = (index) => {
        dispatch({type: 'SELECT_PLAYER', payload: index});
    }

    const deSelectPlayer = (index) => {
        dispatch({type: 'DESELECT_PLAYER', payload: index});
    }

    const handleStart = () => {
      if(selected.length > 1) {
        let data = {
            player: (Object.keys(foursome)[0]), 
            startRound: true
        }
        dispatch({
          type: 'START_ROUND',
          payload: data
        });
      }
    }

    return(
        <div className="player-pool">
            <button onClick={handleStart}> Start Round </button>
            <div className="player-pool-container">
                <div className="sides left-side">
                    <div className="select-titles">Select Players:</div>
                    {
                        pool.map((player, idx) => {
                            return(
                                <div key={idx} className="names" onClick={() => selectPlayer(idx)}>
                                    {player}
                                </div>
                            )
                        })
                    }
                </div>
                <div className="sides">
                    <div className="select-titles">Foursome:</div>
                    {
                        selected.map((player, idx) => {
                            return(
                                <div key={idx} className="names" onClick={() => deSelectPlayer(idx)}>
                                    {player}
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default SelectFoursome;