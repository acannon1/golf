import React, {useState, useEffect} from 'react';
import Select from 'react-select';
import golfDbApi from './GolfDbApi.js';

const CreateTournament = ({db=null, courses=[]}) => {
    const [date, setDate] = useState('');
    const [course, setCourse] = useState('');
    // const [optCourse, setOptCourse] = useState([]);
    const optCourse=[];

    useEffect(() => {
        // let temp = [...optCourse];
        courses.map((course, idx) => {
            optCourse.push({label: course.name, value: idx+1});
        })
        // setOptCourse(temp);
    })

    const handleSubmit = () => {
        if(course !== '') {
            golfDbApi.createTournament(db, date, course);
        }
    }

    const handleClear = () => {
        setDate('');
        setCourse('');
    }

    return(
        <div className="create-course">
            <h3> Create Tournament </h3>
            <div>
                <label> Date: </label><br/>
                <input 
                    className="create-course-field"
                    type="text"
                    onChange={e => setDate(e.target.value)}
                    value={date}
                />
            </div>
            <div>
                <label > Course: </label><br/>
                <div className="score-card-course">
                    <Select options={ optCourse } onChange={e=>setCourse(e.label)}/>
                </div>
            </div>
            <button onClick={handleSubmit}>Submit</button>
            <button onClick={handleClear}>Clear</button>
        </div>
    )
}

export default CreateTournament;