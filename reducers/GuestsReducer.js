import { combineReducers } from 'redux';

const INITIAL_STATE = {
    current: 10,
    possible: [
        'Guest1',
        'Guest2',
        'Guest3',
        'Guest4',
    ],
};

const guestsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        default:
            return state
    }
};

export default combineReducers({
    guests: guestsReducer,
});
