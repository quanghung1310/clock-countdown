const initialState = {
    pie: 0,
};

const animationReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'UPDATE_PIE':
            const newPie = action.payload;
            return {
                ...state,
                pie: newPie,
            };
        default:
            return state;
    }
};

export default animationReducer;