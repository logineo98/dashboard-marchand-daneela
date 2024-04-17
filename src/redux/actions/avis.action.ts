import axios from 'axios'
import { toast } from 'react-toastify'
import { ADD_AVIS, DELETE_AVIS, DELETE_AVIS_RESPONSE, ERROR_AVIS, GET_AVIS, LOADING_ADD_AVIS, LOADING_AVIS, LOADING_DELETE_AVIS, LOADING_DELETE_AVIS_RESPONSE, avis, avis_ } from '../constants'

const token = localStorage.getItem('accessToken')

export const _loadingAvis = () => (dispatch: any) => {
    dispatch({ type: LOADING_AVIS })
}


export const _errorAvis = (payload: any) => (dispatch: any) => {
    dispatch({ type: ERROR_AVIS, payload })
}

export const _getAvis = (storeId: string) => async (dispatch: any) => {
    try {
        dispatch(_loadingAvis())

        const res = await axios.get(`${avis}/${storeId}/client`,)

        dispatch({ type: GET_AVIS, payload: res.data })
    } catch (error: any) {
        toast.error(error?.response?.data?.message)
        dispatch(_errorAvis(error?.response?.data?.message))
    }
}

export const _addAvis = (
    avisId: string, data: { storeId: string, response: string },
    setGiveResponse: React.Dispatch<React.SetStateAction<boolean>>,
    setResponseValue: React.Dispatch<React.SetStateAction<string>>,
    setErr: React.Dispatch<React.SetStateAction<string>>
) => async (dispatch: any) => {
    try {
        dispatch({ type: LOADING_ADD_AVIS })

        const res = await axios.put(`${avis_}/${avisId}/response`, data, { headers: { Authorization: `Bearer ${token}` } })

        setGiveResponse(false)
        setResponseValue('')
        setErr('')

        toast.success('Avis répondu avec succès.')

        dispatch({ type: ADD_AVIS, payload: res.data })

    } catch (error: any) {
        toast.error(error?.response?.data?.message)
        dispatch(_errorAvis(error?.response?.data?.message))
    }
}

export const _deleteAvis = (avisId: string) => async (dispatch: any) => {
    try {
        dispatch({ type: LOADING_DELETE_AVIS })

        const res = await axios.delete(`${avis_}/${avisId}/destroy`, { headers: { Authorization: `Bearer ${token}` } })

        toast.success('Avis supprimée avec succès.')

        dispatch({ type: DELETE_AVIS, payload: res.data })
    } catch (error: any) {
        toast.error(error?.response?.data?.message)
        dispatch(_errorAvis(error?.response?.data?.message))
    }
}

export const _deleteAvisResponse = (avisId: string) => async (dispatch: any) => {
    try {
        dispatch({ type: LOADING_DELETE_AVIS_RESPONSE })

        const res = await axios.delete(`${avis_}/${avisId}/destroy-response`, { headers: { Authorization: `Bearer ${token}` } })

        toast.success('Réponse supprimée avec succès.')

        dispatch({ type: DELETE_AVIS_RESPONSE, payload: res.data })
    } catch (error: any) {
        toast.error(error?.response?.data?.message)
        dispatch(_errorAvis(error?.response?.data?.message))
    }
}