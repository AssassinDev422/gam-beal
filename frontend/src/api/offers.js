import {post, patch, get, remove} from './util';

var _ = require('lodash');

export function getOffer(id) {
    return get({
        path: `/offers/${id}/`,
        json: true
    }).then(function(response) {
        return response;
    }).catch(function(error) {
        throw error.error;
    });
}

export function createOffer(data) {
    var body = _.extend({}, data);
    return post({
        path: `/offers/`,
        body: body,
        json: true
    }).then(function(response) {
        return response;
    }).catch(function(error) {
        console.log("error", error);
        throw error.error;
    });
}

export function updateOffer(data, id) {
    var body = _.extend({}, data);

    return patch({
        path: `/offers/${id}/`,
        body: body,
        json: true
    }).then(function(response) {
        return response;
    }).catch(function(error) {
        console.log(error);
        throw error.error;
    });
}

export function getOffers(opts, params) {
    var options = _.defaults(opts || {}, {});

    var params = _.defaults(params || {}, {});
    params.active = 'all';
    return get({
        path: "/offers/",
        qs: params,
        json: true
    }).then(function(response) {
        return response;
    });
}

export function deleteOffer(id, opts) {
    var options = _.defaults(opts || {}, {});

    return remove({
        path: `/offers/${id}/`,
        json: true
    }).then(function(response) {
        return response;
    });
}


export function getAnalytics(params) {
    return get({
        path: "/analytics/",
        qs: params,
        json:true
    }).then(function(response) {
        return response;
    }).catch(function(error) {
        throw error.error;
    });
}

export function sendNotification(data) {
    var body = _.extend({}, data);
    return post({
        path: "/notify/",
        body: body,
        json:true
    }).then(function(response) {
        return response;
    }).catch(function(error) {
        throw error.error;
    });
}