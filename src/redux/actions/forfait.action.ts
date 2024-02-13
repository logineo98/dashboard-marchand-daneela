import axios from 'axios'
import { toast } from 'react-toastify'
// my importations
import { ADD_FORFAIT, ERROR_FORFAIT, GET_ALL_FORFAITS, LOADING_FORFAIT, forfait } from '../constants'
import { PACK_TYPE } from '../../pages/Forfait'

const token = localStorage.getItem('accessToken')

export const _loadingForfait = () => (dispatch: any) => {
    dispatch({ type: LOADING_FORFAIT })
}

export const _errorForfait = (payload: any) => (dispatch: any) => {
    dispatch({ type: ERROR_FORFAIT, payload })
}

export const _getAllForfaits = (id: string) => async (dispatch: any) => {
    try {
        dispatch(_loadingForfait())

        const res = await axios.get(`${forfait}/store/${id}`, { headers: { Authorization: `Bearer ${token}` } })

        dispatch({ type: GET_ALL_FORFAITS, payload: res.data })
    } catch (error: any) {
        toast.error(error?.response?.data?.message)
        dispatch(_errorForfait(error?.response?.data?.message))
    }
}

export const _addForfait = (
    data: { storeId: string, duree: number, type: PACK_TYPE, montant: number },
    setPackName: React.Dispatch<React.SetStateAction<PACK_TYPE>>,
    setMonth: React.Dispatch<React.SetStateAction<{ gold: number; diamond: number; platinium: number; }>>
) => async (dispatch: any) => {
    try {
        dispatch(_loadingForfait())

        const res = await axios.post(`${forfait}`, data, { headers: { Authorization: `Bearer ${token}` } })

        toast.success('Demande envoyée avec succès.')
        // initialisation des data
        setPackName('Gold')
        setMonth({ gold: 1, diamond: 1, platinium: 1 })

        dispatch({ type: ADD_FORFAIT, payload: res.data })
    } catch (error: any) {
        toast.error(error?.response?.data?.message)
        dispatch(_errorForfait(error?.response?.data?.message))
    }
}