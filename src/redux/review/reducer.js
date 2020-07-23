import {
    GET_REVIEW, ADD_REVIEW, DELETE_REVIEW,
    GET_REVIEW_SUCCESS, GET_REVIEW_ERROR,
    ADD_REVIEW_SUCCESS, ADD_REVIEW_ERROR,
    DELETE_REVIEW_SUCCESS, DELETE_REVIEW_ERROR, DELETE_REVIEW_QUESTION
} from "../actions";

const INIT_STATE = {
    reviews: [],
    isLoading: true,
    error: '',
    totalElements: 0,
    totalPages: 1,
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
        case GET_REVIEW:
            console.log(action)
            return { ...state, isLoading: true, error: '', reviews: [] };
        case GET_REVIEW_SUCCESS:
            console.log(action)
            return {
                ...state, isLoading: false, reviews: action.payload.content,
                totalPages: action.payload.totalPages, totalItemCount: action.payload.totalElements, error: ''
            }
        case GET_REVIEW_ERROR:
            return {
                ...state, isLoading: false, reviews: [], error: action.payload.message
            }
        case ADD_REVIEW:
            return { ...state, isLoading: false, error: '' }
        case ADD_REVIEW_SUCCESS:
            console.log(action)
            return { ...state, isLoading: false, error: '' };
        case ADD_REVIEW_ERROR:
            return { ...state, isLoading: false, error: action.payload.message }
        default:
            return { ...state };
    }
}