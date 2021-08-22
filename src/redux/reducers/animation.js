const initialState = {
    pie: 0,
    backgroundImage: '',
};

const animationReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'UPDATE_PIE':
            const newPie = action.payload;
            return {
                ...state,
                pie: newPie,
            };
        case 'UPDATE_BACKGROUND_IMAGE':
            const newBackgroundImage = action.payload;
            return {
                ...state,
                backgroundImage: newBackgroundImage,
            }
        default:
            return state;
    }
};

export default animationReducer;