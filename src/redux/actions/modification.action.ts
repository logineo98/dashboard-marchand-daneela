import axios from 'axios'
import { toast } from 'react-toastify'
// my importations
import { ADD_MODIFICATION, ERROR_MODIFICATION, GET_ALL_MODIFICATIONS, LOADING_MODIFICATION, modification } from '../constants'
import { MARCHAND_TYPE } from '../types'

const token = localStorage.getItem('accessToken')

export const _loadingModification = () => (dispatch: any) => {
    dispatch({ type: LOADING_MODIFICATION })
}

export const _errorModification = (payload: any) => (dispatch: any) => {
    dispatch({ type: ERROR_MODIFICATION, payload })
}

export const _getAllModifications = (id: string) => async (dispatch: any) => {
    try {
        dispatch(_loadingModification())

        const res = await axios.get(`${modification}/store/${id}`, { headers: { Authorization: `Bearer ${token}` } })

        dispatch({ type: GET_ALL_MODIFICATIONS, payload: res.data })
    } catch (error: any) {
        toast.error(error?.response?.data?.message)
        dispatch(_errorModification(error?.response?.data?.message))
    }
}

export const _addModification = (
    data: FormData,
    marchand: MARCHAND_TYPE,
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
        dispatch(_loadingModification())

        console.log(data)

        const res = await axios.post(`${modification}`, data, { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' } })

        toast.success('Demande envoyée avec succès.')

        // reinitialisation des data
        // store
        setDataStore({
            adresse: marchand.store.adresse, certifie: marchand.store.certifie,
            description: marchand.store.description, email: marchand.store.email,
            frame: marchand.store.frame, livraison: marchand.store.livraison,
            name: marchand.store.name, region: marchand.store.region,
            serviceApresVente: marchand.store.serviceApresVente ? 'oui' : 'non', telephone: marchand.store.telephone.split(' ')[1],
            url: marchand.store.url, vitepay: marchand.store.vitepay,
        })
        setMarchandVitepay(marchand.store.vitepay)
        setFrame(marchand.store.frame)

        // network
        setDataNetwork({
            facebook: marchand.store.network.facebook, instagram: marchand.store.network.instagram,
            linkedin: marchand.store.network.linkedin
        })

        // tag
        setDataTag({
            categories: marchand.store.tags.categories, prixMaximum: marchand.store.tags.prixMaximum,
            prixMinimum: marchand.store.tags.prixMinimum, sousCategories: marchand.store.tags.sousCategories
        })
        setCategories_(marchand.store.tags.categories)
        setSousCategories_(marchand.store.tags.sousCategories)

        setCropDataLogo('')
        setCropDataCouverture('')
        setCropDataProdPhare1('')
        setCropDataProdPhare2('')
        setCropDataProdPhare3('')

        dispatch({ type: ADD_MODIFICATION, payload: res.data })
    } catch (error: any) {
        toast.error(error?.response?.data?.message)
        dispatch(_errorModification(error?.response?.data?.message))
    }
}