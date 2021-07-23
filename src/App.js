import React, {useState, useEffect, useRef} from 'react';
import { BrowserRouter as Router,Switch, Route } from "react-router-dom";
import SideBar from './SideBar.js';
import Home from './Home.js';
import ScoreCard from './ScoreCard.js';
import SignUp from './SignUp.js';
import PlayerPage from './PlayerPage.js';
import Handicap from './Handicap.js';
import Golf from './Golf.js';
import Header from './Header.js';
import Results from './Results.js';
import CreateCourse from './CreateCourse.js';
import CreateGolfer from './CreateGolfer.js';
import CreateTournament from './CreateTournament.js';
import {auth, firestore} from './Authorize/Support.js';
import firebase from 'firebase/app';
import golfDbApi from './Authorize/GolfDbApi.js';
import './App.css';

function App() {
  const [user, setUser] = useState(() => auth.currentUser);
  const [initializing, setInitializing] = useState(true);
  const [golfers, setGolfers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [tournaments, setTournaments] = useState([]);
  const [signUps, setSignUps] = useState([]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setUser(user);
        golfDbApi.getGolfers(firestore)
          .then((data) => setGolfers(data));
        golfDbApi.getCourses(firestore)
          .then((data) => setCourses(data));
        golfDbApi.getTournaments(firestore)
          .then((data) => setTournaments(data));
        golfDbApi.getSignUp(firestore)
          .then((data) => setSignUps(data));
      } else {
        setUser(null);
      }
      if(initializing) {
        setInitializing(false)
      }
    })
    return unsubscribe;
  }, [golfDbApi.getGolfers, golfDbApi.getCourses, golfDbApi.getTournaments]);

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
          <button onClick={signIn}>Sign In</button>
          <button onClick={signOut}>Sign Out</button>
          <SideBar/>
          <div className="temp">
            <Switch>
              <Route path="/score-card"> <ScoreCard db={firestore} players={golfers} tournaments={tournaments}/> </Route>
              <Route path="/players"> <PlayerPage players={golfers}/> </Route>
              <Route path="/tournaments"> <Golf db={firestore} tournaments={tournaments}/> </Route>
              <Route path="/results"> <Results db={firestore}/> </Route>
              <Route path="/create-course"> <CreateCourse db={firestore}/> </Route>
              <Route path="/create-golfer"> <CreateGolfer db={firestore}/> </Route>
              <Route path="/create-tournament"> <CreateTournament db={firestore} courses={courses}/> </Route>
              <Route path="/create-course"> <CreateCourse db={firestore}/> </Route>
              <Route path="/sign-up"> <SignUp db={firestore} signUps={signUps}/> </Route>
              <Route path="/"> <Home db={firestore}/> </Route>
              {/* <Route component={} /> */}
            </Switch>
          </div>
        </div>
    </Router>
  );
}

export default App;
