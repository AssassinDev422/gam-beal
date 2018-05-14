var _ = require("lodash");

import * as actions from '../actions/businesses';
import * as businessAPI from '../api/restaurants';

const initial_state = {
    businesses: {},
    business: {
        "id": "",
        "business_name": "",
        "receipt_rules": "• Receipt must be from the above restaurant, clear, and fully readable \n• All receipts must be submitted within 24 hours of date printed on receipt\n• To receive credit, the submitted receipt must contain the business name, address, date transaction number and total\n• Purchases can be paid for with cash or credit but must not be combined with any coupons\n• Transaction total must be at least $5.00\n• One redemption maximum a day per location for each user",
        "featured_img":" http://placehold.it/476x270",
        "logo_img": "http://placehold.it/160x100"
    },
    selected_businesses: {},
    fetching_businesses: {},
    currentPage: 0,
    pageCount: 0,
    currentOrdering: null
};

export default function businesses(state = initial_state, action) {
    switch (action.type) {
        case "FETCHING_BUSINESS":
            return _.extend({}, state, {
                fetching_businesses: _.extend({}, state.fetching_businesses, {
                    [action.user]: true
                })
            });
            return next(action);
        case "TOGGLE_BUSINESS_SELECT":
            if(_.find(state.selected_businesses, action.business))  
                return _.extend({}, state, {
                    selected_businesses: _.omit({}, state.selected_businesses, {
                        [action.business.id]: action.business
                    })
                });
            else{
                return _.extend({}, state, {
                    selected_businesses: _.extend({}, state.selected_businesses, {
                        [action.business.id]: action.business
                    })
                });
            }
            return next(action);
        case "RECEIVE_BUSINESSES":
            return _.extend({}, state, {
                    businesses: action.data.results,
                    currentPage:  Math.ceil(action.offset/action.limit),
                    pageCount: Math.ceil(action.data.count/action.limit)

            });
            // });
            return next(action);
        case "TOGGLE_BUSINESSES_SORTING":
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
        case "RECEIVE_BUSINESS":
            console.log("action", action.data);
            return _.extend({}, state, {
                business: _.extend({}, state.business,{...action.data})
            });

        default:
            return state;
    }
}
