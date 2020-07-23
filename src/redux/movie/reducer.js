import {
    GET_MOVIE, GET_MOVIE_ID, ADD_MOVIE, EDIT_MOVIE, DELETE_MOVIE,
    GET_MOVIE_SUCCESS, GET_MOVIE_ERROR,
    GET_MOVIE_ID_SUCCESS, GET_MOVIE_ID_ERROR,
    ADD_MOVIE_SUCCESS, ADD_MOVIE_ERROR,
    EDIT_MOVIE_SUCCESS, EDIT_MOVIE_ERROR,
    DELETE_MOVIE_SUCCESS, DELETE_MOVIE_ERROR, DELETE_MOVIE_QUESTION,
    // GET_COMMENT, DELETE_COMMENT,
    // GET_COMMENT_SUCCESS, GET_COMMENT_ERROR,
    // DELETE_COMMENT_SUCCESS, DELETE_COMMENT_ERROR, DELETE_COMMENT_QUESTION
} from "../actions";

const INIT_STATE = {
    items: [],
    isLoading: true,
    error: '',
    totalPages: 1,
    totalItemCount: 0,
    item: {id: 0,
        title: "",
        quality: "",
        imdb: 0,
        runtime: 0,
        release_date: null,
        overview: "",
        popularity: 0,
        language: "",
        poster: null,
        view: 0,
        nation: "",
        adult: 0,
        visible: false,
        genres: [{
          id: 0,
          name: "",
        },
        {
          id: 1,
          name: "",
        },
        ],
        characters: [],
        episodes: []},
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_MOVIE:
            return { ...state, isLoading: true, error: '', items: [] };
        case GET_MOVIE_SUCCESS:
            // console.log(action)
            return {
                ...state, isLoading: false, items: action.payload.content,
                totalPages: action.payload.totalPages, totalItemCount: action.payload.totalElements, error: ''
            }
        case GET_MOVIE_ERROR:
            return {
                ...state, isLoading: false, items: [], error: action.payload.message
            }
        case GET_MOVIE_ID:
            // console.log(action)
            return { ...state, isLoading: true, error: '', item: {} };
        case GET_MOVIE_ID_SUCCESS:
            // console.log(action)
            return {
                ...state, isLoading: false, item: action.payload, error: ''
            }
        case GET_MOVIE_ID_ERROR:
            // console.log(action)
            return { ...state, isLoading: false, items: [], error: action.payload.message }
        case ADD_MOVIE:
            return { ...state, isLoading: false, error: '' }
        case ADD_MOVIE_SUCCESS:
            // console.log(action)
            return { ...state, isLoading: false, error: '' };
        case ADD_MOVIE_ERROR:
            return { ...state, isLoading: false, error: action.payload.message }
        case EDIT_MOVIE:
            return { ...state, isLoading: false, error: '' }
        case EDIT_MOVIE_SUCCESS:
            // console.log(action)
            return { ...state, isLoading: false, error: '' }
        case EDIT_MOVIE_ERROR:
            return { ...state, isLoading: false, error: action.payload.message }
        // case GET_COMMENT:
        //     console.log(action)
        //     return { ...state, isLoading: true, error: '', comments: [] };
        // case GET_COMMENT_SUCCESS:
        //     console.log(action)
        //     return {
        //         ...state, isLoading: false, comments: action.payload.content,
        //         totalPages: action.payload.totalPages, totalItemCount: action.payload.totalElements, error: ''
        //     }
        // case GET_COMMENT_ERROR:
        //     console.log(action)
        //     return {
        //         ...state, isLoading: false, comments: [], error: action.payload.message
        //     }
        default:
            return { ...state };
    }
}