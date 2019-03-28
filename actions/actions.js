export const ADD_GUEST = 'ADD_GUEST';
export const DELETE_GUEST = 'DELETE_GUEST'
export const DELETE_TABLE = 'DELETE_TABLE'

export function addGuest(text) {
    return { type: ADD_GUEST, text: text }
}

export function deleteGuest(text) {
    return { type: DELETE_GUEST, text: text }
}

export function deleteTable(text) {
    return { type: DELETE_TABLE, text: text }
}
