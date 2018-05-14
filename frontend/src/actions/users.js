export function getUser(userId) {
	return {
		type: "GET_USER",
		user: userId
	};
}

export function clearUsers() {
	return {
		type: "CLEAR_USERS"
	};
}

export function getUsers(limit, offset, query) {
	return {
		type: "GET_USERS",
		limit: limit,
		offset: offset,
		query: query
	};
}

export function receiveUsers(limit, offset, data) {
	return {
		type: "RECEIVE_USERS",
		limit: limit,
		offset: offset, 
		data: data
	};
}
export function sortBy(sortBy){
    return {
        type: "TOGGLE_USERS_SORTING",
        orderBy: sortBy
    };
}
export function fetchingUser(userId) {
	return {
		type: "FETCHING_USER",
		user: userId
	};
}

export function clearChecked(userList) {
	return {
		type: "CLEARING_CHECKED",
		users: userList
	};
}

export function toggleChecked(user) {
	return {
		type: "TOGGLE_USER_SELECT",
		user: user
	};
}

export function receiveUser(data) {
	return {
		type: "RECEIVE_USER",
		data: data
	};
}
