export function getReceipt(receiptId) {
    return {
        type: "GET_RECEIPT",
        receipt: receiptId
    };
}

export function createReceipt(data) {
    return {
        type: "CREATE_RECEIPT",
        data: data
    };
}

export function clearReceipts() {
    return {
        type: "CLEAR_RECEIPTS"
    };
}

export function getReceipts(limit, offset, query) {
    return {
        type: "GET_RECEIPTS",
        limit: limit,
        offset: offset,
        query: query
    };
}
export function sortBy(sortBy){
    return {
        type: "TOGGLE_RECEIPTS_SORTING",
        orderBy: sortBy
    };
}
export function updateReceipt(receiptID, newStatus){
    return {
        type: "UPDATE_RECEIPT",
        receipt: receiptID,
        status: newStatus
    };
}

export function receiveReceipts(limit, offset, data) {
    return {
        type: "RECEIVE_RECEIPTS",
        limit: limit,
        offset: offset, 
        data: data
    };
}

export function fetchingReceipt(receiptId) {
    return {
        type: "FETCHING_RECEIPT",
        receipt: receiptId
    };
}

export function clearChecked(receiptsList) {
    return {
        type: "CLEARING_RECEIPT_CHECKED",
        receipt:receiptsList
    };
}

export function toggleChecked(receipt) {
    return {
        type: "TOGGLE_RECEIPT_SELECT",
        receipt: receipt
    };
}

export function receiveReceipt(data) {
    return {
        type: "RECEIVE_RECEIPT",
        data: data
    };
}
