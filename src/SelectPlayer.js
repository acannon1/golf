import React, {useEffect} from 'react';
import './Golf.css';

const SelectPlayer = ({foursome=[], changePlayer}) => {

    useEffect(() => {
        console.log("SelectPlayer")
    }, [])

    return(
        <div className="select-player">
            <h4>Select Player</h4>
            <div className="list-players">
            {
                Object.keys(foursome).map((player, idx) => {   
                    return(
                        <div key={idx} className="player" onClick={() => changePlayer(player)}>
                            {player}
                        </div>
                    )
                })
            }
            </div>
        </div>
    )
}

export default SelectPlayer;