import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router,Switch, Route } from "react-router-dom";
import SideBar from './SideBar.js';
import Home from './Home.js';
import ScoreCard from './ScoreCard.js';
import SignUp from './SignUp.js';
import PlayerPage from './PlayerPage.js';
import Tournaments from './Tournaments.js';
import Header from './Header.js';
import CreateCourse from './CreateCourse.js';
import CreateGolfer from './CreateGolfer.js';
import CreateTournament from './CreateTournament.js';
import Leaderboard from './Leaderboard.js';
import PastResults from './PastResults.js';
import RegisterUser from './RegisterUser.js';
import {auth, firestore} from './Authorize/Support.js';
import golfDbApi from './api/GolfDbApi.js';
import './App.css';

function App() {
  const [loginStatus, setLoginStatus] = useState(false)
  const [userEmail, setUserEmail] = useState(null)  
  const [user2, setUser2] = useState({});
  const [skins, setSkins] = useState({});
  const [golfers, setGolfers] = useState([]);
  const [courses, setCourses] = useState([]);
  // const [futureTournaments, setFutureTournaments] = useState([]);
  // const [allTournaments, setAllTournaments] = useState([]);
  const [admin, setAdmin] = useState(false)
 
  useEffect(() => {
    if(loginStatus) {
      console.log("loginStatus = true")
      golfDbApi.getCourses(firestore)
        .then((data) => setCourses(data));
      // golfDbApi.getTournaments(firestore)
      //   .then((data) => setAllTournaments(data));
      golfDbApi.getGolfers(firestore)
        .then((data) => setGolfers(data));
      // golfDbApi.getFutureTournaments(firestore)
      //   .then((data) => setFutureTournaments(data));
    } else {
      console.log("loginStatus = false")
    }
  }, [])

  const successfullLogin = (val1, val2) => {
    setLoginStatus(val1);
    setUserEmail(val2);
    golfDbApi.getGolferInfo(firestore, val2)
      .then((data) => {
        setUser2(data)
        setAdmin(data.admin)
      })
    golfDbApi.getCourses(firestore)
      .then((data) => setCourses(data));
    // golfDbApi.getTournaments(firestore)
    //   .then((data) => setAllTournaments(data));
    golfDbApi.getGolfers(firestore)
      .then((data) => setGolfers(data));
    // golfDbApi.getFutureTournaments(firestore)
    //   .then((data) => setFutureTournaments(data));
  }

  const signOut = async () => {
    try {
      await auth.signOut();
      setUserEmail(null)
      setLoginStatus(false)
    } catch(error) {
      console.log(error.message);
    }
  }

  return (
    <Router>
      <div className="app-container">
          <Header
            userEmail={userEmail}
            signOut={signOut}
            auth={auth}
          />
          {loginStatus === false ?
            <div className="log-in">
              <RegisterUser
                auth={auth}
                db={firestore}
                successfullLogin={successfullLogin}
                setAdmin={setAdmin}
              />
            </div>
            :             
            <div>
              <SideBar isAdmin={admin}/>
              <div className="temp">
                <Switch>
                  <Route path="/players"> <PlayerPage players={golfers}/> </Route>
                  {/* <Route path="/tournaments"> <Tournaments tournaments={allTournaments}/> </Route> */}
                  <Route path="/tournaments"> <Tournaments db={firestore} isAdmin={admin}/> </Route>

                  <Route path="/score-card"> <ScoreCard db={firestore} user={user2}/> </Route>
                  <Route path="/leaderboard"> <Leaderboard db={firestore}/> </Route>
                  <Route path="/results"> <PastResults db={firestore}/> </Route>
                  <Route path="/results"> <Leaderboard db={firestore}/> </Route>
                  {/* <Route path="/skins"> <Skins skins={skins}/> </Route> */}
                  <Route path="/create-course"> <CreateCourse db={firestore}/> </Route>
                  <Route path="/create-golfer"> <CreateGolfer db={firestore}/> </Route>
                  <Route path="/create-tournament"> <CreateTournament db={firestore} courses={courses}/> </Route>
                  <Route path="/sign-up"> <SignUp db={firestore} user={user2}/> </Route>
                  <Route path="/"> <Home db={firestore}/> </Route>
                  {/* <Route component={} /> */}
                </Switch>
              </div>
            </div>
          }
        </div>
    </Router>
  );
}

export default App;
