var _ = require("lodash");

import * as actions from '../actions/api';
import * as userActions from '../actions/users';
import * as authActions from '../actions/auth';
import * as userAPI from '../api/users';

const initial_state = {
	users: {},
    user:  {
            "id": 0,
            "receipts": [],
            "image_url": "",
            "email": "",
            "paypal": "",
            "phone_number": "",
            "birthdate": "",
            "pending_money": 0,
            "available_money": 0,
            "offers_redeemed": 0,
            "lifetime_earnings": 0,
            "date_joined": "",
          },
	all_users: {}, 
    selected_users: {},
	fetching_users: {},
	currentPage: 0,
	pageCount: 0,
    currentOrdering: null
};

export default function users(state = initial_state, action) {
	switch (action.type) {
		case "FETCHING_USER":
			return _.extend({}, state, {
				fetching_users: _.extend({}, state.fetching_users, {
					[action.user]: true
				})
			});
            return next(action);
        case "TOGGLE_USER_SELECT":
            if(_.find(state.selected_users, action.user))  
                return _.extend({}, state, {
                    selected_users: _.omit({}, state.selected_users, {
                        [action.user.id]: action.user
                    })
                });
            else{
                return _.extend({}, state, {
                    selected_users: _.extend({}, state.selected_users, {
                        [action.user.id]: action.user
                    })
                });
            }
            return next(action);
        case "TOGGLE_USERS_SORTING":
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
        case "RECEIVE_USERS":
            var results = [];
            _.map(action.data.results, (data, i) => {
            		if(data.id)
						results.push({
							full_name: data.first_name + ' ' + data.last_name,
							...data
						});
					});
            return _.extend({}, state, {
					all_users: results,
					currentPage:  Math.ceil(action.offset/action.limit),
					pageCount: Math.ceil(action.data.count/action.limit)

			});
            return next(action);
		case "RECEIVE_USER":
			return _.extend({}, state, {
				users: _.extend({}, state.users, {
					[action.data.id]: {
						full_name: action.data.first_name + ' ' + action.data.last_name,
						...action.data
					}
				}),
				fetching_users: _.extend({}, state.fetching_users, {
					[action.data.id]: false
				}),
                user: _.extend({}, {},{...action.data})
			});

		default:
			return state;
	}
}
