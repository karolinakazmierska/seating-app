import { combineReducers } from 'redux';
import { ADD_GUEST, DELETE_GUEST, DELETE_TABLE, ASSIGN_GUEST, UNASSIGN_GUEST, REORDER_GUESTS } from './../actions/actions'

const INITIAL_STATE = {
    current: 10,
    added: [
        {key: 'Marta', name: 'Marta', assignedTo: 'Paris'},
        {key: 'Anna', name: 'Anna', assignedTo: 'Paris'},
        {key: 'Pancho', name: 'Pancho', assignedTo: 'Paris'},
        {key: 'Guillermo', name: 'Guillermo', assignedTo: ''},
        {key: 'Adam', name: 'Adam', assignedTo: ''},
        {key: 'Ewa', name: 'Ewa', assignedTo: ''}
    ],
    tables: [
        {
            key: 'Paris',
            capacity: 10
        },
        {
            key: 'Rome',
            capacity: 12
        },
        {
            key: 'Moscow',
            capacity: 12
        },
        {
            key: 'Warsaw',
            capacity: 10
        }
    ]
};

const guestsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'ADD_GUEST':
        console.log('ADD_GUEST', Object.assign({}, state, {
            added: [
                ...state.added,
                {key: action.text, name: action.text, assignedTo: ''}
            ]
        }))
            return Object.assign({}, state, {
                added: [
                    ...state.added,
                    {key: action.text, name: action.text, assignedTo: ''}
                ]
            })
        case 'DELETE_GUEST':
            console.log('Deleting...')
            let newState = state;
            newState.added.forEach((obj, i) => {
                if (obj.name == action.text) {
                    newState.added.splice(i, 1);
                }
            })
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
            return newState;
        case 'ASSIGN_GUEST':
            console.log('ASSIGN_GUEST: state before assigning guest', newState)
            console.log('Assigning...', action.guestKey, action.tableKey);
            let counter = 0;
            newState.added.forEach((obj, i) => {
                if (obj.name == action.guestKey) {
                    obj.assignedTo = action.tableKey;
                }
            })
            console.log(newState)
            return newState;
        case 'UNASSIGN_GUEST':
            console.log('UNassigning...', action.guestKey, action.tableKey);
            newState.added.forEach((obj, i) => {
                if (obj.name == action.guestKey) {
                    obj.assignedTo = '';
                }
            })
            return newState;
        case 'REORDER_GUESTS':
            console.log('REORDERING GUESTS');
            let arrAssigned = [];
            let arrNotAssigned = [];
            newState.added.forEach(obj => {
                if (obj.assignedTo == action.tableKey) {
                    arrAssigned.push(obj);
                } else {
                    arrNotAssigned.push(obj);
                }
            });
            newState.added = action.newGuests.data.concat(arrNotAssigned);
            return newState;
        default:
            return state
    }
}

export default combineReducers({
    guests: guestsReducer,
    tables: tablesReducer
});
