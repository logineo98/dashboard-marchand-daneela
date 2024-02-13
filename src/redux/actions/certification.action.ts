import axios from 'axios'
import { toast } from 'react-toastify'
// my importations
import { ADD_CERTIFICATION, ERROR_CERTIFICATION, GET_ALL_CERTIFICATIONS, LOADING_CERTIFICATION, certification } from '../constants'

const token = localStorage.getItem('accessToken')

export const _loadingCertification = () => (dispatch: any) => {
    dispatch({ type: LOADING_CERTIFICATION })
}

export const _errorCertification = (payload: any) => (dispatch: any) => {
    dispatch({ type: ERROR_CERTIFICATION, payload })
}

export const _getAllCertifications = (id: string) => async (dispatch: any) => {
    try {
        dispatch(_loadingCertification())

        const res = await axios.get(`${certification}/store/${id}`, { headers: { Authorization: `Bearer ${token}` } })

        dispatch({ type: GET_ALL_CERTIFICATIONS, payload: res.data })
    } catch (error: any) {
        toast.error(error?.response?.data?.message)
        dispatch(_errorCertification(error?.response?.data?.message))
    }
}

export const _addCertification = (data: { storeId: string }, setAcceptCondition: React.Dispatch<React.SetStateAction<boolean>>) => async (dispatch: any) => {
    try {
        dispatch(_loadingCertification())

        const res = await axios.post(`${certification}`, data, { headers: { Authorization: `Bearer ${token}` } })

        toast.success('Demande envoyée avec succès.')

        setAcceptCondition(false);
        (document.getElementById('condition_utilisation') as HTMLInputElement).checked = false

        dispatch({ type: ADD_CERTIFICATION, payload: res.data })
    } catch (error: any) {
        toast.error(error?.response?.data?.message)
        dispatch(_errorCertification(error?.response?.data?.message))
    }
}