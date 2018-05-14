var _ = require("lodash");

import * as actions from '../actions/receipts';
import * as receiptsAPI from '../api/receipts';

const initial_state = {
    receipts: {},
    receipt:  {
            "id": 0,
            "user": {
              "id": 0,
              "email": "",
            },
            "offer": {
              "id": 0,
              "business": {
                "id": 0,
                "business_name": "",
                "receipt_rules": "",
                "logo_img": ""
              },
              "business_id": 0,
              "offer_type": "",
              "min_reward": 0,
              "max_reward": 0,
            },
            "user_id": 2,
            "offer_id": 16,
            "receipt_img": "",
            "submit_time": "",
            "status": ""
          },
    selected_receipts: {},
    fetching_receipts: {},
    currentPage: 0,
    pageCount: 0,
    currentOrdering: null
};

export default function receipts(state = initial_state, action) {
    switch (action.type) {
        case "FETCHING_RECEIPT":
            return _.extend({}, state, {
                fetching_receipts: _.extend({}, state.fetching_receipts, {
                    [action.receipt]: true
                })
            });
            return next(action);
        case "TOGGLE_RECEIPT_SELECT":
            if(_.find(state.selected_receipts, action.receipt)){
                return _.extend({}, state, {
                    selected_receipts: _.omit({}, state.selected_receipts, {
                        [action.receipt.id]: action.receipt
                    })
                });
            }else{
                return _.extend({}, state, {
                    selected_receipts: _.extend({}, state.selected_receipts, {
                        [action.receipt.id]: action.receipt
                    })
                });
            }
            return next(action);
        case "RECEIVE_RECEIPTS":
            var results = [];
            _.map(action.data.results, (data, i) => {
                    if(data.id)
                        results.push({
                            ...data
                        });
                    });
            return _.extend({}, state, {
                    receipts: results,
                    currentPage:  Math.ceil(action.offset/action.limit),
                    pageCount: Math.ceil(action.data.count/action.limit)

            });
            return next(action);
        case "TOGGLE_RECEIPTS_SORTING":
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
        case "RECEIVE_RECEIPT":
            return _.extend({}, state, {
                receipt: _.extend({}, {},{...action.data})
            });

        default:
            return state;
    }
}
