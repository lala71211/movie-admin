import {
    GET_MOVIE, GET_MOVIE_ID, ADD_MOVIE, EDIT_MOVIE, DELETE_MOVIE,
    GET_MOVIE_SUCCESS, GET_MOVIE_ERROR,
    GET_MOVIE_ID_SUCCESS, GET_MOVIE_ID_ERROR,
    ADD_MOVIE_SUCCESS, ADD_MOVIE_ERROR,
    EDIT_MOVIE_SUCCESS, EDIT_MOVIE_ERROR,
    DELETE_MOVIE_SUCCESS, DELETE_MOVIE_ERROR, DELETE_MOVIE_QUESTION,

} from "../actions";

const INIT_STATE = {
    items: [],
    isLoading: true,
    error: '',
    totalPages: 1,
    totalItemCount: 0,
    genreOptions: [],
    item: {
        id: 0,
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
        episodes: []
    },
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
            return { ...state, isLoading: true, error: '', item: {}, genreOptions: [] };
        case GET_MOVIE_ID_SUCCESS:
            // console.log(action)
            let temp = [];
            action.payload.genres.map(genre =>
                temp.push({
                    id: genre.id,
                    value: genre.name,
                    label: genre.name,
                }))
            // console.log(temp)
            return {
                ...state, isLoading: false, item: action.payload, genreOptions: temp, error: ''
            }
        case GET_MOVIE_ID_ERROR:
            // console.log(action)
            return { ...state, isLoading: false, items: [], error: action.payload.message }
        case ADD_MOVIE:
            console.log(action)
            return { ...state, isLoading: false, error: '' }
        case ADD_MOVIE_SUCCESS:
            console.log(action)
            return { ...state, isLoading: false, error: '' };
        case ADD_MOVIE_ERROR:
            return { ...state, isLoading: false, error: action.payload.message }
        case EDIT_MOVIE:
            console.log(action)
            return { ...state, isLoading: false, error: '' }
        case EDIT_MOVIE_SUCCESS:
            console.log(action)
            return { ...state, isLoading: false, error: '' }
        case EDIT_MOVIE_ERROR:
            return { ...state, isLoading: false, error: action.payload.message }
        case DELETE_MOVIE:
            console.log(action)
            return { ...state, isLoading: false, error: '' }
        case DELETE_MOVIE_SUCCESS:
            console.log(action)
            return { ...state, isLoading: false, error: '' };
        case DELETE_MOVIE_ERROR:
            return { ...state, isLoading: false, error: action.payload.message }
        default:
            return { ...state };
    }
}