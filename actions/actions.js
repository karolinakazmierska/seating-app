export const ADD_GUEST = 'ADD_GUEST';
export const DELETE_GUEST = 'DELETE_GUEST'
export const DELETE_TABLE = 'DELETE_TABLE'
export const ADD_TABLE = 'ADD_TABLE'
export const ASSIGN_GUEST = 'ASSIGN_GUEST'
export const UNASSIGN_GUEST = 'UNASSIGN_GUEST'
export const REORDER_GUESTS = 'REORDER_GUESTS'

export function addGuest(text) {
    return { type: ADD_GUEST, text: text }
}

export function deleteGuest(text) {
    return { type: DELETE_GUEST, text: text }
}

export function deleteTable(text) {
    return { type: DELETE_TABLE, text: text }
}

export function addTable(name,capacity) {
    return { type: ADD_TABLE, name: name, capacity: capacity }
}

export function assignGuest(guest,table) {
    return { type: ASSIGN_GUEST, guestKey: guest, tableKey: table }
}

export function unassignGuest(guest,table) {
    return { type: UNASSIGN_GUEST, guestKey: guest, tableKey: table }
}

export function reorderGuests(guests,table) {
    return { type: REORDER_GUESTS, newGuests: guests, tableKey: table }
}
