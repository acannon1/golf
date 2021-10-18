import React from 'react';
import './Golf.css';
// import golfDbApi from './api/GolfDbApi.js';

const Home = () => {
  // const axiosTest = () => {
  //   console.log("run axios test");
  //   golfDbApi.testAxios();
  // }
    return (
        <div className="container-home">
            <h3> Home </h3>
            <div> Welcome the STGA (Shit Talkers Golf Association) </div>
            <div> Use this website to manage tournaments. </div>
            <div> This includes real time scoring and calculation of payouts. </div>
        </div>
    );
}

export default Home;