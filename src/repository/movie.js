import { apiMovie } from '../constants/defaultValues'
import axios from "axios";

export const queryListMovies = async (selectedPageSize, currentPage, selectedOrderOption, search) => {
    return await axios
        .get(
            `${apiMovie}/?pageSize=${selectedPageSize}&currentPage=${currentPage}&orderBy=${
            selectedOrderOption.column
            }&search=${search}`
        )
        .then(res => res.data)
        .catch(error => error.response)
}

export const queryMovieByID = async (id) => {
    return await axios
        .get(
            `${apiMovie}/${id}`
        )
        .then(res => res.data)
        .catch(error => error.response)
}

export const addMovie = async (movieForm) => {
    return await axios.post(`${apiMovie}/`, movieForm)
        .then(res => res.data)
        .catch(error => error.response)
}

export const updateMovie = async (id, movieForm) => {
    return await axios.put(`${apiMovie}/${id}`, movieForm)
        .then(res => res.data)
        .catch(error => error.response)
}

export const changeStatusMovie = async (id, status) => {
    return await axios.get(`${apiMovie}/${id}/status/${status}`)
    .then(res => res.data)
    .catch(error => error.response)
}