import { apiUser } from '../constants/defaultValues'
import axios from "axios";

export const queryListUsers = async (selectedPageSize, currentPage, selectedOrderOption, search) => {
    return await axios
        .get(
            `${apiUser}/?pageSize=${selectedPageSize}&currentPage=${currentPage}&sort=${
            selectedOrderOption.column
            }&skeyword=${search}`
        )
        .then(res => res.data)
        .catch(error => error.response)
}


export const updateUser = async (userForm) => {
    return await axios.put(`${apiUser}/`, userForm)
        .then(res => res.data)
        .catch(error => error.response)
}
