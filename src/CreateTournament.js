import React, {useState, useEffect} from 'react';
import Select from 'react-select';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import moment from 'moment' // 292.3K (gzipped: 71.6K)
import golfDbApi from './api/GolfDbApi.js';

const CreateTournament = ({db=null, courses=[]}) => {
    const [course, setCourse] = useState('');
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [optCourse, setOptCourse] = useState([])
    // const optCourse=[];

    useEffect(() => {
        const temp = [];
        golfDbApi.getCourses(db)
            .then((data) => {
                data.map((course, idx) => {
                    temp.push({label: course.name, value: idx+1});
                })
            });
        setOptCourse(temp)
    }, [])

    const handleSubmit = () => {
        if (course !== '') {
            golfDbApi.createTournament(db, moment(selectedDate).format("MMMM  D, YYYY"), course);
        }
    }

    const handleClear = () => {
        // setSelectedDate('');
        setCourse('');
    }

    return (
        <div className="create-course">
            <h3> Create Tournament </h3>
            <div>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="MM/dd/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    label="Select Date:"
                    value={selectedDate}
                    onChange={setSelectedDate}
                    KeyboardButtonProps={{
                    'aria-label': 'change date',
                    }}
                />
                </MuiPickersUtilsProvider>
            </div>
            <div>
                <div className="score-card-course">
                    <Select
                        placeholder="Select Course"
                        options={ optCourse }
                        onChange={e=>setCourse(e.label)}
                    />
                </div>
            </div>
            <button onClick={handleSubmit}>Submit</button>
            <button onClick={handleClear}>Clear</button>
        </div>
    )
}

export default CreateTournament;