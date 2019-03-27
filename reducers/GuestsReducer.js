import { combineReducers } from 'redux';
import { ADD_GUEST } from './../actions/actions'

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
            return Object.assign({}, state, {
                added: [
                    ...state.added,
                    {key: action.text}
                ]
            })
        default:
            return state
    }
};

export default combineReducers({
    guests: guestsReducer,
});
