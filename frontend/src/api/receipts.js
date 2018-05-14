import {post, patch, get, remove} from './util';

var _ = require('lodash');

export function getReceipt(id) {
    return get({
        path: `/receipts/${id}/`,
        json: true
    }).then(function(response) {
        return response;
    }).catch(function(error) {
        throw error.error;
    });
}

export function createReceipt(data) {
    var body = _.extend({}, data);
    return post({
        path: `/receipts/`,
        body: body,
        json: true
    }).then(function(response) {
        return response;
    }).catch(function(error) {
        throw error.error;
    });
}

export function updateReceipt(data, id) {
    var body = _.extend({}, data);

    return patch({
        path: `/receipts/${id}/`,
        body: body,
        json: true
    }).then(function(response) {
        return response;
    }).catch(function(error) {
        throw error.error;
    });
}

export function getReceipts(opts, params) {
    var options = _.defaults(opts || {}, {});

    var params = _.defaults(params || {}, {});

    return get({
        path: "/receipts/",
        qs: params,
        json: true
    }).then(function(response) {
        return response;
    });
}

export function deleteReceipt(id, opts) {
    var options = _.defaults(opts || {}, {});

    return remove({
        path: `/receipts/${id}/`,
        json: true
    }).then(function(response) {
        return response;
    });
}