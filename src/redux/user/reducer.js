import {
    GET_USER, GET_FAVORITE_LIST_BY_USER_ID, EDIT_USER, DELETE_USER,
    GET_USER_SUCCESS, GET_USER_ERROR,
    GET_FAVORITE_LIST_BY_USER_ID_SUCCESS, GET_FAVORITE_LIST_BY_USER_ID_ERROR,
    EDIT_USER_SUCCESS, EDIT_USER_ERROR,
    DELETE_USER_SUCCESS, DELETE_USER_ERROR, DELETE_USER_QUESTION,

} from "../actions";

const INIT_STATE = {
    items: [],
    isLoading: true,
    error: '',
    totalPages: 1,
    totalItemCount: 0,
    favorite: [{
        id: 0,
        movie_name: "",
        movie_id: 0,
        user_id: 0,
        current_time: 0
    }],
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_USER:
            return { ...state, isLoading: true, error: '', items: [] };
        case GET_USER_SUCCESS:
            console.log(action)
            return {
                ...state, isLoading: false, items: action.payload.content,
                totalPages: action.payload.totalPages, totalItemCount: action.payload.totalElements, error: ''
            }
        case GET_USER_ERROR:
            return {
                ...state, isLoading: false, items: [], error: action.payload.message
            }
        case GET_FAVORITE_LIST_BY_USER_ID:
            // console.log(action)
            return { ...state, isLoading: true, error: '', favorite: [] };
        case GET_FAVORITE_LIST_BY_USER_ID_SUCCESS:
            // console.log(action)
            return {
                ...state, isLoading: false, favorite: action.payload, error: ''
            }
        case GET_FAVORITE_LIST_BY_USER_ID_ERROR:
            // console.log(action)
            return { ...state, isLoading: false, favorite: [], error: action.payload.message }
        case EDIT_USER:
            console.log(action)
            return { ...state, isLoading: false, error: '' }
        case EDIT_USER_SUCCESS:
            console.log(action)
            return { ...state, isLoading: false, error: '' }
        case EDIT_USER_ERROR:
            return { ...state, isLoading: false, error: action.payload.message }

        default:
            return { ...state };
    }
}