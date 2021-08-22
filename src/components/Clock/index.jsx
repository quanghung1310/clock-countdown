import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { updatePie } from '../../redux/actions/animation';
import { setMinutes, setSeconds } from '../../redux/actions/clock';

const barColor = '#ec366b';
const backColor = '#feeff4';

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
    background-image: ${props => props.backgroundImage};

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

    &:after {
        width:100%;
        display:block;
        font-size:18px;
        font-weight:300;
        line-height:18px;
        text-align:center;
        position:relative;
        content: '${props => (props.minutes > 0 ? 'min' : (props.seconds > 0 ? 'sec' : ''))}';
    }
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
    const valueInput = useSelector(state => state.clock.valueInput);
    const pie = useSelector(state => state.animation.pie);
    const [backgroundImage, setBackgroundImage] = useState('');
    const dispatch = useDispatch();

    let clockInterval = useRef();

    const lop = valueInput * 60;

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
                setBackgroundImage('none');
            } else {
                dispatch(setMinutes((days * 24 * 60) + (hours * 60) + minutes));
                dispatch(setSeconds(seconds));

                let newPie;
                if (minutes > 1) {
                    newPie = pie + (100 / (lop/valueInput));
                } else {
                    newPie = pie + (100 / lop);
                }
                if (pie >= 101) {
                    newPie = 1;
                }

                dispatch(updatePie(newPie));

                let step = 1;
                let loops = Math.round(100 / step);
                let increment = 360 / loops;
                let half = Math.round(loops / 2);
                let i = (pie.toFixed(2).slice(0, -3));
                if (i < half) {
                    let nextdeg = (90 + (increment * i)) + 'deg';
                    setBackgroundImage('linear-gradient(90deg,' + backColor + ' 50%,transparent 50%,transparent),linear-gradient(' + nextdeg + ',' + barColor + ' 50%,' + backColor + ' 50%,' + backColor + ')');
                } else {
                    let nextdeg = (-90 + (increment * (i - half))) + 'deg';
                    setBackgroundImage('linear-gradient(' + nextdeg + ',' + barColor + ' 50%,transparent 50%,transparent),linear-gradient(270deg,' + barColor + ' 50%,' + backColor + ' 50%,' + backColor + ')');
                }
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
            <ClockStyle backgroundImage={backgroundImage}>
                <Count seconds={secondsState}
                    minutes={minutesState}
                >
                    {minutesState > 0 ? minutesState : secondsState}
                </Count>
            </ClockStyle>
        </ClockWrap>
    );
}

export default Clock;
