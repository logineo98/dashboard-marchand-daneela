import { PACK_TYPE } from '../pages/Forfait'

/***************************************************************
 * ADMIN
***************************************************************/
export type ADMIN_TYPE = {
    id: string
    username: string
    name: string
    email: string
    password: string
}

export type INITIAL_ADMIN_STATE_TYPE = {
    connected: boolean
    admin: null | ADMIN_TYPE
    allAdmins: Array<ADMIN_TYPE>
    loadingAdmin: boolean
    error: any
}

/***************************************************************
 * MARCHAND
***************************************************************/
export type MARCHAND_TYPE = {
    email: string
    id: string
    name: string
    status: boolean
    store: {
        adresse: string
        certifie: boolean
        couverture: string
        createdAt: Date
        description: string
        email: string
        frame: boolean
        id: string
        livraison: 'Non disponible' | 'Gratuite' | 'Payante'
        logo: string
        merchantId: string
        name: string
        network: {
            createdAt: Date
            facebook: string
            id: string
            instagram: string
            linkedin: string
            updatedAt: Date
        }
        networkId: string
        produits: string[]
        region: string
        serviceApresVente: boolean
        status: string
        tagId: string
        tags: {
            categories: string[]
            createdAt: Date
            id: string
            prixMaximum: number
            prixMinimum: number
            sousCategories: string[]
            updatedAt: Date
        }
        telephone: string
        updatedAt: Date
        url: string
        vitepay: boolean
    }

}

export type INITIAL_MARCHAND_STATE_TYPE = {
    marchand: null | MARCHAND_TYPE
    allMarchands: Array<MARCHAND_TYPE>
    loadingMarchand: boolean
    error: any
}

/***************************************************************
 * MODIFICATION
***************************************************************/
export type MODIFICATION_TYPE = {
    adresse: string
    certifie: boolean
    couverture: string
    createdAt: Date
    description: string
    email: string
    frame: boolean
    id: string
    livraison: 'Non disponible' | 'Gratuite' | 'Payante'
    logo: string
    motif: string | null
    name: string
    network: {
        createdAt: Date
        facebook: string
        id: string
        instagram: string
        linkedin: string
        updatedAt: Date
    }
    networkId: string
    produits: string[]
    region: string
    serviceApresVente: boolean
    status: string
    store: {
        certifie: boolean
        createdAt: Date
        id: string
        name: string
        status: string
        url: string
        vitepay: boolean
    }
    storeId: string
    tagId: string
    tags: {
        categories: string[]
        createdAt: Date
        id: string
        prixMaximum: number
        prixMinimum: number
        sousCategories: string[]
        updatedAt: Date
    }
    telephone: string
    updatedAt: Date
    url: string
    vitepay: boolean
}

export type INITIAL_MODIFICATION_STATE_TYPE = {
    modification: null | MODIFICATION_TYPE
    allModifications: Array<MODIFICATION_TYPE>
    loadingModification: boolean
    error: any
}

/***************************************************************
 * CERTIFICATION
***************************************************************/
export type CERTIFICATION_TYPE = {
    id: string
    status: string
    motif: string | null
    storeId: string
    createdAt: Date
    updatedAt: Date
    store: {
        id: string
        name: string
        url: string
        vitepay: boolean
        certifie: boolean
        status: string
    }
}

export type INITIAL_CERTIFICATION_STATE_TYPE = {
    certification: null | CERTIFICATION_TYPE
    allCertifications: Array<CERTIFICATION_TYPE>
    loadingCertification: boolean
    error: any
}

/***************************************************************
 * PROMOTION
***************************************************************/
export type PROMOTION_TYPE = {
    id: string
    duree: number
    niveau: number
    debut: Date
    fin: Date
    montant: number
    slider: string
    status: string
    motif: null | string
    storeId: string
    createdAt: Date
    updatedAt: Date
    store: {
        id: string
        name: string
        url: string
        vitepay: boolean
        certifie: boolean
        status: string
        createdAt: Date
    }
}

export type INITIAL_PROMOTION_STATE_TYPE = {
    promotion: null | PROMOTION_TYPE
    allPromotions: Array<PROMOTION_TYPE>
    loadingPromotion: boolean
    error: any
}

/***************************************************************
 * FORFAIT
***************************************************************/
export type FORFAIT_TYPE = {
    createdAt: Date
    debut: null | Date
    duree: number
    fin: null | Date
    id: string
    latitude: number
    longitude: number
    montant: number
    motif: null | string
    status: string
    store: {
        certifie: boolean
        createdAt: Date
        id: string
        name: string
        status: string
        url: string
        vitepay: boolean
    }
    storeId: string
    type: PACK_TYPE
    updatedAt: Date
}

export type INITIAL_FORFAIT_STATE_TYPE = {
    forfait: null | FORFAIT_TYPE
    allForfaits: Array<FORFAIT_TYPE>
    loadingForfait: boolean
    error: any
}


