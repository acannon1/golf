const initState = {
    pool: [],
    selected: [],
    foursome: {},
    startRound: false,
    currentPlayer: '',
}

const foursomeReducer = (state = initState, action) => {
    const { pool, selected, foursome } = state;
    const newPool = [...pool];
    const newFoursome = {...foursome};
    const newSelected = [...selected];

    switch (action.type) {
        case 'INIT_POOL':      
            return {
              ...state,
              pool: action.payload,
            };

        case 'SELECT_PLAYER':
            newFoursome[pool[action.payload]] = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
            newSelected.push(pool[action.payload]);
            newPool.splice(action.payload, 1);

            return {
              ...state,
              pool: newPool,
              selected: newSelected,
              foursome: newFoursome
            };
            
        case 'DESELECT_PLAYER':    
            delete newFoursome[selected[action.payload]];
            newSelected.splice(action.payload, 1);
            newPool.push(selected[action.payload])
      
            return {
              ...state,
              pool: newPool,
              selected: newSelected,
              foursome: newFoursome
            };
            
        case 'START_ROUND':
            return {
                ...state,
                startRound: action.payload.startRound,
                currentPlayer: action.payload.player
            };
            
        case 'UPDATE_SCORE':
            const {player, hole, score} = action.payload;
            newFoursome[player][hole] = score;
            let total = 0;
            newFoursome[player].map((score, idx) => {
                if(idx !== 18) {
                    total += score;
                }
            })
            newFoursome[player][18] = total;
        
            return {
                ...state,
                foursome: newFoursome
            };
            
        case 'UPDATE_CURRENT_PLAYER': 
            return {
                ...state,
                currentPlayer: action.payload
            };

        default:
            return state
    }
}

export default foursomeReducer;