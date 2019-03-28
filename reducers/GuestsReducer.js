import { combineReducers } from 'redux';
import { ADD_GUEST, DELETE_GUEST } from './../actions/actions'

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
        case 'DELETE_GUEST':
            console.log('Deleting...')
            let newState = state;
            newState.added.forEach((obj, i) => {
                if (obj.key == action.text) {
                    newState.added.splice(i, 1);
                }
            })
            console.log(newState);
            return newState;
        default:
            return state
    }
};

export default combineReducers({
    guests: guestsReducer,
});
