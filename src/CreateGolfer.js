import React, {useState} from 'react';
import golfDbApi from './api/GolfDbApi.js';

const CreateGolfer = ({db=null}) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [handicap, setHandicap] = useState('');
    const [admin, setAdmin] = useState('');
    const [numOfEvents, setNumOfEvents] = useState('');

    const handleSubmit = () => {
        if(email !== '') {
            golfDbApi.createGolfer(db, email, admin, name, handicap, numOfEvents);
        }
    }

    const handleClear = () => {
        setName('');
        setEmail('');
        setHandicap('');
        setAdmin('');
        setNumOfEvents('');
    }

    return(
        <div className="create-course">
            <h3> Create Golfer </h3>
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
                <label > Name: </label><br/>
                <input 
                    className="create-course-field"
                    type="text"
                    onChange={e => setName(e.target.value)}
                    value={name}
                />
            </div>
            <div>
                <label> Admin: </label><br/>
                <input 
                    className="create-course-field"
                    type="text"
                    onChange={e => setAdmin(e.target.value)}
                    value={admin}
                />
            </div>
            <div>
                <label> Handicap: </label><br/>
                <input 
                    className="create-course-field"
                    type="text"
                    onChange={e => setHandicap(e.target.value)}
                    value={handicap}
                />
            </div>
            <div>
                <label> Number of Events: </label><br/>
                <input 
                    className="create-course-field"
                    type="text"
                    onChange={e => setNumOfEvents(e.target.value)}
                    value={numOfEvents}
                />
            </div>
            <button onClick={handleSubmit}>Submit</button>
            <button onClick={handleClear}>Clear</button>
        </div>
    )
}

export default CreateGolfer;