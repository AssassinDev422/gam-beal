import { actionTypes } from 'redux-form';

const initial_state = {
	loading: [],
	loaded: []
};

export default function general(state = initial_state, action) {
	switch (action.type) {
		case "START_API_REQUEST":
			return {
				...state,
				loading: [...state.loading, action.id]
			};
		case "FINISH_API_REQUEST":
			return {
				...state,
				loading: _.without(state.loading, action.id),
				loaded: [...state.loaded, action.id]
			};
		case "RESOURCE_API_REQUEST":
			return {
				...state,
				loading: [...state.loading, `loading_${action.resource}_${action.trigger.id}`]
			};
		case "RESOURCE_SUCCEED_ACTION":
			let id = `loading_${action.resource}_${action.action.id}`;
			return {
				...state,
				loading: _.without(state.loading, id),
				loaded: [...state.loaded, id]
			};
		case actionTypes.START_SUBMIT:
			return {
				...state,
				loading: [...state.loading, 'form:submit']
			};
		case actionTypes.STOP_SUBMIT:
			return {
				...state,
				loading: _.without(state.loading, 'form:submit')
			};
		default:
			return state;
	}
}
