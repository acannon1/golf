const initState = {
    pool: [],
    selected: [],
    foursome: {},
    start: false,
    currentPlayer: '',
}

const foursomeReducer = (state = initState, action) => {
    const { pool, selected, foursome, start, currentPlayer } = state;
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
            newFoursome[pool[action.payload]] = new Array(19)
            newSelected.push(pool[action.payload])
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
                start: action.payload
            };
            
        case 'UPDATE_SCORE':
            const {player, hole, score} = action.payload;
            newFoursome[player][hole-1] = score;
        
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