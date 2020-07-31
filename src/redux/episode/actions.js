import {
    GET_EPISODE, GET_EPISODE_ID, ADD_EPISODE, EDIT_EPISODE, DELETE_EPISODE,
    GET_EPISODE_SUCCESS, GET_EPISODE_ERROR,
    GET_EPISODE_ID_SUCCESS, GET_EPISODE_ID_ERROR,
    ADD_EPISODE_SUCCESS, ADD_EPISODE_ERROR,
    EDIT_EPISODE_SUCCESS, EDIT_EPISODE_ERROR,
    DELETE_EPISODE_SUCCESS, DELETE_EPISODE_ERROR, DELETE_EPISODE_QUESTION,

} from "../actions";

export const getListEpisodes = (selectedPageSize, currentPage, selectedOrderOption, search) => ({
    type: GET_EPISODE,
    payload: { selectedPageSize, currentPage, selectedOrderOption, search }
});

export const getListEpisodesSuccess = (listEpisode) => ({
    type: GET_EPISODE_SUCCESS,
    payload: listEpisode
});

export const getListEpisodeError = (message) => ({
    type: GET_EPISODE_ERROR,
    payload: message
});

export const getEpisodeByID = (id) => ({
    type: GET_EPISODE_ID,
    payload: id
});

export const getEpisodeByIDSuccess = (EPISODE) => ({
    type: GET_EPISODE_ID_SUCCESS,
    payload: EPISODE
});

export const getEpisodeByIDError = (message) => ({
    type: GET_EPISODE_ID_ERROR,
    payload: message
});

export const addEpisode = (episodeForm) => ({
    type: ADD_EPISODE,
    payload: episodeForm
});

export const addEpisodeSuccess = (message) => ({
    type: ADD_EPISODE_SUCCESS,
    payload: message
});

export const addEpisodeError = (message) => ({
    type: ADD_EPISODE_ERROR,
    payload: message
});

export const editEpisode = (episodeForm) => ({
    type: EDIT_EPISODE,
    payload: episodeForm
});

export const editEpisodeSuccess = (message) => ({
    type: EDIT_EPISODE_SUCCESS,
    payload: message
});

export const editEpisodeError = (message) => ({
    type: EDIT_EPISODE_ERROR,
    payload: message
});

