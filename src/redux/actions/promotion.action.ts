import axios from 'axios'
import { toast } from 'react-toastify'
// my importations
import { ADD_PROMOTION, ERROR_PROMOTION, GET_ALL_PROMOTIONS, LOADING_PROMOTION, promotion } from '../constants'

const token = localStorage.getItem('accessToken')

export const _loadingPromotion = () => (dispatch: any) => {
    dispatch({ type: LOADING_PROMOTION })
}

export const _errorPromotion = (payload: any) => (dispatch: any) => {
    dispatch({ type: ERROR_PROMOTION, payload })
}

export const _getAllPromotions = (id: string) => async (dispatch: any) => {
    try {
        dispatch(_loadingPromotion())

        const res = await axios.get(`${promotion}/store/${id}`, { headers: { Authorization: `Bearer ${token}` } })

        dispatch({ type: GET_ALL_PROMOTIONS, payload: res.data })
    } catch (error: any) {
        toast.error(error?.response?.data?.message)
        dispatch(_errorPromotion(error?.response?.data?.message))
    }
}

export const _addPromotion = (
    data: FormData,
    setNiveau: React.Dispatch<React.SetStateAction<number>>,
    setDuree: React.Dispatch<React.SetStateAction<number>>,
    setDebut: React.Dispatch<React.SetStateAction<Date | undefined>>,
    setCropDataCouverture: React.Dispatch<React.SetStateAction<string>>
) => async (dispatch: any) => {
    try {
        dispatch(_loadingPromotion())

        const res = await axios.post(`${promotion}`, data, { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' } })

        toast.success('Demande envoyée avec succès.')
        // initialisation des data
        setNiveau(1)
        setDuree(1)
        setDebut(undefined)
        setCropDataCouverture('')

        dispatch({ type: ADD_PROMOTION, payload: res.data })
    } catch (error: any) {
        toast.error(error?.response?.data?.message)
        dispatch(_errorPromotion(error?.response?.data?.message))
    }
}