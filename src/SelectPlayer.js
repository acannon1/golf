import React, {useState, useEffect} from 'react';
import Select from 'react-select';
import './Golf.css';

const SelectPlayer = ({foursome=[], changePlayer}) => {
    const [optGolfers, setOptGolfers] = useState([]);

    useEffect(() => {
        const items = [];
        Object.keys(foursome).map((player, idx) => {
            items.push({label: player, value: idx+1});
        })
        setOptGolfers(items)
    }, [])

    return(
        <div className="select-player">
            <div className="score-card-select-player">
                <Select options={ optGolfers } onChange={e=>changePlayer(e.label)}/>
            </div>
        </div>
    )
}

export default SelectPlayer;