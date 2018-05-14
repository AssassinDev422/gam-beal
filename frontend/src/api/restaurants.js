import {post, patch, get, remove} from './util';

var _ = require('lodash');

export function getBusiness(id) {
    return get({
        path: `/businesses/${id}/`,
        json: true
    }).then(function(response) {
        return response;
    }).catch(function(error) {
        throw error.error;
    });
}

export function createBusiness(data) {
    var body = _.extend({}, data);
    return post({
        path: `/businesses/`,
        body: body,
        json: true
    }).then(function(response) {
        return response;
    }).catch(function(error) {
        throw error.error;
    });
}

export function updateBusiness(data, id) {
    var body = _.extend({}, data);

    return patch({
        path: `/businesses/${id}/`,
        body: body,
        json: true
    }).then(function(response) {
        return response;
    }).catch(function(error) {
        throw error.error;
    });
}

export function getRestaurants(opts, params) {
    var options = _.defaults(opts || {}, {});

    var params = _.defaults(params || {}, {});

    return get({
        path: "/businesses/",
        qs: params,
        json: true
    }).then(function(response) {
        return response;
    });
}

export function deleteBusiness(id, opts) {
    var options = _.defaults(opts || {}, {});

    return remove({
        path: `/businesses/${id}/`,
        json: true
    }).then(function(response) {
        return response;
    });
}