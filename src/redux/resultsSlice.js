import { createSlice } from '@reduxjs/toolkit'

export const resultsSlice = createSlice ({
    name: 'results',
    initialState: {
        "Course": "Hilton Head",
        "Date": "September 11, 2018",
        "Results":{
          "Par": [5,3,4,4,4,4,5,3,4],
          "Alan Cannon": [4,3,4,4,5,4,4,2,4],
        }},
    reducers: {
        updateResults: (state, action) => {
            console.log(action.payload.results)
            state = action.payload.results;
        },
        // addTodo: (state, action) => {
        //     const newTodo = {
        //         id: Date.now(),
        //         title: action.payload.title,
        //         completed: false
        //     };
        //     state.push(newTodo);
        // },
    }
});

export const { updateResults } = resultsSlice.actions
export default resultsSlice.reducer