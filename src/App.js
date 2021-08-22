import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import Clock from './components/Clock';
import InputForm from './components/InputForm';
import { setTimer } from './redux/actions/clock';

function App() {
    const timer = useSelector(state => state.clock.timer);
    const dispatch = useDispatch();

    function handleFormSubmit(formValue) {
        const action = setTimer(formValue.minutes);
        dispatch(action);
    }

    return (
        <div>
            <Clock timer={parseInt(timer)}></Clock>
            <InputForm onSubmit={handleFormSubmit}></InputForm>
        </div>
    );
}

export default App;
