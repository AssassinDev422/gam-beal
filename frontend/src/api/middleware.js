var _ = require("lodash");

import * as actions from '../actions/api';
import * as userActions from '../actions/users';
import * as authActions from '../actions/auth';
import * as busActions from '../actions/businesses';
import * as offActions from '../actions/offers';
import * as recActions from '../actions/receipts';
import * as ratingActions from '../actions/ratings';
import * as withActions from '../actions/withdrawals';

import {getUser, getMe, submitMe, getUsers, deleteUser} from './users';
import {getBusiness, updateBusiness, createBusiness, getRestaurants, deleteBusiness} from './restaurants';
import {getOffer, updateOffer, createOffer, getOffers, deleteOffer, getAnalytics} from './offers';
import {getReceipt, updateReceipt, createReceipt, getReceipts, deleteReceipt} from './receipts';
import {getRating, updateRating, createRating, getRatings, deleteRating} from './ratings';
import {getWithdrawal, updateWithdrawal, createWithdrawal, getWithdrawals, deleteWithdrawal} from './withdrawals';

const apiMiddleware = store => next => action => {
    let dispatch = store.dispatch;
    let state = store.getState();
    let queryObj = {'limit': action.limit, 'offset': action.offset};
    let requestId = action.type;

    switch (action.type) {
        case "GET_USER":
            if (!state.users.users[action.user] && !state.users.fetching_users[action.user]) {
                dispatch(userActions.fetchingUser(action.user));
                getUser(action.user, {}).then((response) => {
                    dispatch(userActions.receiveUser(response));
                });
            }
            return next(action);

        case "GET_ME":
            getMe({}).then((response) => {
                dispatch(userActions.receiveUser(response));
                dispatch(authActions.receiveCurrentUser(response));
            });

            return next(action);


        case "CLEARING_CHECKED":
            _.map(action.users, (user, i) => {
                deleteUser(user.id);
            });
            dispatch(userActions.getUsers(6, 0, ""));

            return next(action);
        case "GET_USERS":
            queryObj = {'limit': action.limit, 'offset': action.offset};
            if(action.query && action.query!=="")
                queryObj.query = action.query;
            if(state.users.currentOrdering && state.users.currentOrdering!=="")
                queryObj.sortBy = state.users.currentOrdering;
            getUsers({}, queryObj).then((response) => {
                dispatch(userActions.receiveUsers(action.limit, action.offset, response));
            });
            return next(action);
        case "SUBMIT_ME":
            submitMe({}).then((response) => {
                dispatch(userActions.receiveUser(response));
                dispatch(authActions.receiveCurrentUser(response));
            });
        case "LOAD_INITIAL_DATA":
            next(actions.loadingInitialData());
            if (state.auth.logged_in) {
                dispatch(authActions.getMe());
            }
            return next(action);
        case "LOGGED_IN":
            // give time for auth to propagate
            setTimeout(() => {
                dispatch(authActions.getMe());
            }, 1);
            return next(action);
        case "GET_BUSINESS":
            getBusiness(action.business).then((response) => {
                dispatch(busActions.receiveBusiness(response));
            });
            return next(action);  
        case "CLEARING_BUSINESS_CHECKED":
            _.map(action.businesses, (business, i) => {
                deleteBusiness(business.id);
            });
            dispatch(busActions.getBusinesses(6, 0, ""));
            return next(action);
        case "GET_BUSINESSES":
            queryObj = {'limit': action.limit, 'offset': action.offset};
            if(action.query && action.query!=="")
                queryObj.query = action.query;
            if(state.businesses.currentOrdering && state.businesses.currentOrdering!=="")
                queryObj.sortBy = state.businesses.currentOrdering;
            getRestaurants({}, queryObj).then((response) => {
                dispatch(busActions.receiveBusinesses(action.limit, action.offset, response));
            });
            return next(action);   
        case "GET_ALL_BUSINESSES":
            getRestaurants({}, {}).then((response) => {
                dispatch(busActions.receiveBusinesses(6, 0, response));
            });
            return next(action);   
        case "CREATE_BUSINESS":
            createBusiness(action.data);
            dispatch(busActions.getBusinesses(6, 0, ""));
            return next(action);
        case "GET_OFFER":
            if (!state.offers.offers[action.offer] && !state.offers.fetching_offers[action.offers]) {
                dispatch(offActions.fetchingOffer(action.offer));
                getOffer(action.offer, {}).then((response) => {
                    dispatch(offActions.receiveOffer(response));
                });
            }
            return next(action);
        case "CLEARING_OFFER_CHECKED":
            _.map(action.offers, (offer, i) => {
                deleteOffer(offer.id);
            });
            dispatch(offActions.getOffers( 6, 0, ""));
            return next(action);
        case "GET_OFFERS":
            queryObj = {'limit': action.limit, 'offset': action.offset};
            if(action.query && action.query!=="")
                queryObj.query = action.query;
            if(state.offers.currentOrdering && state.offers.currentOrdering!=="")
                queryObj.sortBy = state.offers.currentOrdering;
            getOffers({}, queryObj).then((response) => {
                dispatch(offActions.receiveOffers(action.limit, action.offset, response));
            });
            return next(action);   
        case "UPDATE_OFFER":
            updateOffer({featured: action.status}, action.offer).then(response=>{
                dispatch(offActions.getOffers(6, state.offers.currentPage*6, ""));
            }).catch(error=>{
                alert(error.featured[0]);
            });
            return next(action);
        case "CREATE_OFFER":
            createOffer(action.data);
            dispatch(recActions.getOffers(6,  0, ""));
            return next(action);
        case "GET_OFFER":
            if (!state.receipts.receipts[action.receipt] && !state.receipts.fetching_receipts[action.receipts]) {
                dispatch(recActions.fetchingReceipt(action.receipt));
                getReceipt(action.receipt, {}).then((response) => {
                    dispatch(recActions.receiveReceipt(response));
                });
            }
            return next(action);
        case "CLEARING_RECEIPT_CHECKED":
            _.map(action.receipt, (receipt, i) => {
                deleteReceipt(receipt.id);
            });
            dispatch(recActions.getReceipts(6, 0, ""));
            return next(action);
        case "GET_RECEIPTS":
            queryObj = {'limit': action.limit, 'offset': action.offset};
            if(action.query && action.query!=="")
                queryObj.query = action.query;
            if(state.receipts.currentOrdering && state.receipts.currentOrdering!=="")
                queryObj.sortBy = state.receipts.currentOrdering;
            getReceipts({}, queryObj).then((response) => {
                dispatch(recActions.receiveReceipts(action.limit, action.offset, response));
            });
            return next(action);   
        case "CREATE_RECEIPT":
            createReceipt(action.data);
            dispatch(recActions.getReceipts(6, 0, ""));
            return next(action);
        case "UPDATE_RECEIPT":
            updateReceipt({status: action.status}, action.receipt);
            dispatch(recActions.getReceipts(6, 6*state.receipts.currentPage, ""));
            return next(action);
        case "GET_RECEIPT":
            getReceipt(action.receipt).then((response) => {
                dispatch(recActions.receiveReceipt(response));
            });
            return next(action); 
        case "CLEARING_WITHDRAWAL_CHECKED":
            _.map(action.withdrawals, (withdrawal, i) => {
                deleteWithdrawal(withdrawal.id);
            });
            dispatch(withActions.getWithdrawals(6, 0, ""));
            return next(action);
        case "GET_WITHDRAWALS":
            queryObj = {'limit': action.limit, 'offset': action.offset};
            if(action.query && action.query!=="")
                queryObj.query = action.query;
            if(state.withdrawals.currentOrdering && state.withdrawals.currentOrdering!=="")
                queryObj.sortBy = state.withdrawals.currentOrdering;
            getWithdrawals({}, queryObj).then((response) => {
                dispatch(withActions.receiveWithdrawals(action.limit, action.offset, response));
            });
            return next(action);   
        case "CREATE_WITHDRAWAL":
            createWithdrawal(action.data);
            dispatch(withActions.getWithdrawals(6, 0, ""));
            return next(action);
        case "UPDATE_WITHDRAWAL":
            updateWithdrawal({status: action.status}, action.withdrawal);
            dispatch(withActions.getWithdrawals(6, 6*state.withdrawals.currentPage, ""));
            return next(action);
        case "GET_WITHDRAWAL":
            getWithdrawal(action.withdrawal).then((response) => {
                dispatch(withActions.receiveWithdrawal(response));
            });
            return next(action); 
        case "CLEARING_RATING_CHECKED":
            _.map(action.ratings, (rating, i) => {
                deleteRating(rating.id);
            });
            dispatch(ratingActions.getRatings(6, 0));
            return next(action);
        case "GET_RATINGS":
            queryObj = {'limit': action.limit, 'offset': action.offset};
            if(action.query && action.query!=="")
                queryObj.query = action.query;
            if(state.ratings.currentOrdering && state.ratings.currentOrdering!=="")
                queryObj.sortBy = state.ratings.currentOrdering;
            getRatings({}, queryObj).then((response) => {
                dispatch(ratingActions.receiveRatings(action.limit, action.offset, response));
            });
            return next(action);  
        case "GET_RATING":
            if (!state.ratings.ratings[action.rating] && !state.rating.fetching_ratings[action.ratings]) {
                dispatch(ratingActions.fetchingRating(action.rating));
                getRating(action.rating, {}).then((response) => {
                    dispatch(ratingActions.receiveRating(response));
                });
            }
            return next(action);

        case "GET_ANALYTICS":
            getAnalytics({range: action.query}).then(data=>{
                dispatch(actions.receiveAnalytics(data));
            })
            return next(action);
        default:
            return next(action);
    }
};

export default apiMiddleware;
