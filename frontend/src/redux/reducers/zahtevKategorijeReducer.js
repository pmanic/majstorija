import { GET_ALL_ZAHTEVI_KATEGORIJE, ZAHTEVI_LOADING } from '../actions/types';

const initialState = {
    zahteviKategorije: null,
    loading: false
};

export default function (state = initialState, action) {
    switch (action.type) {
        case ZAHTEVI_LOADING:
            return {
                ...state,
                loading: true
            };
        case GET_ALL_ZAHTEVI_KATEGORIJE:
            return {
                ...state,
                zahteviKategorije: action.payload,
                loading: false
            };

        default:
            return state;
    }
}
