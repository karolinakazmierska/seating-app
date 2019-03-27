export const ADD_GUEST = 'ADD_GUEST';

export function addGuest(text) {
    // console.error('dispatching')
    return { type: ADD_GUEST, text: text }
}
