function loggedIn(email) {
	return {
		type: "LOGGED_IN",
		email: email
	};
}

function loggedOut() {
	return {
		type: "LOGGED_OUT"
	};
}

function receiveAuthToken(data) {
	return {
		type: "RECEIVE_AUTH_TOKEN",
		access_token: data.auth_token
	};
}

export function login(email, data) {
	return function(dispatch) {
		dispatch(loggedIn(email));
		dispatch(receiveAuthToken(data));
	};
}

export function logout(data) {
	return function(dispatch) {
		console.log('LOGOUT');
		dispatch(loggedOut());
	};
}

export function getMe(data) {
	return {
		type: "GET_ME"
	};
}

export function receiveCurrentUser(data) {
	return {
		type: "RECEIVE_CURRENT_USER",
		data: data
	};
}

export function loginThen(pathname) {
	return {
		type: "LOGIN_THEN",
		after_login: {
			path: pathname
		}
	};
}
