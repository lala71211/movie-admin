import { apiReview} from '../constants/defaultValues';
import axios from "axios";

export const queryListReviews = async (selectedPageSize, currentPage, movieId, userId) => {
    return await axios
        .get(
            `${apiReview}/search?pageSize=${selectedPageSize}&currentPage=${currentPage}&movieId=${
                movieId}&userId=${userId}`
        )
        .then(res => res.data)
        .catch(error => error.response)
}

export const addReview = async (reviewForm) => {
    return await axios.post(`${apiReview}/`, reviewForm)
     .then(res => res.data)
     .catch(error => error.response)
 }
 
export const deleteReview = async (id) => {
    return await axios
    .delete(`${apiReview}/${id}`)
    .then(res => res.data)
    .catch(err =>err.response)
}

export const deleteManyReviews = async (listId) => {
    return await axios
    .delete(`${apiReview}/delete-many`,listId)
    .then(res => res.data)
    .catch(err =>err.response)
}