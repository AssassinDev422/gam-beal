import {BACKEND_BASE, AUTH_HEADER} from './config';
var _ = require("lodash");
var request = require("request-promise");

import store from '../store/store';

import {logout} from '../actions/auth';

export function getUrl(path) {
	return BACKEND_BASE + path;
}

function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie != '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            if (cookie.substring(0, name.length + 1) == (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

export function fetch(opts) {
	const state = store.getState();
	const dispatch = store.dispatch;

	const options = _.defaults(opts, {
		uri: getUrl(opts.path),
		method: "GET",
		json: true,
		headers: {},
		api_autoparse: true
	});

	if (state.auth.logged_in) {
		options.headers["Authorization"] = `Token ${state.auth.token.access_token}`;
	}

	return request(options)
		.then(function(response) {
			return response;
		})
		.catch(function(error) {
			if (error.statusCode === 401 || error.statusCode === 403) {
				dispatch(logout());
			} else {
				throw error;
			}
		});
}

export function get(opts) {
	return fetch(_.extend(opts, {
		method: "GET"
	}));
}

export function post(opts) {
	return fetch(_.extend(opts, {
		method: "POST",
		headers: { 'X-CSRFToken': getCookie('csrftoken') }
	}));
}

export function patch(opts) {
	return fetch(_.extend(opts, {
		method: "PATCH",
		headers: { 'X-CSRFToken': getCookie('csrftoken') }
	}));
}

export function remove(opts) {
	return fetch(_.extend(opts, {
		method: "DELETE",
		headers: { 'X-CSRFToken': getCookie('csrftoken') }
	}));
}