import {
    GET_COMMENT, DELETE_COMMENT,
    GET_COMMENT_SUCCESS, GET_COMMENT_ERROR,
    DELETE_COMMENT_SUCCESS, DELETE_COMMENT_ERROR, DELETE_COMMENT_MANY
} from "../actions";

const INIT_STATE = {
    comments: [],
    isLoading: true,
    error: '',
    totalElements: 0,
    totalPages: 1,
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_COMMENT:
            // console.log(action)
            return { ...state, isLoading: true, error: '', comments: [] };
        case GET_COMMENT_SUCCESS:
            return {
                ...state, isLoading: false, comments: action.payload.content,
                totalPages: action.payload.totalPages, totalItemCount: action.payload.totalElements, error: ''
            }
        case GET_COMMENT_ERROR:
            return {
                ...state, isLoading: false, comments: [], error: action.payload.message
            }
        case DELETE_COMMENT:
            console.log(action)         
            return { ...state, isLoading: false, error: '' }
        case DELETE_COMMENT_MANY:
            return { ...state, isLoading: false, error: '' }
        case DELETE_COMMENT_SUCCESS:
            console.log(action)
            return { ...state, isLoading: false, error: '' }
        case DELETE_COMMENT_ERROR:
            return { ...state, isLoading: false, error: action.payload.message }
        default:
            return { ...state };
    }
}