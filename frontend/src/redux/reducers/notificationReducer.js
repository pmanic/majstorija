import { GET_ALL_NOTIFICATIONS, NOTIFICATIONS_LOADING } from '../actions/types';

const initialState = {
    notifications: null,
    loading: false
};

export default function (state = initialState, action) {
    switch (action.type) {
        case NOTIFICATIONS_LOADING:
            return {
                ...state,
                loading: true
            };
        case GET_ALL_NOTIFICATIONS:
            return {
                ...state,
                notifications: action.payload,
                loading: false
            };

        default:
            return state;
    }
}
