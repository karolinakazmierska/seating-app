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

export function addGuest(text) {
    return { type: ADD_GUEST, text: text }
}

export function deleteGuest(text) {
    return { type: DELETE_GUEST, text: text }
}

export function deleteTable(text) {
    return { type: DELETE_TABLE, text: text }
}

export function addTable(name, capacity) {
    return { type: ADD_TABLE, name: name, capacity: capacity }
}

export function updateCapacity(table, newCapacity) {
    return { type: UPDATE_CAPACITY, table: table, capacity: newCapacity }
}

export function assignGuest(guest, table) {
    return { type: ASSIGN_GUEST, guestKey: guest, tableKey: table }
}

export function unassignGuest(guest,table) {
    return { type: UNASSIGN_GUEST, guestKey: guest, tableKey: table }
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
