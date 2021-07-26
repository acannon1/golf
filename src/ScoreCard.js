import React, {useState, useEffect} from 'react';
import Select from 'react-select';
import golfDbApi from './GolfDbApi.js';
import './Golf.css';

const ScoreCard = ({db=null}) => {
    const [scores, setScores] = useState(['','','','','','','','','','','','','','','','','','','']);
    const [player, setPlayer] = useState('');
    const [date, setDate] = useState('');
    const [course, setCourse] = useState('');
    const [optGolfers, setOptGolfers] = useState([]);
    const [caption, setCaption] = useState('');
     

    const ref = db.collection("Tournaments").where("status", "==", "In Progress");

    const getTournaments = () => {
      ref.onSnapshot((querySnapshot) => {
        let ref = querySnapshot.docs[0].data();
        setCaption(ref.date + ' at ' + ref.course);
        setDate(ref.date)
        setCourse(ref.course)

        const items = [];
        ref.signUpList.map((player, idx) => {
            items.push({label: player, value: idx+1});
        })
        setOptGolfers(items)
      }, (error) => {
          console.log(error)
      })
    }

    useEffect(() => {
        getTournaments();
    }, [])

    const handleKeyPress = (e) => {
        if(/^\d+$/.test(e.key)) {
            const newArray = [...scores];
        }
    }

    const handleScore = (e) => {
        let newArray = [...scores];
        newArray[parseInt(e.target.id)] = e.target.value;
          
        var tempTotal = 0;
        newArray.map((s, idx) => {
            if(idx !== 18) {
                if(s !== "") {
                    tempTotal += parseInt(s)
                }
            }
        })

        newArray[18] = String(tempTotal);
        setScores(newArray);
    }

    const handleSelectPlayer = (e) => {
        setPlayer(e.label);
        golfDbApi.getPlayerScore(db, date, course, e.label)
            .then((data) => {
                setScores(data)
            });
    }

    const saveScores = () => {  
        golfDbApi.saveRound(db, player, scores, date);  
    }

    const hole = () => {
        let temp=[];
        scores.map((score, idx) => {
            temp.push(
                <div key={idx} className="score-card-column">
                    {idx !== 18 ? 
                        <div className="score-card-hole">{idx+1}</div> : 
                        <div className="score-card-hole">Tot</div>
                    }                    
                    <input 
                        id={idx}
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
            {/* <div className="score-card-course"> */}
            <h4>{caption}</h4>
            {/* </div> */}
            <div className="score-card-select-player">
                <Select options={ optGolfers } onChange={e=>handleSelectPlayer(e)}/>
            </div>
            <div className="score-entry"> { hole() } </div>
            <button onClick={saveScores}>Save</button>
        </div>
    )
}

export default ScoreCard;