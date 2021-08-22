const initialState = {
    timer: null,
    minutes: 0,
    seconds: 0,
    valueInput: 0,
};

const clockReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_TIMER':
            const minutes = action.payload;
            const timer = new Date(new Date().getTime() + minutes * 60000).getTime();
            return {
                ...state,
                timer: timer,
                valueInput: minutes,
            };
        case 'SET_MINUTES':
            const newMinutes = action.payload;
            return {
                ...state,
                minutes: newMinutes
            };
        case 'SET_SECONDS':
            const newSeconds = action.payload;
            return {
                ...state,
                seconds: newSeconds
            };
        default:
            return state;
    }
};

export default clockReducer;