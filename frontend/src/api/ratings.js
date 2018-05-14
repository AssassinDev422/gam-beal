import {post, patch, get, remove} from './util';

var _ = require('lodash');

export function getRating(id) {
    return get({
        path: `/ratings/${id}/`,
        json: true
    }).then(function(response) {
        return response;
    }).catch(function(error) {
        throw error.error;
    });
}

export function createRating(data) {
    var body = _.extend({}, data);
    return post({
        path: `/ratings/`,
        body: body,
        json: true
    }).then(function(response) {
        return response;
    }).catch(function(error) {
        console.log("error", error);
        throw error.error;
    });
}

export function updateRating(data, id) {
    var body = _.extend({}, data);

    return patch({
        path: `/ratings/${id}/`,
        body: body,
        json: true
    }).then(function(response) {
        return response;
    }).catch(function(error) {
        throw error.error;
    });
}

export function getRatings(opts, params) {
    var options = _.defaults(opts || {}, {});

    var params = _.defaults(params || {}, {});

    return get({
        path: "/ratings/",
        qs: params,
        json: true
    }).then(function(response) {
        return response;
    });
}

export function deleteRating(id, opts) {
    var options = _.defaults(opts || {}, {});

    return remove({
        path: `/ratings/${id}/`,
        json: true
    }).then(function(response) {
        return response;
    });
}