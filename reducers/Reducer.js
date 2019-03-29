import { combineReducers } from 'redux';
import { ADD_GUEST, DELETE_GUEST, DELETE_TABLE, ASSIGN_GUEST, UNASSIGN_GUEST } from './../actions/actions'

const INITIAL_STATE = {
    current: 10,
    added: [
        {key: 'Guest1', assignedTo: 'TableName1'},
        {key: 'Guest2', assignedTo: 'TableName1'},
        {key: 'Guest3', assignedTo: 'TableName1'},
        {key: 'Guest4', assignedTo: ''},
        {key: 'Guest5', assignedTo: ''},
        {key: 'Guest6', assignedTo: 'TableName1'}
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
    let newState = state;
    switch (action.type) {
        case 'ADD_TABLE':
            console.log('Adding table...', action.name, action.capacity)
            return Object.assign({}, state, {
                tables: [
                    ...state.tables,
                    {key: action.name, capacity: action.capacity}
                ]
            })
            break;
        case 'DELETE_TABLE':
            // @todo: unassign all guests from this table
            console.log('Deleting...')
            newState.tables.forEach((obj, i) => {
                if (obj.key == action.text) {
                    newState.tables.splice(i, 1);
                }
            })
            console.log(newState);
            return newState;
        case 'ASSIGN_GUEST':
            console.log('Assigning...', action.guestKey, action.tableKey);
            newState.added.forEach((obj, i) => {
                if (obj.key == action.guestKey) {
                    obj.assignedTo = action.tableKey;
                }
            })
            console.log(newState);
            return newState;
        case 'UNASSIGN_GUEST':
            console.log('UNassigning...', action.guestKey, action.tableKey);
            newState.added.forEach((obj, i) => {
                if (obj.key == action.guestKey) {
                    obj.assignedTo = '';
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
