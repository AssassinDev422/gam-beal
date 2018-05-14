import {actionTypes} from 'redux-resource';

import history from '../router/history';

const authMiddleware = store => next => action => {
	const state = store.getState();
	switch (action.type) {
		case actionTypes.request:
			if (state.auth.logged_in) {
				let token = state.auth.token.access_token;
				return next({
					...action,
					options: {
						...action.options,
						headers: {
							...action.options.headers,
							"Authorization": `Token ${token}`
						}
					}
				});
			} else {
				return next(action);
			}
		case "LOGGED_IN":
			// propogate auth status before redirecting
			setTimeout(() => {
				if (state.auth.after_login) {
					history.pushState({}, state.auth.after_login.path);
				} else {
					history.pushState({}, "/home");
				}
			}, 1);
			return next(action);
		case "LOGGED_OUT":
			history.pushState({}, "/login");
			return next(action);
		case "LOGIN_THEN":
			history.pushState({}, "/login");
			return next(action);
		default:
			return next(action);
	}
};

export default authMiddleware;
