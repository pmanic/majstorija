import axios from 'axios';

import { GET_ALL_KATEGORIJE } from './types';

export const getAllKategorije = () => dispatch => {
    axios
        .get('/api/zahtevkategorija/allcategories')
        .then(res =>
            dispatch({
                type: GET_ALL_KATEGORIJE,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_ALL_KATEGORIJE,
                payload: null
            }))
}

