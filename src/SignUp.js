import React from 'react';
import golfDbApi from './GolfDbApi.js';
import './Golf.css';

const SignUp = ({db=null, user={}, futureTournaments=null}) => {
  
  const handleSignUp=(date, name)=>{
    golfDbApi.signUp(db, date, name)
  }
  
  return (
    <div className="container-home">
        <h3> Sign Up</h3>
        <div>Next event: </div>
        {futureTournaments.map((tournament) => {
          return(
            <div>
              <div>{tournament.date} @ {tournament.course}</div>
              {tournament.signUpList.find(element => element = user.name) ? 
                null : 
                <button onClick={()=>handleSignUp(tournament.date, user.name)}>Sign Up</button>
              }
              <ul>
              <h4>Signed Up</h4>
                {tournament.signUpList.map((golfers, idx) => {
                  return(
                    <li key={idx}>{golfers}</li>
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