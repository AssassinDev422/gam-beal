export function getRating(ratingId) {
    return {
        type: "GET_RATING",
        rating: ratingId
    };
}

export function createRating(data) {
    return {
        type: "CREATE_RATING",
        data: data
    };
}

export function clearRatings() {
    return {
        type: "CLEAR_RATINGS"
    };
}

export function getRatings(limit, offset, query) {
    return {
        type: "GET_RATINGS",
        limit: limit,
        offset: offset,
        query: query
    };
}
export function sortBy(sortBy){
    return {
        type: "TOGGLE_RATINGS_SORTING",
        orderBy: sortBy
    };
}
export function receiveRatings(limit, offset, data) {
    return {
        type: "RECEIVE_RATINGS",
        limit: limit,
        offset: offset, 
        data: data
    };
}

export function fetchingRating(ratingId) {
    return {
        type: "FETCHING_RATING",
        rating: ratingId
    };
}

export function clearChecked(ratingsList) {
    return {
        type: "CLEARING_RATING_CHECKED",
        ratings:ratingsList
    };
}

export function toggleChecked(rating) {
    return {
        type: "TOGGLE_RATING_SELECT",
        rating: rating
    };
}

export function receiveRating(data) {
    return {
        type: "RECEIVE_RATING",
        data: data
    };
}
