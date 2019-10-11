import { combineReducers } from 'redux';
import {  ADD_GUEST, DELETE_GUEST, DELETE_TABLE, ASSIGN_GUEST, UNASSIGN_GUEST, REORDER_GUESTS, REFRESH } from './../actions/actions';

const INITIAL_STATE = {
    userId: '',
    loggedIn: false,
    added: [],
    tables: []
};

const myReducer = (state = INITIAL_STATE, action) => {
    let newState;
    switch (action.type) {
        case 'SET_USER':
            return Object.assign({}, state, {
                userId: action.text
            })
        case 'SET_STATE_FROM_DATABASE':
            newState = state;
            newState.userId = action.userId;
            newState.added = [];
            newState.tables = [];
            if (action.data.data) { // if a user is new and has no data yet
                console.log("*** The user has some data already")
                console.log(action.data.data.added);
                console.log(action.data.data.tables);
                for (item in action.data.data.added) {
                    newState.added.push(action.data.data.added[item])
                }
                for (item in action.data.data.tables) {
                    newState.tables.push(action.data.data.tables[item])
                }
            }
            return newState;
        case 'ADD_GUEST':
            return Object.assign({}, state, {
                added: [
                    ...state.added,
                    {key: action.text, name: action.text, assignedTo: ''}
                ]
            })
        case 'DELETE_GUEST':
            console.log('Deleting...')
            newState = state;
            newState.added.forEach((obj, i) => {
                if (obj.name == action.text) {
                    newState.added.splice(i, 1);
                }
            })
            return newState;
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
            console.log('Deleting...');
            newState = state;
            newState.tables.forEach((obj, i) => {
                if (obj.key == action.text) {
                    newState.tables.splice(i, 1);
                }
            })
            newState.added.forEach(obj => {
                if (obj.assignedTo == action.text) {
                    obj.assignedTo = '';
                }
            })
            return newState;
        case 'UPDATE_CAPACITY':
            console.log('Updating capacity...');
            newState = state;
            newState.tables.forEach((obj, i) => {
                if (obj.key == action.table) {
                    obj.capacity = action.capacity;
                }
            })
            return newState;
        case 'ASSIGN_GUEST':
            newState = state;
            console.log('ASSIGN_GUEST: state before assigning guest', newState) // undefined
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
            newState = state;
            newState.added.forEach((obj, i) => {
                if (obj.name == action.guestKey) {
                    obj.assignedTo = '';
                }
            })
            return newState;
        case 'REORDER_GUESTS':
            console.log('REORDERING GUESTS');
            newState = state;
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
        case 'REFRESH':
            let stateCopy = state;
            return stateCopy;
        case 'LOG_IN':
            return Object.assign({}, state, {
                loggedIn: true
            })
        default:
            return state
    }
}

export default combineReducers({
    guests: myReducer
});
