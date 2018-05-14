export function loadInitialData() {
	return {
		type: "LOAD_INITIAL_DATA"
	};
}

export function loadingInitialData() {
	return {
		type: "LOADING_INITIAL_DATA"
	};
}

export function startRequest(requestId) {
	return {
		type: "START_API_REQUEST",
		id: requestId
	}
}

export function finishRequest(requestId) {
	return {
		type: "FINISH_API_REQUEST",
		id: requestId
	}
}


export function getAnalytics(query) {
	return {
		type: "GET_ANALYTICS",
		query: query
	}
}

export function receiveAnalytics(data) {
	console.log('data', data);
	return {
		type: "RECEIVE_ANALYTICS",
		data: data
	}
}