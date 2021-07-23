import React from 'react';
import golfDbApi from './GolfDbApi.js';
import './Golf.css';

const SignUp = ({db=null, upcomingTournaments=[], user={}}) => {
  const handleSignUp=(date, name)=>{
    golfDbApi.signUp(db, date, name)
  }
console.log(user)
  return (
    <div className="container-home">
        <h3> Sign Up</h3>
        <div>Next event: </div>
        {upcomingTournaments.map((tournament) => {
          return(
            <div>
              <div>{tournament.date} @ {tournament.course}</div>
              <button onClick={()=>handleSignUp(tournament.date, user.name)}>Sign Up</button>
              <ul>
              <h4>Signed Up</h4>
                {tournament.signUpList.map((golfers) => {
                  return(
                    <li>{golfers}</li>
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