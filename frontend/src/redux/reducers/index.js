import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import profileReducer from './profileReducer';
import zahtevReducer from './zahtevReducer';
import zahtevKategorijeReducer from './zahtevKategorijeReducer';
import categoriesReducer from './categoriesReducer';
import notificationReducer from './notificationReducer';

export default combineReducers({
	auth: authReducer,
	errors: errorReducer,
	profile: profileReducer,
	zahtevi: zahtevReducer,
	zahteviKategorije: zahtevKategorijeReducer,
	kategorije: categoriesReducer,
	notifications: notificationReducer
});
