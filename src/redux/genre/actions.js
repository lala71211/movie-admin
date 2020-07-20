import { GET_GENRE,ADD_GENRE,EDIT_GENRE,DELETE_GENRE,
         GET_GENRE_SUCCESS,GET_GENRE_ERROR,
         ADD_GENRE_SUCCESS,ADD_GENRE_ERROR,
         EDIT_GENRE_SUCCESS,EDIT_GENRE_ERROR,
         DELETE_GENRE_SUCCESS,DELETE_GENRE_ERROR,DELETE_GENRE_QUESTION} from "../actions";

export const getListGenres = (selectedOrderOption, search) => ({
    type: GET_GENRE,
    payload: { selectedOrderOption, search }
  });

export const getListGenresSuccess = (listGenre) => ({
    type: GET_GENRE_SUCCESS,
    payload: listGenre
  });

export const getListGenreError = (message) => ({ 
    type: GET_GENRE_ERROR,
    payload: message
});

export const addGenre = (genreForm) => ({
    type: ADD_GENRE,
    payload: genreForm
});

export const addGenreSuccess = (newGenre) => ({
    type: ADD_GENRE_SUCCESS,
    payload: newGenre
})

export const addGenreError = (message) => ({
  type: ADD_GENRE_ERROR,
  payload: message
})

export const editGenre = (genreForm) => ({
  type: EDIT_GENRE,
  payload: genreForm
});

export const editGenreSuccess = (message) => ({
  type: EDIT_GENRE_SUCCESS,
  payload: message
})

export const editGenreError = (message) => ({
type: EDIT_GENRE_ERROR,
payload: message
})