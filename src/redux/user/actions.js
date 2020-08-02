import {
    GET_USER, GET_FAVORITE_LIST_BY_USER_ID, EDIT_USER, DELETE_USER,
    GET_USER_SUCCESS, GET_USER_ERROR,
    GET_FAVORITE_LIST_BY_USER_ID_SUCCESS, GET_FAVORITE_LIST_BY_USER_ID_ERROR,
    EDIT_USER_SUCCESS, EDIT_USER_ERROR,
    DELETE_USER_SUCCESS, DELETE_USER_ERROR, DELETE_USER_QUESTION,

} from "../actions";

export const getListUsers = (selectedPageSize, currentPage, selectedOrderOption, search) => ({
    type: GET_USER,
    payload: { selectedPageSize, currentPage, selectedOrderOption, search }
});

export const getListUsersSuccess = (listUser) => ({
    type: GET_USER_SUCCESS,
    payload: listUser
});

export const getListUserError = (message) => ({
    type: GET_USER_ERROR,
    payload: message
});

export const getFavoriteListByUserID = (id) => ({
    type: GET_FAVORITE_LIST_BY_USER_ID,
    payload: id
});

export const getFavoriteListByUserIDSuccess = (favorite) => ({
    type: GET_FAVORITE_LIST_BY_USER_ID_SUCCESS,
    payload: favorite
});

export const getFavoriteListByUserIDError = (message) => ({
    type: GET_FAVORITE_LIST_BY_USER_ID_ERROR,
    payload: message
});

export const editUser = (userForm) => ({
    type: EDIT_USER,
    payload: userForm 
});

export const editUserSuccess = (message) => ({
    type: EDIT_USER_SUCCESS,
    payload: message
});

export const editUserError = (message) => ({
    type: EDIT_USER_ERROR,
    payload: message
});

