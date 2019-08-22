import firebase from './../utils/firebase';

export const SET_USER = 'SET_USER';
export const SET_STATE_FROM_DATABASE = 'SET_STATE_FROM_DATABASE';
export const ADD_GUEST = 'ADD_GUEST';
export const DELETE_GUEST = 'DELETE_GUEST'
export const DELETE_TABLE = 'DELETE_TABLE'
export const ADD_TABLE = 'ADD_TABLE'
export const UPDATE_CAPACITY = 'UPDATE_CAPACITY'
export const ASSIGN_GUEST = 'ASSIGN_GUEST'
export const UNASSIGN_GUEST = 'UNASSIGN_GUEST'
export const REORDER_GUESTS = 'REORDER_GUESTS'
export const REFRESH = 'REFRESH'
export const LOG_IN = 'LOG_IN'

export function setUserId(text) {
    return { type: SET_USER, text: text }
}

export function setStateFromDatabase(userId, data) {
    console.log('Running setStateFromDatabase. User id:', userId)
    return { type: SET_STATE_FROM_DATABASE, userId: userId, data: data }
}

export function addGuest(text) {
    return { type: ADD_GUEST, text: text }
}

export function addGuestThunk(text, userId) {
    return (dispatch) => {
        dispatch(addGuest(text));
        console.log('addGuestThunk', firebase.database().ref('/users/' + userId + '/data/added'))
        firebase.database().ref('/users/' + userId + '/data/added').push({key: text, name: text, assignedTo: ''})
    }
}

export function deleteGuest(text) {
    return { type: DELETE_GUEST, text: text }
}

export function deleteGuestThunk(text, userId) {
    return (dispatch) => {
        dispatch(deleteGuest(text));
        let ref = firebase.database().ref('/users/' + userId + '/data/added');
        ref.once("value").then(function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
                var childData = childSnapshot.val();
                if (childData.name == text) {
                    console.log("To delete:", childSnapshot);
                    firebase.database().ref('/users/' + userId + '/data/added/' + childSnapshot.key).remove();
                }
            });
        });
    }
}

export function deleteTable(text) {
    return { type: DELETE_TABLE, text: text }
}

export function deleteTableThunk(text, userId) {
    console.log("deleteTableThunk");
    return (dispatch) => {
        dispatch(deleteTable(text));
        let refTables = firebase.database().ref('/users/' + userId + '/data/tables');
        refTables.once("value").then(function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
                var childData = childSnapshot.val();
                if (childData.key == text) {
                    console.log("To delete:", childSnapshot);
                    firebase.database().ref('/users/' + userId + '/data/tables/' + childSnapshot.key).remove();
                }
            });
        });

        let refGuests = firebase.database().ref('/users/' + userId + '/data/added');
        refGuests.once("value").then(function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
                var childData = childSnapshot.val();
                if (childData.assignedTo == text) {
                    firebase.database().ref('/users/' + userId + '/data/added/' + childSnapshot.key).update({assignedTo: ''});
                }
            });
        });
    }

    // also unassign all guests who might be assigned to this table!
}

export function addTable(name, capacity) {
    return { type: ADD_TABLE, name: name, capacity: capacity }
}

export function addTableThunk(name, capacity, userId) {
    console.log("addTableThunk");
    return (dispatch) => {
        dispatch(addTable(name, capacity));
        console.log(firebase.database().ref('/users/' + userId + '/data/tables'))
        firebase.database().ref('/users/' + userId + '/data/tables').push({key: name, capacity: capacity})
    }
}

export function updateCapacity(table, newCapacity) {
    return { type: UPDATE_CAPACITY, table: table, capacity: newCapacity }
}

export function updateCapacityThunk(table, newCapacity, userId) {
    return (dispatch) => {
        dispatch(updateCapacity(table, newCapacity));
        let ref = firebase.database().ref('/users/' + userId + '/data/tables');
        ref.once("value").then(function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
                var childData = childSnapshot.val();
                if (childData.key == table) {
                    firebase.database().ref('/users/' + userId + '/data/tables/' + childSnapshot.key).update({capacity: newCapacity});
                }
            });
        });
    }
}

export function assignGuest(guest, table) {
    return { type: ASSIGN_GUEST, guestKey: guest, tableKey: table }
}

export function assignGuestThunk(guest, table, userId) {
    console.log("assignGuestThunk");
    return (dispatch) => {
        dispatch(assignGuest(guest, table));
        let ref = firebase.database().ref('/users/' + userId + '/data/added');
        ref.once("value").then(function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
                var childData = childSnapshot.val();
                if (childData.key == guest) {
                    firebase.database().ref('/users/' + userId + '/data/added/' + childSnapshot.key).update({assignedTo: table});
                }
            });
        });
    }
}

export function unassignGuest(guest,table) {
    return { type: UNASSIGN_GUEST, guestKey: guest, tableKey: table }
}

export function unassignGuestThunk(guest, table, userId) {
    console.log("unassignGuestThunk");
    return (dispatch) => {
        dispatch(unassignGuest(guest, table));
        let ref = firebase.database().ref('/users/' + userId + '/data/added');
        ref.once("value").then(function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
                var childData = childSnapshot.val();
                if (childData.key == guest) {
                    firebase.database().ref('/users/' + userId + '/data/added/' + childSnapshot.key).update({assignedTo: ''});
                }
            });
        });
    }
}

export function reorderGuests(guests,table) {
    return { type: REORDER_GUESTS, newGuests: guests, tableKey: table }
}

export function refresh() {
    return { type: REFRESH }
}

export function logIn() {
    return { type: LOG_IN }
}
