import { combineReducers } from 'redux';

const INITIAL_STATE = {
    current: 10,
    added: [
        {key: 'Guest1'},
        {key: 'Guest2'},
        {key: 'Guest3'}
    ],
};

const guestsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'ADD_GUEST':
            return [
                ...state,
                {
                    key: 'Hello'
                }
            ]
        default:
            return state
    }
};

export default combineReducers({
    guests: guestsReducer,
});
