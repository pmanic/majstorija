import { GET_ALL_FOR_USER, GET_ALL_FOR_REPAIRMAN, GET_ALL, ZAHTEVI_LOADING } from '../actions/types';

const initialState = {
	zahtevi: null,
	loading: false
};

export default function(state = initialState, action) {
	switch (action.type) {
		case ZAHTEVI_LOADING:
			return {
				...state,
				loading: true
			};
		case GET_ALL_FOR_USER:
			return {
				...state,
				zahtevi: action.payload,
				loading: false
			};
		case GET_ALL_FOR_REPAIRMAN:
			return {
				...state,
				zahtevi: action.payload,
				loading: false
			};
		case GET_ALL:
			return {
				...state,
				zahtevi: action.payload,
				loading: false
			};

		default:
			return state;
	}
}
