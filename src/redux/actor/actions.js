import { GET_ACTOR,ADD_ACTOR,EDIT_ACTOR,DELETE_ACTOR,
    GET_ACTOR_SUCCESS,GET_ACTOR_ERROR,
    ADD_ACTOR_SUCCESS,ADD_ACTOR_ERROR,
    EDIT_ACTOR_SUCCESS,EDIT_ACTOR_ERROR,
    DELETE_ACTOR_SUCCESS,DELETE_ACTOR_ERROR,DELETE_ACTOR_QUESTION} from "../actions";

export const getListActors = (selectedPageSize,currentPage,selectedOrderOption, search) => ({
type: GET_ACTOR,
payload: { selectedPageSize,currentPage,selectedOrderOption, search }
});

export const getListActorsSuccess = (listActor) => ({
type: GET_ACTOR_SUCCESS,
payload: listActor
});

export const getListActorError = (message) => ({ 
type: GET_ACTOR_ERROR,
payload: message
});

export const addActor = (actorForm) => ({
type: ADD_ACTOR,
payload: actorForm
});

export const addActorSuccess = (message) => ({
type: ADD_ACTOR_SUCCESS,
payload: message
})

export const addActorError = (message) => ({
type: ADD_ACTOR_ERROR,
payload: message
})

export const editActor = (id,actorForm) => ({
type: EDIT_ACTOR,
payload: {id,actorForm}
});

export const editActorSuccess = (message) => ({
type: EDIT_ACTOR_SUCCESS,
payload: message
})

export const editActorError = (message) => ({
type: EDIT_ACTOR_ERROR,
payload: message
})