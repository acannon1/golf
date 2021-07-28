import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router,Switch, Route } from "react-router-dom";
import SideBar from './SideBar.js';
import Home from './Home.js';
import ScoreCard from './ScoreCard.js';
import SignUp from './SignUp.js';
import PlayerPage from './PlayerPage.js';
import Tournaments from './Tournaments.js';
import Header from './Header.js';
import Play from './Play.js';
import CreateCourse from './CreateCourse.js';
import CreateGolfer from './CreateGolfer.js';
import CreateTournament from './CreateTournament.js';
import Leaderboard from './Leaderboard.js';
import {auth, firestore} from './Authorize/Support.js';
import firebase from 'firebase/app';
import golfDbApi from './GolfDbApi.js';
import './App.css';

function App() {
  const [user, setUser] = useState(() => auth.currentUser);
  const [user2, setUser2] = useState({});
  const [initializing, setInitializing] = useState(true);
  const [golfers, setGolfers] = useState([]);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(userInfo => {
      if (userInfo) {
        setUser(userInfo);
        if(userInfo !== null) {
          golfDbApi.getGolferInfo(firestore, userInfo.email)
            .then((data) => setUser2(data));
        }
        golfDbApi.getGolfers(firestore)
          .then((data) => setGolfers(data));
        golfDbApi.getCourses(firestore)
          .then((data) => setCourses(data));
      } else {
        setUser(null);
      }
      if(initializing) {
        setInitializing(false)
      }
    })
    return unsubscribe;
  }, [golfDbApi.getGolfers, golfDbApi.getCourses]);

  const signIn = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    try {
      await auth.signInWithPopup(provider);
    } catch(error) {
      console.log(error)
    }
  }

  const signOut = async () => {
    console.log("signOut")
    try {
      await auth.signOut();
    } catch(error) {
      console.log(error.message);
    }
  }

  return (
    <Router>
      <div className="app-container">
          <Header/>
          {user === null ?
            <button onClick={signIn}>Sign In</button> :             
            <div>
              <button onClick={signOut}>Sign Out</button>
              {(Object.keys(user2).length === 0 && user2.constructor === Object) ?
                null :
                user2.name.split(' ').slice(0, 1).join(' ')
              }
            </div>
          }
          <SideBar/>
          <div className="temp">
            <Switch>
              <Route path="/score-card"> <ScoreCard db={firestore} players={golfers}/> </Route>
              <Route path="/players"> <PlayerPage players={golfers}/> </Route>
              <Route path="/tournaments"> <Tournaments db={firestore}/> </Route>
              <Route path="/play"> <Play db={firestore}/> </Route>
              <Route path="/leaderboard"> <Leaderboard db={firestore}/> </Route>
              {/* <Route path="/play"> <Results db={firestore}/> </Route> */}
              <Route path="/create-course"> <CreateCourse db={firestore}/> </Route>
              <Route path="/create-golfer"> <CreateGolfer db={firestore}/> </Route>
              <Route path="/create-tournament"> <CreateTournament db={firestore} courses={courses}/> </Route>
              <Route path="/create-course"> <CreateCourse db={firestore}/> </Route>
              <Route path="/sign-up"> <SignUp db={firestore} user={user2}/> </Route>
              <Route path="/"> <Home db={firestore}/> </Route>
              {/* <Route component={} /> */}
            </Switch>
          </div>
        </div>
    </Router>
  );
}

export default App;
