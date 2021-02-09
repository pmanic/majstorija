import axios from 'axios';

import { GET_ALL_FOR_USER, GET_ALL_FOR_REPAIRMAN, GET_ALL, ZAHTEVI_LOADING, GET_ERRORS } from './types';

//Zahtev loading
export const setZahteviLoading = () => {
	return {
		type: ZAHTEVI_LOADING
	};
};

/*-----------------------------------------------KORISNIK-----------------------------------------------------*/

export const sendZahtev = (repairmanhandle, userMessage, history) => (dispatch) => {
	axios.post(`/api/zahtevpopravka/${repairmanhandle}`, userMessage)
		.then((res) => history.push('/user/search'))
		.catch((err) =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			})
		);
};

export const rateZahtev = (id, rate, history) => (dispatch) => {
	axios.post(`/api/zahtevpopravka/oceni/${id}`, { rate })
		.then((res) => history.push('/user/history'))
		.catch((err) =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			})
		);
};

export const archiveZahtevById = (zahtevid) => dispatch => {
	axios
		.post(`/api/zahtevpopravka/archive/${zahtevid}`)
		.catch(err =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			})
		)
}

export const getAllUserZahtevi = () => dispatch => {
	dispatch(setZahteviLoading());
	axios
		.get('/api/zahtevpopravka/allforuser')
		.then(res =>
			dispatch({
				type: GET_ALL_FOR_USER,
				payload: res.data
			})
		)
		.catch(err =>
			dispatch({
				type: GET_ALL_FOR_USER,
				payload: null
			}))
}

export const getAllAcceptedUserZahtevi = () => dispatch => {
	dispatch(setZahteviLoading());
	axios
		.get('/api/zahtevpopravka/allacceptedforuser')
		.then(res =>
			dispatch({
				type: GET_ALL_FOR_USER,
				payload: res.data
			})
		)
		.catch(err =>
			dispatch({
				type: GET_ALL_FOR_USER,
				payload: null
			}))
}

export const getAllDeclinedUserZahtevi = () => dispatch => {
	dispatch(setZahteviLoading());
	axios
		.get('/api/zahtevpopravka/alldeclinedforuser')
		.then(res =>
			dispatch({
				type: GET_ALL_FOR_USER,
				payload: res.data
			})
		)
		.catch(err =>
			dispatch({
				type: GET_ALL_FOR_USER,
				payload: null
			}))
}

export const getAllArchivedUserZahtevi = () => dispatch => {
	dispatch(setZahteviLoading());
	axios
		.get('/api/zahtevpopravka/allarchivedforuser')
		.then(res =>
			dispatch({
				type: GET_ALL_FOR_USER,
				payload: res.data
			})
		)
		.catch(err =>
			dispatch({
				type: GET_ALL_FOR_USER,
				payload: null
			}))
}

export const getAllSentUserZahtevi = () => dispatch => {
	dispatch(setZahteviLoading());
	axios
		.get('/api/zahtevpopravka/allsentforuser')
		.then(res =>
			dispatch({
				type: GET_ALL_FOR_USER,
				payload: res.data
			})
		)
		.catch(err =>
			dispatch({
				type: GET_ALL_FOR_USER,
				payload: null
			}))
}

/*-----------------------------------------------MAJSTOR-----------------------------------------------------*/

export const getAllRepairmanZahtevi = () => dispatch => {
	dispatch(setZahteviLoading());
	axios
		.get('/api/zahtevpopravka/allforrepairman')
		.then(res =>
			dispatch({
				type: GET_ALL_FOR_REPAIRMAN,
				payload: res.data
			})
		)
		.catch(err =>
			dispatch({
				type: GET_ALL_FOR_REPAIRMAN,
				payload: null
			}))
}

export const getAllAcceptedRepairmanZahtevi = () => dispatch => {
	dispatch(setZahteviLoading());
	axios
		.get('/api/zahtevpopravka/allacceptedforrepairman')
		.then(res =>
			dispatch({
				type: GET_ALL_FOR_REPAIRMAN,
				payload: res.data
			})
		)
		.catch(err =>
			dispatch({
				type: GET_ALL_FOR_REPAIRMAN,
				payload: null
			}))
}

export const getAllArchivedRepairmanZahtevi = () => dispatch => {
	dispatch(setZahteviLoading());
	axios
		.get('/api/zahtevpopravka/allarchivedforrepairman')
		.then(res =>
			dispatch({
				type: GET_ALL_FOR_REPAIRMAN,
				payload: res.data
			})
		)
		.catch(err =>
			dispatch({
				type: GET_ALL_FOR_REPAIRMAN,
				payload: null
			}))
}

export const getAllRatedRepairmanZahtevi = () => dispatch => {
	dispatch(setZahteviLoading());
	axios
		.get('/api/zahtevpopravka/allratedforrepairman')
		.then(res =>
			dispatch({
				type: GET_ALL_FOR_REPAIRMAN,
				payload: res.data
			})
		)
		.catch(err =>
			dispatch({
				type: GET_ALL_FOR_REPAIRMAN,
				payload: null
			}))
}

export const acceptZahtevById = (zahtevid, poruka, history) => dispatch => {
	axios
		.post(`/api/zahtevpopravka/accept/${zahtevid}`, poruka)
		.then(res => history.push('/repairman/newreq'))
		.catch(err =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			})
		)
}

export const declineZahtevById = (zahtevid, poruka, history) => dispatch => {
	axios
		.post(`/api/zahtevpopravka/decline/${zahtevid}`, poruka)
		.then(res => history.push('/repairman/newreq'))
		.catch(err =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			})
		)
}

/*-----------------------------------------------ADMIN-----------------------------------------------------*/

export const getAllZahtevi = () => dispatch => {
	dispatch(setZahteviLoading());
	axios
		.get('/api/zahtevpopravka/all')
		.then(res =>
			dispatch({
				type: GET_ALL,
				payload: res.data
			})
		)
		.catch(err =>
			dispatch({
				type: GET_ALL,
				payload: null
			}))
}