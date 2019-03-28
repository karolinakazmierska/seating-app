import { combineReducers } from 'redux';
import { ADD_GUEST, DELETE_GUEST, DELETE_TABLE } from './../actions/actions'

const INITIAL_STATE = {
    current: 10,
    added: [
        {key: 'Guest1'},
        {key: 'Guest2'},
        {key: 'Guest3'}
    ],
    tables: [
        {
            key: 'TableName1',
            capacity: 10
        },
        {
            key: 'TableName2',
            capacity: 12
        },
        {
            key: 'TableName3',
            capacity: 12
        },
        {
            key: 'TableName4',
            capacity: 10
        }
    ]
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

const tablesReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'ADD_TABLE':
            console.log(action)
            break;
        case 'DELETE_TABLE':
            console.log('Deleting...')
            let newState = state;
            newState.tables.forEach((obj, i) => {
                if (obj.key == action.text) {
                    newState.tables.splice(i, 1);
                }
            })
            console.log(newState);
            return newState;
        default:
            return state
    }
}

export default combineReducers({
    guests: guestsReducer,
    tables: tablesReducer
});
