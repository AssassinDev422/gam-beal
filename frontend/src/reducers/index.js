import { combineReducers } from 'redux';
import auth from './auth';
import users from './users';
import general from './general';
import businesses from './businesses';
import offers from './offers';
import receipts from './receipts';
import withdrawals from './withdrawals';
import ratings from './ratings';
import {reducer as formReducer} from 'redux-form';

const rootReducer = combineReducers({
	auth,
	users,
	general,
    businesses,
    offers,
    receipts,
    ratings,
    withdrawals,
    form: formReducer
});

export default rootReducer;
