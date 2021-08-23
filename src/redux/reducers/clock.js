const initialState = {
    timer: 0,
};

const clockReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_TIMER':
            const minutes = action.payload;
            if (!minutes) return state;
            return {
                ...state,
                timer: parseInt(minutes),
            };
        default:
            return state;
    }
};

export default clockReducer;