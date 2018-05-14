import {post} from './util';

export function forgotPassword(email) {
	return post({
		path: "/auth/password/reset/",
		api_autoparse: false,
		json: true,
		body: {
			email: email
		}
	}).then(function(response) {
		return response;
	}).catch(function(error) {
		throw error.error;
	});
}

export function forgotPasswordReset(data) {
	return post({
		path: "/auth/password/reset/confirm/",
		api_autoparse: false,
		json: true,
		body: data
	}).then(function(response) {
		return response;
	}).catch(function(error) {
		throw error.error;
	});
}

export function login(data) {
	return post({
		path: "/auth/login/",
		api_autoparse: false,
		json: true,
		body: {
			email: data.email,
			password: data.password
		}
	}).then(function(response) {
		console.log("response",response);
		return response;
	}).catch(function(error) {
		console.log("error",error);
		throw error.error;
	});
}

export function register(data) {
	console.log('register', data);
	return post({
		path: "/auth/register/",
		api_autoparse: false,
		body: data,
		json: true
	}).then(function(response) {
		return response;
	}).catch(function(error) {
		throw error.error;
	});
}

export function logout(data) {
	return post({
		path: "/auth/logout/",
		api_autoparse: false,
		json:true
	}).then(function(response) {
		location.reload();
		return response;
	}).catch(function(error) {
		throw error.error;
	});
}
