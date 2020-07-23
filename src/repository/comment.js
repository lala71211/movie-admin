import { apiComment} from '../constants/defaultValues';
import axios from "axios";

export const queryListComments = async (selectedPageSize, currentPage, movieId, userId) => {
    return await axios
        .get(
            `${apiComment}/search?pageSize=${selectedPageSize}&currentPage=${currentPage}&movieId=${
                movieId}&userId=${userId}`
        )
        .then(res => res.data)
        .catch(error => error.response)
}

export const deleteComment = async (id) => {
    return await axios
    .delete(`${apiComment}/${id}`)
}       