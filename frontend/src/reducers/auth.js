const initial_state = {
	analytics: {
		money_earned: 0.00,
		new_users: 0,
		receipts_sumitted: 0,
		receipts_pending: 0,
		receipts_recent_submitted: [], 
		receipts_recent_pending: [],
	},
	logged_in: false,
	token: {},
	user_id: null,
	after_login: {},
};

export default function auth(state = initial_state, action) {

	switch (action.type) {
		case "LOGIN_THEN":
			return {
				...state,
				after_login: action.after_login
			};
		case "RECEIVE_CURRENT_USER":
			return _.extend({}, state, {
				user_id: action.data.id
			});
		case "LOGGED_IN":
			return _.extend({}, state, {
				logged_in: true,
				after_login: null
			});
		case "RECEIVE_AUTH_TOKEN":
			return _.extend({}, state, {
				token: {
					access_token: action.access_token
				}
			});
		case "LOGGED_OUT":
			return _.extend({}, state, initial_state);
		case "RECEIVE_ANALYTICS":
			console.log('receive analytics', action.data);
			return _.extend({}, state, {
				analytics: action.data
			});

		default:
			return state;
	}
}