import PropTypes from 'prop-types';
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { setMinutes, setSeconds } from '../../redux/actions/clock';

const ClockWrap = styled.div`
    margin: auto;
    width: 240px;
    height: 240px;
    margin-top: 100px;
    position: relative;
    border-radius: 50px;
    background-color: #fff;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.15);
`;

const ClockStyle = styled.div`
    top: 50%;
    left: 50%;
    width: 180px;
    height: 180px;
    border-radius: 50%;
    position: absolute;
    margin-top: -90px;
    margin-left: -90px;
    background-color: #feeff4;

    &:before {
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        width: 120px;
        height: 120px;
        margin-top: -60px;
        margin-left: -60px;
        border-radius: inherit;
        background-color: #ec366b;
        box-shadow: 0 0 15px rgba(0, 0, 0, 0.15), 0 0 3px rgba(255, 255, 255, 0.75) inset;
    }
`;

const Count = styled.span`
    width: 100%;
    color: #fff;
    height: 100%;
    padding: 50px;
    font-size: 32px;
    font-weight: 500;
    line-height: 50px;
    position: absolute;
    text-align: center;
`;

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
            const distance = timer - now + 1000;
    
            const days = Math.floor(distance / (1000 * 60 * 60 *24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            if (distance < 0) {
                clearInterval(clockInterval.current);
            } else {
                dispatch(setMinutes((days * 24 * 60) + (hours * 60) + minutes));
                dispatch(setSeconds(seconds));
            }
        }, 1000);
    }

    useEffect(() => {
        startTimer();
        
        return () => {
            // Clean up
            clearInterval(clockInterval)
        }
    });

    return (
        <ClockWrap>
            <ClockStyle>
                <Count>{minutesState} min {secondsState} sec</Count>
            </ClockStyle>
        </ClockWrap>
    );
}

export default Clock;
