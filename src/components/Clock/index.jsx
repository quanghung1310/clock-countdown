import PropTypes from 'prop-types';
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setMinutes, setSeconds } from '../../redux/actions/clock';

Clock.propTypes = {
    timer: PropTypes.number,
};

Clock.defaultProps = {
    timer: 0,
};

function Clock(props) {
    const {timer} = props;
    const secondsState = useSelector(state => state.clock.seconds);
    const minutesState = useSelector(state => state.clock.minutes);
    const dispatch = useDispatch();

    let clockInterval = useRef();

    const startTimer = () => {
        if (!timer) return;
    
        clockInterval = setInterval(() => {
            const now = new Date().getTime();
            const distance = timer - now;
    
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            if (distance < 0) {
                clearInterval(clockInterval.current);
            } else {
                dispatch(setMinutes(minutes));
                dispatch(setSeconds(seconds));
            }
        }, 0);
    }

    useEffect(() => {
        startTimer();
        
        return () => {
            // Clean up
            clearInterval(clockInterval)
        }
    });

    return (
        <div className="clock-wrap">
            <div className="clock pro-0">
                <span className="count">{minutesState} min {secondsState} sec</span>
            </div>
        </div>
    );
}

export default Clock;
