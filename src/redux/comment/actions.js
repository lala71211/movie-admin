import { GET_COMMENT,DELETE_COMMENT,
    GET_COMMENT_SUCCESS,GET_COMMENT_ERROR,
    DELETE_COMMENT_SUCCESS,DELETE_COMMENT_ERROR,DELETE_COMMENT_QUESTION} from "../actions";

export const getListComments = (selectedPageSize, currentPage, movieId, userId) => ({
type: GET_COMMENT,
payload: { selectedPageSize, currentPage, movieId, userId}
});

export const getListCommentsSuccess = (listComment) => ({
type: GET_COMMENT_SUCCESS,
payload: listComment
});

export const getListCommentError = (message) => ({ 
type: GET_COMMENT_ERROR,
payload: message
});

