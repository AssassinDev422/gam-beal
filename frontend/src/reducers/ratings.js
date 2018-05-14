var _ = require("lodash");

import * as actions from '../actions/ratings';
import * as ratingsAPI from '../api/ratings';

const initial_state = {
    ratings: {},
    rating: {},
    selected_ratings: {},
    fetching_ratings: {},
    currentPage: 0,
    pageCount: 0,
    currentOrdering: null
};

export default function ratings(state = initial_state, action) {
    switch (action.type) {
        case "FETCHING_RATING":
            return _.extend({}, state, {
                fetching_ratings: _.extend({}, state.fetching_ratings, {
                    [action.rating]: true
                })
            });
            return next(action);
        case "TOGGLE_RATING_SELECT":
            if(_.find(state.selected_ratings, action.rating))  
                return _.extend({}, state, {
                    selected_ratings: _.omit({}, state.selected_ratings, {
                        [action.rating.id]: action.rating
                    })
                });
            else{
                return _.extend({}, state, {
                    selected_ratings: _.extend({}, state.selected_ratings, {
                        [action.rating.id]: action.rating
                    })
                });
            }
            return next(action);
        case "TOGGLE_RATINGS_SORTING":
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
        case "RECEIVE_RATINGS":
            var results = [];
            _.map(action.data.results, (data, i) => {
                    if(data.id)
                        results.push({
                            ...data
                        });
                    });
            return _.extend({}, state, {
                    ratings: results,
                    currentPage:  Math.ceil(action.offset/action.limit),
                    pageCount: Math.ceil(action.data.count/action.limit)

            });
            return next(action);
        case "RECEIVE_RATING":
            return _.extend({}, state, {
                ratings: _.extend({}, state.ratings, {
                    [action.data.id]: {
                        ...action.data
                    }
                }),
                fetching_ratings: _.extend({}, state.fetching_ratings, {
                    [action.data.id]: false
                })
            });

        default:
            return state;
    }
}
