import PropTypes from 'prop-types';
import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { setTimer } from '../../redux/actions/clock';

const Action = styled.div`
    margin: auto;
    max-width: 200px;
`;

const Input = styled.div`
    margin-top: 30px;
    position: relative;
`;

const NumInput = styled.input`
    width: 100%;
    border: none;
    padding: 12px;
    border-radius: 60px;
`;

const BtnInput = styled.input`
    top: 0;
    right: 0;
    color: #fff;
    border: none;
    border: none;
    padding: 12px;
    position: absolute;
    border-radius: 60px;
    background-color: #ec366b;
    text-transform: uppercase;
`;

InputForm.propTypes = {
    onSubmit: PropTypes.func,
};

InputForm.defaultProps = {
    onSubmit: null,
};

function InputForm(props) {
    const { onSubmit } = props;
    const timer = useSelector(state => state.clock.timer);
    const [value, setValue] = useState(1);
    const dispatch = useDispatch();

    function handleSubmit(e) {
        e.preventDefault();

        console.log(timer);
        if (!timer) {
            onSubmit({minutes: 1});
        } else {
            onSubmit({minutes: parseInt(value)});
        }

        dispatch(setTimer(value));
    }

    return (
        <Action>
            <Input>
                <form onSubmit={handleSubmit}>
                    <NumInput
                        type="number"
                        min="1"
                        placeholder="Enter Minute"
                        onChange={e => setValue(e.target.value)}/>
                    <BtnInput type="submit" value="Submit" />
                </form>
            </Input>
        </Action>
    );
}

export default InputForm;