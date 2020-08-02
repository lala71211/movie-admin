import { apiGenre } from '../constants/defaultValues'
import axios from "axios";

export const queryListGenres = async (selectedOrderOption, search) => {
    return await axios.get(`${apiGenre}/?orderBy=${selectedOrderOption.column}&search=${search}`)
        .then(res => res.data.result)
        .catch(error => error.response)
}

export const addGenre = async (genreForm) => {
   return await axios.post(`${apiGenre}/`, genreForm)
    .then(res => res.data)
    .catch(error => error.response)
}

export const updateGenre = async (genreForm) => {
    return await axios.put(`${apiGenre}/${genreForm.id}`, genreForm)
    .then(res =>res.data)
    .catch(error => error.response)
}

export const deleteGenre = async (id) =>{
    return await axios.delete(`${apiGenre}/${id}`)
    .then(res =>res.data)
    .catch(error => error.response)
}
