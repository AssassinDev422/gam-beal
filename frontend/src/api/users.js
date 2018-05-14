import {post, patch, get, remove} from './util';

var _ = require('lodash');

export function getMe(opts) {
	var options = _.defaults(opts || {}, {});

	return get({
		path: "/auth/me/",
	}).then(function(response) {
		return response;
	});
}

export function getUser(id) {
    return get({
        path: `/users/${id}/`,
        json: true
    }).then(function(response) {
        return response;
    }).catch(function(error) {
        throw error.error;
    });
}

export function updateUser(data,id){
	var body = _.extend({}, data);

	return patch({
		path: `/users/${id}/`,
		body: body,
		json: true
	}).then(function(response) {
		return response;
	}).catch(function(error) {
		throw error.error;
	});
}

export function updateMe(data) {
	var body = _.extend({}, data);

	return patch({
		path: '/auth/me/',
		body: body,
		json: true
	}).then(function(response) {
		return response;
	}).catch(function(error) {
		throw error.error;
	});
}

export function getUsers(opts, params) {
	var options = _.defaults(opts || {}, {});

	var params = _.defaults(params || {}, {});
	return get({
		path: "/users/",
		qs: params,
		json: true
	}).then(function(response) {
		return response;
	});
}

export function deleteUser(id, opts) {
	var options = _.defaults(opts || {}, {});

	return remove({
		path: `/users/${id}/`,
		json: true
	}).then(function(response) {
		return response;
	});
}