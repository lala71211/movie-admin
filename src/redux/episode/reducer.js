import {
    GET_EPISODE, GET_EPISODE_ID, ADD_EPISODE, EDIT_EPISODE, DELETE_EPISODE,
    GET_EPISODE_SUCCESS, GET_EPISODE_ERROR,
    GET_EPISODE_ID_SUCCESS, GET_EPISODE_ID_ERROR,
    ADD_EPISODE_SUCCESS, ADD_EPISODE_ERROR,
    EDIT_EPISODE_SUCCESS, EDIT_EPISODE_ERROR,
    DELETE_EPISODE_SUCCESS, DELETE_EPISODE_ERROR, DELETE_EPISODE_QUESTION,

} from "../actions";

const INIT_STATE = {
    items: [],
    isLoading: true,
    error: '',
    totalPages: 1,
    totalItemCount: 0,
    item: {},
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_EPISODE:
            return { ...state, isLoading: true, error: '', items: [] };
        case GET_EPISODE_SUCCESS:
            // console.log(action)
            return {
                ...state, isLoading: false, items: action.payload.content,
                totalPages: action.payload.totalPages, totalItemCount: action.payload.totalElements, error: ''
            }
        case GET_EPISODE_ERROR:
            return {
                ...state, isLoading: false, items: [], error: action.payload.message
            }
        case GET_EPISODE_ID:
            // console.log(action)
            return { ...state, isLoading: true, error: '', item: {} };
        case GET_EPISODE_ID_SUCCESS:
            // console.log(action)
            return {
                ...state, isLoading: false, item: action.payload, error: ''
            }
        case GET_EPISODE_ID_ERROR:
            // console.log(action)
            return { ...state, isLoading: false, items: [], error: action.payload.message }
        case ADD_EPISODE:
            return { ...state, isLoading: false, error: '' }
        case ADD_EPISODE_SUCCESS:
            // console.log(action)
            return { ...state, isLoading: false, error: '' };
        case ADD_EPISODE_ERROR:
            return { ...state, isLoading: false, error: action.payload.message }
        case EDIT_EPISODE:
            return { ...state, isLoading: false, error: '' }
        case EDIT_EPISODE_SUCCESS:
            // console.log(action)
            return { ...state, isLoading: false, error: '' }
        case EDIT_EPISODE_ERROR:
            return { ...state, isLoading: false, error: action.payload.message }

        default:
            return { ...state };
    }
}