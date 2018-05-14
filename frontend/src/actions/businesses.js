export function getBusiness(businessId) {
    return {
        type: "GET_BUSINESS",
        business: businessId
    };
}

export function createBusiness(data) {
    return {
        type: "CREATE_BUSINESS",
        data: data
    };
}

export function clearBusinesses() {
    return {
        type: "CLEAR_BUSINESSES"
    };
}

export function sortBy(sortBy){
    return {
        type: "TOGGLE_BUSINESSES_SORTING",
        orderBy: sortBy
    };
}

export function getBusinesses(limit, offset, query) {
    return {
        type: "GET_BUSINESSES",
        limit: limit,
        offset: offset,
        query: query
    };
}
export function getAllBusinesses() {
    return {
        type: "GET_ALL_BUSINESSES"
    };
}

export function receiveBusinesses(limit, offset, data) {
    return {
        type: "RECEIVE_BUSINESSES",
        limit: limit,
        offset: offset, 
        data: data
    };
}

export function fetchingBusiness(businessId) {
    return {
        type: "FETCHING_BUSINESS",
        business: businessId
    };
}

export function clearChecked(businessList) {
    return {
        type: "CLEARING_BUSINESS_CHECKED",
        businesses:businessList
    };
}

export function toggleChecked(business) {
    return {
        type: "TOGGLE_BUSINESS_SELECT",
        business: business
    };
}

export function receiveBusiness(data) {
    return {
        type: "RECEIVE_BUSINESS",
        data: data
    };
}
