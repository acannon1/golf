import React from 'react';
// import EnterScore from './EnterScore.js';
import './Golf.css';
import golfDbApi from './api/GolfDbApi.js';

const Home = () => {
  // const axiosTest = () => {
  //   console.log("run axios test");
  //   golfDbApi.testAxios();
  // }
  return (
    <div className="container-home">
      <h3> Home </h3>
      <div>Welcome the STGA (Shit Talkers Golf Association)</div>
      <div>Use this website to sign up for tournaments and view tournament results.</div>
        {/* <EnterScore player={"John Doe"}/> */}
        {/* <button onClick={axiosTest}>Test</button> */}
    </div>
  );
}

export default Home;