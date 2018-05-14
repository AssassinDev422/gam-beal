var _ = require("lodash");

import * as actions from '../actions/receipts';
import * as receiptsAPI from '../api/receipts';

const initial_state = {
    requests: {},
    request:  {
            "id": 0,
            "user": {
              "id": 0,
              "email": "",
              "paypal": "",
            },
            
            "status": "",
            "amount":0.0,
            "date":"",
          },
    selected_requests: {},
    fetching_requests: {},
    currentPage: 0,
    pageCount: 0,
    currentOrdering: null
};

export default function receipts(state = initial_state, action) {
    switch (action.type) {
        case "FETCHING_WITHDRAWAL":
            return _.extend({}, state, {
                fetching_requests: _.extend({}, state.fetching_requests, {
                    [action.request]: true
                })
            });
            return next(action);
        case "TOGGLE_WITHDRAWAL_SELECT":
            if(_.find(state.selected_requests, action.withdrawal))  
                return _.extend({}, state, {
                    selected_requests: _.omit({}, state.selected_requests, {
                        [action.withdrawal.id]: action.withdrawal
                    })
                });
            else{
                return _.extend({}, state, {
                    selected_requests: _.extend({}, state.selected_requests, {
                        [action.withdrawal.id]: action.withdrawal
                    })
                });
            }
            return next(action);
        case "RECEIVE_WITHDRAWALS":
            return _.extend({}, state, {
                    requests: action.data.results,
                    currentPage:  Math.ceil(action.offset/action.limit),
                    pageCount: Math.ceil(action.data.count/action.limit)

            });
            return next(action);
        case "TOGGLE_WITHDRAWALS_SORTING":
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
        case "RECEIVE_WITHDRAWAL":
            return _.extend({}, state, {
                request: _.extend({}, {},{...action.data})
            });

        default:
            return state;
    }
}
