var _ = require("lodash");

import * as actions from '../actions/offers';
import * as offersAPI from '../api/offers';

const initial_state = {
    offers: {},
    offer: {},
    selected_offers: {},
    fetching_offers: {},
    currentPage: 0,
    pageCount: 0,
    currentOrdering: null
};

export default function offers(state = initial_state, action) {
    switch (action.type) {
        case "FETCHING_OFFER":
            return _.extend({}, state, {
                fetching_offers: _.extend({}, state.fetching_offers, {
                    [action.offer]: true
                })
            });
            return next(action);
        case "TOGGLE_OFFER_SELECT":
            if(_.find(state.selected_offers, action.offer))  
                return _.extend({}, state, {
                    selected_offers: _.omit({}, state.selected_offers, {
                        [action.offer.id]: action.offer
                    })
                });
            else{
                return _.extend({}, state, {
                    selected_offers: _.extend({}, state.selected_offers, {
                        [action.offer.id]: action.offer
                    })
                });
            }
            return next(action);
        case "TOGGLE_OFFERS_SORTING":
            if(state.currentOrdering===null){
                return _.extend({}, state, {
                    currentOrdering: action.orderBy
                });
            }else{
                if(state.currentOrdering.includes(action.orderBy)){
                    if(state.currentOrdering===action.orderBy)
                        return _.extend({}, state, {
                            currentOrdering: "-" + action.orderBy
                        });
                    else
                        return _.extend({}, state, {
                            currentOrdering: action.orderBy
                        });
                }else{
                    return _.extend({}, state, {
                        currentOrdering: action.orderBy
                    });
                }
            }
            return next(action);
        case "RECEIVE_OFFERS":
            return _.extend({}, state, {
                    offers: action.data.results,
                    selected_offers:{},
                    fetching_offers:{},
                    currentPage:  Math.ceil(action.offset/action.limit),
                    pageCount: Math.ceil(action.data.count/action.limit)

            });
            return next(action);
        case "RECEIVE_OFFER":
            return _.extend({}, state, {
                offers: _.extend({}, state.offers, {
                    [action.data.id]: {
                        ...action.data
                    }
                }),
                selected_offers:{},
                fetching_offers:{},
                fetching_offers: _.extend({}, state.fetching_offers, {
                    [action.data.id]: false
                })
            });

        default:
            return state;
    }
}
