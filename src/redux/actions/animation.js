export const updatePie = (pie) => {
    return {
        type: 'UPDATE_PIE',
        payload: pie,
    };
}

export const updateBackgroundImage = (backgroundImage) => {
    return {
        type: 'UPDATE_BACKGROUND_IMAGE',
        payload: backgroundImage,
    };
}
