import axios from 'axios'
import { toast } from 'react-toastify'
import { ADD_MARCHAND, EDIT_PASSWORD_MARCHAND, ERROR_MARCHAND, GET_MARCHAND, LOADING_MARCHAND, auth, marchand } from '../constants'

const token = localStorage.getItem('accessToken')

export const _loadingMarchand = () => (dispatch: any) => {
    dispatch({ type: LOADING_MARCHAND })
}

export const _errorMarchand = (payload: any) => (dispatch: any) => {
    dispatch({ type: ERROR_MARCHAND, payload })
}

export const _getMarchand = () => async (dispatch: any) => {
    try {
        const marchand = localStorage.getItem('marchand')

        if (marchand) dispatch({ type: GET_MARCHAND, payload: JSON.parse(marchand) })

    } catch (error: any) {
        dispatch(_errorMarchand(error?.response?.data?.message))
    }
}

export const _addMarchand = (
    data: FormData,
    setLevel: React.Dispatch<React.SetStateAction<'01' | '02'>>,
    setDataMarchand: React.Dispatch<React.SetStateAction<{ name: string; email: string; password: string; confirm_password: string; }>>,
    setDataStore: React.Dispatch<React.SetStateAction<{ name: string; email: string; url: string; adresse: string; region: string; telephone: string; description: string; vitepay: boolean; frame: boolean; certifie: boolean; livraison: string; serviceApresVente: string; }>>,
    setMarchandVitepay: React.Dispatch<React.SetStateAction<boolean>>,
    setFrame: React.Dispatch<React.SetStateAction<boolean>>,
    setDataNetwork: React.Dispatch<React.SetStateAction<{ facebook: string; instagram: string; linkedin: string; }>>,
    setDataTag: React.Dispatch<React.SetStateAction<{ categories: string[]; sousCategories: string[]; prixMaximum: number; prixMinimum: number; }>>,
    setCategories_: React.Dispatch<React.SetStateAction<string[]>>,
    setSousCategories_: React.Dispatch<React.SetStateAction<string[]>>,
    setCropDataLogo: React.Dispatch<React.SetStateAction<string>>,
    setCropDataCouverture: React.Dispatch<React.SetStateAction<string>>,
    setCropDataProdPhare1: React.Dispatch<React.SetStateAction<string>>,
    setCropDataProdPhare2: React.Dispatch<React.SetStateAction<string>>,
    setCropDataProdPhare3: React.Dispatch<React.SetStateAction<string>>
) => async (dispatch: any) => {
    try {
        dispatch(_loadingMarchand())

        const res = await axios.post(`${auth}/signup`, data, { headers: { 'Content-Type': 'multipart/form-data' } })

        toast.success(res.data.message)

        // reinitialisation des data
        setLevel('01')
        setDataMarchand({ confirm_password: '', email: '', name: '', password: '' })
        setDataStore({ adresse: '', certifie: false, description: '', email: '', frame: false, livraison: 'Non disponible', name: '', region: '', serviceApresVente: 'non', telephone: '', url: '', vitepay: false })
        setMarchandVitepay(false)
        setFrame(false)
        setDataNetwork({ facebook: '', instagram: '', linkedin: '' })
        setDataTag({ categories: [], prixMaximum: 25000, prixMinimum: 100, sousCategories: [] })
        setCategories_([])
        setSousCategories_([])
        setCropDataLogo('')
        setCropDataCouverture('')
        setCropDataProdPhare1('')
        setCropDataProdPhare2('')
        setCropDataProdPhare3('')

        dispatch({ type: ADD_MARCHAND, payload: res.data })
    } catch (error: any) {
        toast.error(error?.response?.data?.message)
        dispatch(_errorMarchand(error?.response?.data?.message))
    }
}

export const _editPasswordMarchand = (id: string, data: { current: string, new: string }, setEditPasswordData: React.Dispatch<React.SetStateAction<{ current: string; new_password: string; new_confirm_password: string; }>>) => async (dispatch: any) => {
    try {
        dispatch(_loadingMarchand())

        const res = await axios.put(`${marchand}/${id}/password`, data, { headers: { Authorization: `Bearer ${token}` } })

        toast.success('Modification du mot de passe effectuée avec succès.')
        setEditPasswordData({ current: '', new_password: '', new_confirm_password: '' })

        dispatch({ type: EDIT_PASSWORD_MARCHAND, payload: res.data })
    } catch (error: any) {
        toast.error(error?.response?.data?.message)
        dispatch(_errorMarchand(error?.response?.data?.message))
    }
}