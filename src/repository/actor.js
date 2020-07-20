import { apiActor } from '../constants/defaultValues'
import axios from "axios";

export const queryListActors = async (selectedPageSize,currentPage,selectedOrderOption, search) => {
    return await axios
    .get(
      `${apiActor}/?pageSize=${selectedPageSize}&currentPage=${currentPage-1}&orderBy=${
      selectedOrderOption.column
      }&search=${search}`
    )
        .then(res => res.data)
        .catch(error => error.response)
}

export const addActor = async (actorForm) => {
   return await axios.post(`${apiActor}/`, actorForm)
    .then(res => res.data)
    .catch(error => error.response)
}

export const updateActor = async (id,actorForm) => {
    return await axios.put(`${apiActor}/${id}`, actorForm)
    .then(res =>res.data)
    .catch(error => error.response)
}
