import React, {useState, useEffect} from 'react';
import golfDbApi from './api/GolfDbApi.js';
import './Golf.css';

const SignUp = ({db=null, user={}, futureTournaments=null}) => {

  const [tournaments, setTournaments] = useState([])
  
  useEffect(() => {
    setTournaments(futureTournaments)
  })

  const handleSignUp=(date, idx)=>{
    let tempArray = [...tournaments];
    tempArray[idx].signUpList.push(user.name)
    setTournaments(tempArray)
    golfDbApi.signUp(db, date, user.name)
  }

  const handleWithdraw=(date, idx)=>{
    let tempArray = [...tournaments];    
    tempArray[idx].signUpList = tempArray[idx].signUpList.filter(e => e !== user.name);
    setTournaments(tempArray)
    golfDbApi.withDraw(db, date, user.name)
  }
  
  return (
    <div className="container-home">
        <h3> Sign Up</h3>
        <div>Next event: </div>
        {tournaments.map((tournament, idx) => {
          return(
            <div key={idx}>
              <div>{tournament.date} @ {tournament.course}</div>
              {tournament.signUpList.find(element => element == user.name) ? 
                <button onClick={()=>handleWithdraw(tournament.date, idx)}>Widthdraw</button>
                :
                <button onClick={()=>handleSignUp(tournament.date, idx)}>Sign Up</button>
              }
              <ul>
                <h4>Signed Up</h4>
                  {tournament.signUpList.map((golfers, idx) => {
                    return(
                      <li key={idx} className="signupList">{golfers}</li>
                    )
                  })}
              </ul>
            </div>
          )
        })}
    </div>
  );
}

export default SignUp;