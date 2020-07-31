import {
    GET_GENRE, ADD_GENRE, EDIT_GENRE, DELETE_GENRE,
    GET_GENRE_SUCCESS, GET_GENRE_ERROR,
    ADD_GENRE_SUCCESS, ADD_GENRE_ERROR,
    EDIT_GENRE_SUCCESS, EDIT_GENRE_ERROR,
    DELETE_GENRE_SUCCESS, DELETE_GENRE_ERROR, DELETE_GENRE_QUESTION
} from "../actions";

const INIT_STATE = {
    genres: [],
    isLoading: true,
    error: '',
};

export default (state = INIT_STATE, action) =>{
    switch (action.type){
        case GET_GENRE:
            return { ...state, isLoading: true, error: '', genres:[]};
        case GET_GENRE_SUCCESS:
            // console.log(action)
            return { ...state, isLoading: false,genres: action.payload, error: ''}
        case GET_GENRE_ERROR:
            return { ...state, isLoading: false,genres:[], error: action.payload.message}
        case ADD_GENRE:
            return { ...state, isLoading: false, error:''}
        case ADD_GENRE_SUCCESS:
            // console.log(action)
            return { ...state, isLoading: false, error:''};
        case ADD_GENRE_ERROR:
            // console.log(action)
            return { ...state, isLoading: false, error:action.payload.message}
        case EDIT_GENRE:
            return { ...state, isLoading: false,error:''}
        case EDIT_GENRE_SUCCESS:
            return { ...state, isLoading: false,error:''}
        case EDIT_GENRE_ERROR:
            return { ...state, isLoading: false,error:action.payload.message}
        default:
            return { ...state };
    }
}