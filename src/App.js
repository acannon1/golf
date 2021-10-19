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
import './App.css';

function App() {
    const [loginStatus, setLoginStatus] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        let obj = JSON.parse(sessionStorage.getItem('user'));

        if (obj !== null) {
            setUser(obj);
            setLoginStatus(true);
        }
    }, [])

    const successfullLogin = (result) => {
        setUser(result);
        setLoginStatus(true);
        sessionStorage.setItem('user', JSON.stringify(result));
    }

    const signOut = async () => {
        try {
            await auth.signOut();
            setUser(null);
            setLoginStatus(false);
            sessionStorage.removeItem('user');
        } catch(error) {
            console.log(error.message);
        }
    }

    return (
        <Router>
        <div className="app-container">
            <Header
                user={user}
                auth={auth}
                signOut={signOut}
            />
            {loginStatus === false ?
                <div className="log-in">
                <RegisterUser
                    auth={auth}
                    db={firestore}
                    successfullLogin={successfullLogin}
                />
                </div>
                :             
                <div>
                <SideBar isAdmin={user ? user.admin : false}/>
                <div className="temp">
                    <Switch>
                        <Route path="/players"> <PlayerPage db={firestore}/> </Route>
                        <Route path="/tournaments"><Tournaments db={firestore} isAdmin={user ? user.admin : false}/> </Route>
                        <Route path="/score-card"> <ScoreCard db={firestore} user={user}/> </Route>
                        <Route path="/leaderboard"> <Leaderboard db={firestore}/> </Route>
                        <Route path="/results"> <PastResults db={firestore}/> </Route>
                        <Route path="/results"> <Leaderboard db={firestore}/> </Route>
                        <Route path="/create-course"> <CreateCourse db={firestore}/> </Route>
                        <Route path="/create-golfer"> <CreateGolfer db={firestore}/> </Route>
                        <Route path="/create-tournament"> <CreateTournament db={firestore}/> </Route>
                        <Route path="/sign-up"> <SignUp db={firestore} user={user}/> </Route>
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
