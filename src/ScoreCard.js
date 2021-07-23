import React, {useState, useEffect} from 'react';
import Select from 'react-select';
import golfDbApi from './Authorize/GolfDbApi.js';
import './Golf.css';

const ScoreCard = ({db=null, players=[], tournaments=[]}) => {
    const [score, setScore] = useState(['','','','','','','','','','','','','','','','','','','']);
    const [total, setTotal] = useState(0);
    const [player, setPlayer] = useState('');
    const [tournament, setTournament] = useState('');
    const [date, setDate] = useState('');
    const [course, setCourse] = useState('');
    const [optGolfers, setOptGolfers] = useState([]);
    const optPlayer=[];
    const optTournament=[];

    useEffect(() => {
        // players.map((player, idx) => {
        //     optPlayer.push({label: player.name, value: idx+1});
        // })
        tournaments.map((tournament, idx) => {
            optTournament.push(
                {label: tournament.date + ' at ' + tournament.course,
                value: idx+1}
            );
        })
    })

    const handleKeyPress = (e) => {
        if(/^\d+$/.test(e.key)) {
            let newArray = [...score];
            setTotal(total + parseInt(e.key))
            newArray[18] = total;
        }
    }

    const handleScore = (e) => {
        let newArray = [...score];
        newArray[parseInt(e.target.id-1)] = e.target.value;
        newArray[18] = total;
        setScore(newArray);
    }

    const saveScores = () => {  
        golfDbApi.saveRound(db, player, score, date);  
    }

    const handleSelectTournament = (e) => {
        let temp = tournaments[e.value-1];
        setTournament(temp);
        setCourse(temp.course)
        tournaments.map((obj) => {            
            if(obj.course === temp.course) {
                setDate(obj.date)
                let temp2 = []
                obj.signUp.map((pl, idx) => {
                    temp2.push({label: pl, value: idx+1});
                })
                setOptGolfers(temp2)
            }
        });
    }

    const handleSelectPlayer = (e) => {
        setPlayer(e.label);
    }

    const hole = () => {
        let temp=[];
        score.map((score, idx) => {
            temp.push(
                <div key={idx} className="score-card-column">
                    {idx !== 18 ? 
                        <div className="score-card-hole">{idx+1}</div> : 
                        <div className="score-card-hole">Tot</div>
                    }                    
                    <input 
                        id={idx+1}
                        className="score-card-score"
                        type="number"
                        onKeyPress={e => handleKeyPress(e)}
                        onChange={e => handleScore(e)}
                        value={score}
                    />
                </div>
            )
        })
        return (temp)
    }
    return(
        <div className="score-card">
            <h3> Score Card </h3>
            {/* <div className="score-card-title">Score Card</div> */}
            <div className="score-card-date">{date}</div>
            <div className="score-card-course">
                <Select options={ optTournament } onChange={e=>handleSelectTournament(e)}/>
            </div>
            <div className="score-card-select-player">
                <Select options={ optGolfers } onChange={e=>handleSelectPlayer(e)}/>
            </div>
            <div className="score-entry"> { hole() } </div>
            <button onClick={saveScores}>Save</button>
        </div>
    )
}

export default ScoreCard;