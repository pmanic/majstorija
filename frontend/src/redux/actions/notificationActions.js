import axios from 'axios';

import { GET_ALL_NOTIFICATIONS, NOTIFICATIONS_LOADING, GET_ERRORS } from './types';

//Notifications loading
export const setNotificationsLoading = () => {
    return {
        type: NOTIFICATIONS_LOADING
    };
};

export const getAllRepairmanNotifications = () => dispatch => {
	dispatch(setNotificationsLoading());
	axios
		.get('/api/notifications/')
		.then(res =>
			dispatch({
				type: GET_ALL_NOTIFICATIONS,
				payload: res.data
			})
		)
		.catch(err =>
			dispatch({
				type: GET_ALL_NOTIFICATIONS,
				payload: null
			}))
}

export const notificationSeen = (id,history) => dispatch => {
	axios
		.put('/api/notifications/seen', {id})
		.then(res => history.push('/repairman/newreq'))
		.catch(err =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			})
		)
}