import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { setTimer } from '../../redux/actions/clock';

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

function Clock(props) {
    const timer = useSelector(state => state.clock.timer);
    const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [pie, setPie] = useState(100 / 60);
    const [backgroundImage, setBackgroundImage] = useState('');
    const dispatch = useDispatch();

    let clockInterval = useRef();

    const startTimer = () => {
        if (!timer) return;
    
        clockInterval = setInterval(() => {
            if (seconds === 0) {
                clearInterval(clockInterval.current);
                dispatch(setTimer(0));
                setBackgroundImage('none');
                setPie(100/60);
            } else {
                setSeconds(sec => sec - 1);
                setMinutes(Math.floor(seconds/60));

                if (pie >= 101) {
                    setPie(100/60);
                } else {
                    setPie(prePie => prePie + (100 / 60));
                }
                console.log(pie + '__' + seconds);

                let step = 1;
                let loops = Math.round(100 / step);
                let increment = 360 / loops;
                let half = Math.round(loops / 2);
                let i = (pie.toFixed(3).slice(0, -3)) - 1;
                console.log(i);
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
        setSeconds(timer * 60);
        setMinutes(timer);
    }, [timer]);

    useEffect(() => {
        startTimer();
        
        return () => {
            // Clean up
            clearInterval(clockInterval);
            dispatch(setTimer(0));
        }
    });

    return (
        <ClockWrap>
            <ClockStyle backgroundImage={backgroundImage}>
                <Count seconds={seconds}
                    minutes={minutes}
                >
                    {minutes > 0 ? minutes : seconds}
                </Count>
            </ClockStyle>
        </ClockWrap>
    );
}

export default Clock;
