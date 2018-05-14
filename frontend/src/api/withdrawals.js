import {post, patch, get, remove} from './util';

var _ = require('lodash');

export function getWithdrawal(id) {
    return get({
        path: `/withdraw/${id}/`,
        json: true
    }).then(function(response) {
        return response;
    }).catch(function(error) {
        throw error.error;
    });
}

export function createWithdrawal(data) {
    var body = _.extend({}, data);
    return post({
        path: `/withdraw/`,
        body: body,
        json: true
    }).then(function(response) {
        return response;
    }).catch(function(error) {
        throw error.error;
    });
}

export function updateWithdrawal(data, id) {
    var body = _.extend({}, data);

    return patch({
        path: `/withdraw/${id}/`,
        body: body,
        json: true
    }).then(function(response) {
        return response;
    }).catch(function(error) {
        throw error.error;
    });
}

export function getWithdrawals(opts, params) {
    var options = _.defaults(opts || {}, {});

    var params = _.defaults(params || {}, {});

    return get({
        path: "/withdraw/",
        qs: params,
        json: true
    }).then(function(response) {
        return response;
    });
}

export function deleteWithdrawal(id, opts) {
    var options = _.defaults(opts || {}, {});

    return remove({
        path: `/withdraw/${id}/`,
        json: true
    }).then(function(response) {
        return response;
    });
}