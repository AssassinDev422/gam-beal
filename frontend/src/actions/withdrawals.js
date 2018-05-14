export function getWithdrawal(ID) {
    return {
        type: "GET_WITHDRAWAL",
        withdrawal: ID
    };
}

export function createWithdrawal(data) {
    return {
        type: "CREATE_WITHDRAWAL",
        data: data
    };
}

export function clearWithdrawals() {
    return {
        type: "CLEAR_WITHDRAWALS"
    };
}

export function getWithdrawals(limit, offset, query) {
    return {
        type: "GET_WITHDRAWALS",
        limit: limit,
        offset: offset,
        query: query
    };
}
export function sortBy(sortBy){
    return {
        type: "TOGGLE_WITHDRAWALS_SORTING",
        orderBy: sortBy
    };
}
export function updateWithdrawal(ID, newStatus){
    return {
        type: "UPDATE_WITHDRAWAL",
        withdrawal: ID,
        status: newStatus
    };
}

export function receiveWithdrawals(limit, offset, data) {
    return {
        type: "RECEIVE_WITHDRAWALS",
        limit: limit,
        offset: offset, 
        data: data
    };
}

export function fetchingWithdrawal(ID) {
    return {
        type: "FETCHING_WITHDRAWAL",
        withdrawal: ID
    };
}

export function clearChecked(list) {
    return {
        type: "CLEARING_WITHDRAWAL_CHECKED",
        withdrawals:list
    };
}

export function toggleChecked(object) {
    return {
        type: "TOGGLE_WITHDRAWAL_SELECT",
        withdrawal: object
    };
}

export function receiveWithdrawal(data) {
    return {
        type: "RECEIVE_WITHDRAWAL",
        data: data
    };
}
