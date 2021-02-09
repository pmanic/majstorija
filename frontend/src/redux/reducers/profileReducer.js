import { GET_USER_PROFILE, GET_USER_PROFILES, PROFILE_LOADING, CLEAR_CURRENT_PROFILE, GET_REPAIRMAN_PROFILE, GET_REPAIRMAN_PROFILES } from "../actions/types";

const initialState = {
    profile: '',
    profiles: null,
    loading: false
}

export default function (state = initialState, action) {
    switch (action.type) {
        case PROFILE_LOADING:
            return {
                ...state,
                loading: true
            };
        case GET_REPAIRMAN_PROFILE:
            return {
                ...state,
                profile: action.payload,
                loading: false
            };
        case GET_REPAIRMAN_PROFILES:
            return {
                ...state,
                profiles: action.payload,
                loading: false
            };
        case GET_USER_PROFILE:
            return {
                ...state,
                profile: action.payload,
                loading: false
            };
        case GET_USER_PROFILES:
            return {
                ...state,
                profiles: action.payload,
                loading: false
            };
        case CLEAR_CURRENT_PROFILE:
            return {
                ...state,
                profile: null
            };
        default:
            return state;
    }
}