import { apiFavorite } from '../constants/defaultValues'
import axios from "axios";


export const queryListFavorites = async (id) => {
    return await axios
        .get(
            `${apiFavorite}/${id}`
        )
        .then(res => res.data)
        .catch(error => error.response)
}
