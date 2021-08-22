import PropTypes from 'prop-types';
import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTimer } from '../../redux/actions/clock';

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
        <div className="action">
            <div className="input">
                <form onSubmit={handleSubmit}>
                    <input className="input-num"
                        type="number"
                        min="1"
                        placeholder="Enter Minute"
                        onChange={e => setValue(e.target.value)}/>
                    <input className="input-btn" type="submit" value="Submit" />
                </form>
            </div>
        </div>
    );
}

export default InputForm;