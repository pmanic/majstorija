import { GET_ALL_KATEGORIJE } from '../actions/types';

const initialState = {
    kategorije: null
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_ALL_KATEGORIJE:
            return {
                ...state,
                kategorije: action.payload,
                loading: false
            };

        default:
            return state;
    }
}
