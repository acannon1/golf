import React, {useState, useEffect} from 'react';

// const SelectFoursome = ({playerPool=null, foursome, setFoursome}) => {
const SelectFoursome = ({pool=[], selected=[], selectPlayer, deSelectPlayer}) => {

    // const [pool, setPool] = useState([]);
    // const [selected, setSelected] = useState([]);

    // useEffect(() => {
    //   setPool(playerPool)
    //   console.log("here")
    // }, [])

    // const selectPlayer = (index) => {
    //     let tempFoursome = foursome;
    //     tempFoursome[pool[index]] = [];
    //     setFoursome(tempFoursome);

    //     let temp = [...pool];
    //     let tempSelect = [...selected];
    //     tempSelect.push(temp[index])
    //     temp.splice(index, 1);
    //     setPool(temp);
    //     setSelected(tempSelect);

    // }

    // const deSelectPlayer = (index) => {
    //     let tempFoursome = foursome;
    //     delete tempFoursome[selected[index]];
    //     setFoursome(tempFoursome);

    //     let temp = [...pool];
    //     let tempSelect = [...selected];
    //     temp.push(tempSelect[index])
    //     tempSelect.splice(index, 1);
    //     setPool(temp);
    //     setSelected(tempSelect);
    // }
console.log(pool)
    return(
        <div className="player-pool">
            <h4>Select Foursome</h4>
            <div className="player-available">
                <div>Available:</div>
                {
                    pool.map((player, idx) => {
                        return(
                            <div key={idx} className="pool-indiv" onClick={() => selectPlayer(idx)}>
                                {player}
                            </div>
                        )
                    })
                }
            </div>
            <div className="player-select">
                <div>Selected:</div>
                {
                    selected.map((player, idx) => {
                        return(
                            <div className="selected-indiv" onClick={() => deSelectPlayer(idx)}>
                                {player}
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default SelectFoursome;