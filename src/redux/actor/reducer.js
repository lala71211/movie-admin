import {
    GET_ACTOR, ADD_ACTOR, EDIT_ACTOR, DELETE_ACTOR,
    GET_ACTOR_SUCCESS, GET_ACTOR_ERROR,
    ADD_ACTOR_SUCCESS, ADD_ACTOR_ERROR,
    EDIT_ACTOR_SUCCESS, EDIT_ACTOR_ERROR,
    DELETE_ACTOR_SUCCESS, DELETE_ACTOR_ERROR, DELETE_ACTOR_QUESTION
} from "../actions";

const INIT_STATE = {
    items: [],
    isLoading: true,
    error: '',
    totalPages: 1,
    totalItemCount: 0,
};

export default (state = INIT_STATE, action) =>{
    switch (action.type){
        case GET_ACTOR:
            return { ...state, isLoading: true, error: '', items:[]};
        case GET_ACTOR_SUCCESS:
            // console.log(action)
            return { ...state, isLoading: false,items: action.payload.content,
                totalPages:action.payload.totalPages, totalItemCount: action.payload.totalElements, error: ''}
        case GET_ACTOR_ERROR:
            return { ...state, isLoading: false,items:[], error: action.payload.message}
        case ADD_ACTOR:
            return { ...state, isLoading: false, error:''}
        case ADD_ACTOR_SUCCESS:
            console.log(action)
            return { ...state, isLoading: false, error:''};
        case ADD_ACTOR_ERROR:
            return { ...state, isLoading: false, error:action.payload.message}
        case EDIT_ACTOR:
            return { ...state, isLoading: false,error:''}
        case EDIT_ACTOR_SUCCESS:
            // console.log(action)
            return { ...state, isLoading: false,error:''}
        case EDIT_ACTOR_ERROR:
            return { ...state, isLoading: false,error:action.payload.message}
        default:
            return { ...state };
    }
}