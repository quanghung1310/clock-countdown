export const setTimer = (timer) => {
    return {
        type: 'SET_TIMER',
        payload: timer
    }
};

export const setMinutes = (minutes) => {
    return {
        type: 'SET_MINUTES',
        payload: minutes
    };
};

export const setSeconds = (seconds) => {
    return {
        type: 'SET_SECONDS',
        payload: seconds
    };
};
