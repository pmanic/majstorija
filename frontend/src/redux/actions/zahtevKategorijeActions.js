import axios from 'axios';

import { GET_ALL_ZAHTEVI_KATEGORIJE, ZAHTEVI_LOADING, GET_ERRORS } from './types';

//Zahtev loading
export const setZahteviLoading = () => {
    return {
        type: ZAHTEVI_LOADING
    };
};

/*-----------------------------------------------MAJSTOR-----------------------------------------------------*/

export const sendZahtev = (categoryTitle, history) => (dispatch) => {
    axios.post(`/api/zahtevkategorija/`, { params: { categoryTitle: categoryTitle } })
        .then((res) => history.push('/repairman/editprofile'))
        .catch((err) =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

/*-----------------------------------------------ADMIN-----------------------------------------------------*/

export const getAllZahteviKategorije = () => dispatch => {
    dispatch(setZahteviLoading());
    axios
        .get('/api/zahtevkategorija/allsent')
        .then(res =>
            dispatch({
                type: GET_ALL_ZAHTEVI_KATEGORIJE,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_ALL_ZAHTEVI_KATEGORIJE,
                payload: null
            }))
}

export const acceptZahtevById = (zahtevid, history) => dispatch => {
    axios
        .post(`/api/zahtevkategorija/accept/${zahtevid}`)
        .then(res => history.push('/repairman/newreq'))
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        )
}

export const declineZahtevById = (zahtevid, history) => dispatch => {
    axios
        .post(`/api/zahtevkategorija/decline/${zahtevid}`)
        .then(res => history.push('/repairman/newreq'))
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        )
}