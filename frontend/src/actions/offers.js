export function getOffer(offerId) {
    return {
        type: "GET_OFFER",
        offer: offerId
    };
}

export function createOffer(data) {
    return {
        type: "CREATE_OFFER",
        data: data
    };
}

export function clearOffers() {
    return {
        type: "CLEAR_OFFERS"
    };
}

export function updateOffer(offerID, newStatus){
    return {
        type: "UPDATE_OFFER",
        offer: offerID,
        status: newStatus
    };
}
export function sortBy(sortBy){
    return {
        type: "TOGGLE_OFFERS_SORTING",
        orderBy: sortBy
    };
}

export function getOffers(limit, offset, query) {
    return {
        type: "GET_OFFERS",
        limit: limit,
        offset: offset, 
        query: query
    };
}

export function receiveOffers(limit, offset, data) {
    return {
        type: "RECEIVE_OFFERS",
        limit: limit,
        offset: offset, 
        data: data
    };
}

export function fetchingOffer(offerId) {
    return {
        type: "FETCHING_OFFER",
        offer: offerId
    };
}

export function clearChecked(offersList) {
    return {
        type: "CLEARING_OFFER_CHECKED",
        offers:offersList
    };
}

export function toggleChecked(offer) {
    return {
        type: "TOGGLE_OFFER_SELECT",
        offer: offer
    };
}

export function receiveOffer(data) {
    return {
        type: "RECEIVE_OFFER",
        data: data
    };
}
