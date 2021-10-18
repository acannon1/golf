import React, {useState} from 'react';
import golfDbApi from './api/GolfDbApi.js';

const CreateCourse = ({db=null}) => {
    const [name, setName] = useState('');
    const [rating, setRating] = useState('');
    const [slope, setSlope] = useState('');
    const [location, setLocation] = useState('');

    const handleSubmit = () => {
        golfDbApi.createCourse(db, name, location, rating, slope);
    }

    return (
        <div className="create-course">
            <h3> Create Course </h3>
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
                <label> Location: </label><br/>
                <input 
                    className="create-course-field"
                    type="text"
                    onChange={e => setLocation(e.target.value)}
                    value={location}
                />
            </div>
            <div>
                <label> Rating: </label><br/>
                <input 
                    className="create-course-field"
                    type="text"
                    onChange={e => setRating(e.target.value)}
                    value={rating}
                />
            </div>
            <div>
                <label> Slope: </label><br/>
                <input 
                    className="create-course-field"
                    type="text"
                    onChange={e => setSlope(e.target.value)}
                    value={slope}
                />
            </div>
            <button onClick={handleSubmit}>Submit</button>
        </div>
    )
}

export default CreateCourse;