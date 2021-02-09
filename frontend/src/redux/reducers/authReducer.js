import isEmpty from "../validation/is-empty";

import { SET_CURRENT_USER } from "../actions/types";


const initialState = {
    isAuthenticated: false,
    role: '',
    user: {}
}

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_CURRENT_USER: {
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload), //ako je prazan objekat nije auth user, ovo je funkcija sa bekenda koja je napravljena i na frontu
                role: action.payload.role,
                user: action.payload //user je taj payload
            }
        }
        default:
            return state;
    }
}