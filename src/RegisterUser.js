import React, {useState} from 'react';
import accountManagement from './api/AccountManagement.js';
import golfDbApi from './api/GolfDbApi.js';

const RegisterUser = ({auth=null, db=null, successfullLogin}) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [signUp, setSignUp] = useState(false);


    const handleLogIn = async () => {
        if ((email !== '') && (password !== '')) {
            accountManagement.logIn(auth, email.trim(), password)
                .then(() => {
                    // console.log(response)
                    golfDbApi.getGolferInfo(db, email)
                        .then((data) => {
                            // setUser(data);
                            // console.log(data)
                            successfullLogin(data)
                    })
                })
                .catch((error) => { console.log(error) })
        }
    }

    const handleRegisterUser = () => {
        let loggedIn = false
        if ((email !== '') && (password !== '')) {
            loggedIn = accountManagement.registerUser(auth, email.trim(), password);
        }
        if (loggedIn) {
            golfDbApi.createGolfer(db, email, false, name, null, 0);
        }
    }

    // const handleSignUp = (value) => {
    //     setSignUp(value);
    // }

    const handleClear = () => {
        setName('');
        setEmail('');
        setPassword('');
    }
    
    return (
        <div className="create-course">
            {signUp ?
                <div>
                    <h3> Register User </h3>
                    <label > Name: </label><br/>
                    <input 
                        className="create-course-field"
                        type="text"
                        onChange={e => setName(e.target.value)}
                        value={name}
                    />
                </div>
                :
                <div>
                    <h3> Welcome to the STGA. Please log in. </h3>
                </div>
            }
            <div>
                <label> Email: </label><br/>
                <input 
                    className="create-course-field"
                    type="text"
                    onChange={e => setEmail(e.target.value)}
                    value={email}
                />
            </div>
            <div>
                <label> Password: </label><br/>
                <input 
                    className="create-course-field"
                    type="text"
                    onChange={e => setPassword(e.target.value)}
                    value={password}
                />
            </div>
            {signUp ?
                <div>
                    <button onClick={handleRegisterUser}>Enter</button>
                    <button onClick={() => setSignUp(false)}>Back</button>
                </div>
                :
                <div>
                    <button onClick={handleLogIn}>Log In</button>
                    <button onClick={() => setSignUp(true)}>Sign Up</button>
                </div>
            }
        </div>
    )
}

export default RegisterUser;