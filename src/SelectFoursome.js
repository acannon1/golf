import React, {useEffect, useState} from 'react';
import golfDbApi from './api/GolfDbApi.js';
import './Golf.css';

const SelectFoursome = ({db, handleStartRound}) => {

    const [selected, setSelected] = useState([]);
    const [pool, setPool] = useState([]);

    useEffect(() => {
        let temp = []
        let usednames = []
        let newSignUpList = [];
        golfDbApi.getCurrentTournament(db)
          .then((data) => {
                if(Object.keys(data).length !== 0) {
                    newSignUpList = [...data.signUpList]
                    data.foursomes.map((foursome) => {
                        temp = foursome.split(",")
                        temp.map((name) => {
                            usednames.push(name)
                        })
                    })
                    usednames.map((name) => {
                        newSignUpList = newSignUpList.filter(item => item !== name)
                    })
                    setPool(newSignUpList)
                }
          });
    }, [])

    const selectPlayer = (player) => {
        let tempArray = [...selected];
        tempArray.push(player)
        setSelected(tempArray)
        
        let tempPool = [...pool];    
        tempPool = tempPool.filter(e => e !== player);
        setPool(tempPool)
    }

    const deSelectPlayer = (player) => {
        let tempSelected = [...selected];
        tempSelected = tempSelected.filter(e => e !== player);
        setSelected(tempSelected)
        
        let tempPool = [...pool];    
        tempPool.push(player)
        setPool(tempPool)
    }

    const handleStart = () => {
      if(selected.length > 0) {
        handleStartRound(selected)
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
                                <div key={idx} className="names" onClick={() => selectPlayer(player)}>
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
                                <div key={idx} className="names" onClick={() => deSelectPlayer(player)}>
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