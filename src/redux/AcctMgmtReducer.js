const initState = {
    user: null,
    email: '',
    displayName: '',
    loggedIn: false,
}

const acctMgmtReducer = (state = initState, action) => {
    switch (action.type) {
        case 'SET_LOGIN_STATE':
            console.log("login state")
            console.log(state.email)
            console.log(action.payload.email)
            return {
              ...state,
              loggedIn: action.payload.loggedIn,
              email: action.payload.email,
            };

        case 'SET_EMAIL':
            console.log(action.payload)
            return {
                ...state,
                email: action.payload,
            };
            
        default:
            return state
    }
}

export default acctMgmtReducer;
