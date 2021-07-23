import React from 'react';
import golfDbApi from './Authorize/GolfDbApi.js';
import './Golf.css';

const SignUp = ({db=null, signUps=[]}) => {
  const handleSignUp=(date, name)=>{
    golfDbApi.signUp(db, date, name)
  }

  return (
    <div className="container-home">
        <h3> Sign Up</h3>
        <div>Next event: </div>
        {signUps.map((tournament) => {
          return(
            <div>
              <div>{tournament.date} @ {tournament.course}</div>
              <button onClick={()=>handleSignUp(tournament.date, "Sponge Bob")}>Sign Up</button>
              <div>Current Players:</div>
              {tournament.signUp.map((golfers) => {
                return(
                  <div>{golfers}</div>
                )
              })}
            </div>
          )
        })}
    </div>
  );
}

export default SignUp;