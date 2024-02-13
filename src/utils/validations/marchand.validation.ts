import { MARCHAND_AE_TYPE } from '../../pages/Signup'
import { REGEX } from './regex'


/************************************************************
 * AJOUT ET EDITION D'UN MARCHAND
 */
export type MARCHAND_VALIDATION_TYPE = {
    merchant?: {
        name?: string
        email?: string
        password?: string
        confirm_password?: string
    }
    store?: {
        name?: string
        url?: string
        adresse?: string
        region?: string
        telephone?: string
        email?: string
        vitepay?: boolean
        frame?: boolean
        certifie?: boolean
        livraison?: string
        serviceApresVente?: string
        description?: string
    }
    tag?: {
        categories?: string
        sousCategories?: string
        prixMaximum?: string
        prixMinimum?: string
    }
    network?: {
        facebook?: string
        instagram?: string
        linkedin?: string
    }
    logo?: string
    logoDimensionError?: boolean
    logoSizeError?: boolean
    logoTypeError?: boolean
    cover?: string
    couvertureDimensionError?: boolean
    couvertureSizeError?: boolean
    couvertureTypeError?: boolean
    product1?: string
    prodPhare1DimensionError?: boolean
    prodPhare1SizeError?: boolean
    prodPhare1TypeError?: boolean
    product2?: string
    prodPhare2DimensionError?: boolean
    prodPhare2SizeError?: boolean
    prodPhare2TypeError?: boolean
    product3?: string
    prodPhare3DimensionError?: boolean
    prodPhare3SizeError?: boolean
    prodPhare3TypeError?: boolean
}

// AJOUT VALIDATION
export const validation_marchand = (props: MARCHAND_AE_TYPE, level: '01' | '02') => {
    const { merchant, store, network, tag, logo, logoDimensionError, logoSizeError, logoTypeError, cover, couvertureDimensionError, couvertureSizeError, couvertureTypeError, product1, prodPhare1DimensionError, prodPhare1SizeError, prodPhare1TypeError, product2, prodPhare2DimensionError, prodPhare2SizeError, prodPhare2TypeError, product3, prodPhare3DimensionError, prodPhare3SizeError, prodPhare3TypeError } = props

    const initialError: MARCHAND_VALIDATION_TYPE = {
        merchant: { email: '', name: '', password: '', confirm_password: '' },
        store: { name: '', email: '', url: '', adresse: '', region: '', telephone: '', description: '' },
        network: { facebook: '', instagram: '', linkedin: '' },
        tag: { categories: '', sousCategories: '', prixMinimum: '', prixMaximum: '' },
        logo: '',
        logoDimensionError: false,
        logoSizeError: false,
        logoTypeError: false,
        cover: '',
        couvertureDimensionError: false,
        couvertureSizeError: false,
        couvertureTypeError: false,
        product1: '',
        prodPhare1DimensionError: false,
        prodPhare1SizeError: false,
        prodPhare1TypeError: false,
        product2: '',
        prodPhare2DimensionError: false,
        prodPhare2SizeError: false,
        prodPhare2TypeError: false,
        product3: '',
        prodPhare3DimensionError: false,
        prodPhare3SizeError: false,
        prodPhare3TypeError: false
    }

    let error = initialError

    /*** Pour les informations du marchand ***/
    if (level === '01') {
        // email
        if (!merchant?.email || merchant.email.trim() === '') error = { ...error, merchant: { ...error.merchant, email: '*Ce champ est obligatoire.' } }
        else if (REGEX.email_rg.test(merchant.email.trim()) === false) error = { ...error, merchant: { ...error.merchant, email: `*Cet email n'est pas de format valide.` } }
        // name
        if (!merchant?.name || merchant.name.trim() === '') error = { ...error, merchant: { ...error.merchant, name: '*Ce champ est obligatoire.' } }
        // mot de passe
        if (!merchant?.password) error = { ...error, merchant: { ...error.merchant, password: '*Ce champ est obligatoire.' } }
        else if (merchant.password.length < 8) error = { ...error, merchant: { ...error.merchant, password: '*Ce champ doit avoir au moins 8 caractères.' } }
        // mot de passe
        if (merchant?.password) {
            if (!merchant?.confirm_password) error = { ...error, merchant: { ...error.merchant, confirm_password: '*Ce champ est obligatoire.' } }
            else if (merchant.password !== merchant.confirm_password) error = { ...error, merchant: { ...error.merchant, confirm_password: '*Les mots de passe ne sont pas les mêmes.' } }
        }
    }

    if (level === '02') {
        /*** Pour les informations du store ***/
        // name
        if (!store?.name || store.name.trim() === '') error = { ...error, store: { ...error.store, name: '*Ce champ est obligatoire.' } }
        // email
        if (!store?.email || store.email.trim() === '') error = { ...error, store: { ...error.store, email: '*Ce champ est obligatoire.' } }
        else if (REGEX.email_rg.test(store.email.trim()) === false) error = { ...error, store: { ...error.store, email: `*Cet email n'est pas de format valide.` } }
        // url
        if (!store?.url || store.url.trim() === '') error = { ...error, store: { ...error.store, url: '*Ce champ est obligatoire.' } }
        else if (REGEX.url_rg.test(store.url.trim()) === false) error = { ...error, store: { ...error.store, url: `*Cet url n'est pas de format valide.` } }
        // adresse
        if (!store?.adresse || store.adresse.trim() === '') error = { ...error, store: { ...error.store, adresse: '*Ce champ est obligatoire.' } }
        // region
        if (!store?.region || store.region.trim() === '') error = { ...error, store: { ...error.store, region: '*Ce champ est obligatoire.' } }
        // telephone
        if (!store?.telephone || store.telephone.trim() === '') error = { ...error, store: { ...error.store, telephone: '*Ce champ est obligatoire.' } }
        else if (REGEX.telephone_rg.test(store.telephone.trim()) === false) error = { ...error, store: { ...error.store, telephone: `*Ce numéro de téléphone n'est pas de format valide.` } }
        // description
        if (!store?.description || store.description.trim() === '') error = { ...error, store: { ...error.store, description: '*Ce champ est obligatoire.' } }

        /*** Pour les informations du network ***/
        // url facebook
        if (network?.facebook && REGEX.url_rg.test(network.facebook.trim()) === false) error = { ...error, network: { ...error.network, facebook: `*Cet url n'est pas de format valide.` } }
        // url instagram
        if (network?.instagram && REGEX.url_rg.test(network.instagram.trim()) === false) error = { ...error, network: { ...error.network, instagram: `*Cet url n'est pas de format valide.` } }
        // url linkedin
        if (network?.linkedin && REGEX.url_rg.test(network.linkedin.trim()) === false) error = { ...error, network: { ...error.network, linkedin: `*Cet url n'est pas de format valide.` } }

        /*** Pour les informations du tag ***/
        // categories
        if (tag?.categories && tag.categories.length === 0) error = { ...error, tag: { ...error.tag, categories: `*Veuillez choisir au moins une catégorie.` } }

        /*** Pour les informations des images ***/
        // logo
        if (!logo || logo.trim() === '') error = { ...error, logo: '*Ce champ est obligatoire.' }
        else if (logoDimensionError) error = { ...error, logo: `*Veuillez corriger l'erreur ci-dessus.` }
        else if (logoSizeError) error = { ...error, logo: `*Veuillez corriger l'erreur ci-dessus.` }
        else if (logoTypeError) error = { ...error, logo: `*Veuillez corriger l'erreur ci-dessus.` }
        // couverture
        if (!cover || cover.trim() === '') error = { ...error, cover: '*Ce champ est obligatoire.' }
        else if (couvertureDimensionError) error = { ...error, cover: `*Veuillez corriger l'erreur ci-dessus.` }
        else if (couvertureSizeError) error = { ...error, cover: `*Veuillez corriger l'erreur ci-dessus.` }
        else if (couvertureTypeError) error = { ...error, cover: `*Veuillez corriger l'erreur ci-dessus.` }
        // image product1
        if (!product1 || product1.trim() === '') error = { ...error, product1: '*Ce champ est obligatoire.' }
        else if (prodPhare1DimensionError) error = { ...error, product1: `*Veuillez corriger l'erreur ci-dessus.` }
        else if (prodPhare1SizeError) error = { ...error, product1: `*Veuillez corriger l'erreur ci-dessus.` }
        else if (prodPhare1TypeError) error = { ...error, product1: `*Veuillez corriger l'erreur ci-dessus.` }
        // image product2
        if (!product2 || product2.trim() === '') error = { ...error, product2: '*Ce champ est obligatoire.' }
        else if (prodPhare2DimensionError) error = { ...error, product2: `*Veuillez corriger l'erreur ci-dessus.` }
        else if (prodPhare2SizeError) error = { ...error, product2: `*Veuillez corriger l'erreur ci-dessus.` }
        else if (prodPhare2TypeError) error = { ...error, product2: `*Veuillez corriger l'erreur ci-dessus.` }
        // image product3
        if (!product3 || product3.trim() === '') error = { ...error, product3: '*Ce champ est obligatoire.' }
        else if (prodPhare3DimensionError) error = { ...error, product3: `*Veuillez corriger l'erreur ci-dessus.` }
        else if (prodPhare3SizeError) error = { ...error, product3: `*Veuillez corriger l'erreur ci-dessus.` }
        else if (prodPhare3TypeError) error = { ...error, product3: `*Veuillez corriger l'erreur ci-dessus.` }
    }

    return { error, initialError }
}

// EDITION VALIDATION
export const validation_marchand_edit = (props: MARCHAND_AE_TYPE) => {
    const { store, network, tag, logo, logoDimensionError, logoSizeError, logoTypeError, cover, couvertureDimensionError, couvertureSizeError, couvertureTypeError, product1, prodPhare1DimensionError, prodPhare1SizeError, prodPhare1TypeError, product2, prodPhare2DimensionError, prodPhare2SizeError, prodPhare2TypeError, product3, prodPhare3DimensionError, prodPhare3SizeError, prodPhare3TypeError } = props

    const initialError: MARCHAND_VALIDATION_TYPE = {
        store: { name: '', email: '', url: '', adresse: '', region: '', telephone: '', description: '' },
        network: { facebook: '', instagram: '', linkedin: '' },
        tag: { categories: '', sousCategories: '', prixMinimum: '', prixMaximum: '' },
        logo: '',
        logoDimensionError: false,
        logoSizeError: false,
        logoTypeError: false,
        cover: '',
        couvertureDimensionError: false,
        couvertureSizeError: false,
        couvertureTypeError: false,
        product1: '',
        prodPhare1DimensionError: false,
        prodPhare1SizeError: false,
        prodPhare1TypeError: false,
        product2: '',
        prodPhare2DimensionError: false,
        prodPhare2SizeError: false,
        prodPhare2TypeError: false,
        product3: '',
        prodPhare3DimensionError: false,
        prodPhare3SizeError: false,
        prodPhare3TypeError: false
    }

    let error = initialError

    /*** Pour les informations du store ***/
    // name
    if (!store?.name || store.name.trim() === '') error = { ...error, store: { ...error.store, name: '*Ce champ est obligatoire.' } }
    // email
    if (!store?.email || store.email.trim() === '') error = { ...error, store: { ...error.store, email: '*Ce champ est obligatoire.' } }
    else if (REGEX.email_rg.test(store.email.trim()) === false) error = { ...error, store: { ...error.store, email: `*Cet email n'est pas de format valide.` } }
    // url
    if (!store?.url || store.url.trim() === '') error = { ...error, store: { ...error.store, url: '*Ce champ est obligatoire.' } }
    else if (REGEX.url_rg.test(store.url.trim()) === false) error = { ...error, store: { ...error.store, url: `*Cet url n'est pas de format valide.` } }
    // adresse
    if (!store?.adresse || store.adresse.trim() === '') error = { ...error, store: { ...error.store, adresse: '*Ce champ est obligatoire.' } }
    // region
    if (!store?.region || store.region.trim() === '') error = { ...error, store: { ...error.store, region: '*Ce champ est obligatoire.' } }
    // telephone
    if (!store?.telephone || store.telephone.trim() === '') error = { ...error, store: { ...error.store, telephone: '*Ce champ est obligatoire.' } }
    else if (REGEX.telephone_rg.test(store.telephone.trim()) === false) error = { ...error, store: { ...error.store, telephone: `*Ce numéro de téléphone n'est pas de format valide.` } }
    // description
    if (!store?.description || store.description.trim() === '') error = { ...error, store: { ...error.store, description: '*Ce champ est obligatoire.' } }

    /*** Pour les informations du network ***/
    // url facebook
    if (network?.facebook && REGEX.url_rg.test(network.facebook.trim()) === false) error = { ...error, network: { ...error.network, facebook: `*Cet url n'est pas de format valide.` } }
    // url instagram
    if (network?.instagram && REGEX.url_rg.test(network.instagram.trim()) === false) error = { ...error, network: { ...error.network, instagram: `*Cet url n'est pas de format valide.` } }
    // url linkedin
    if (network?.linkedin && REGEX.url_rg.test(network.linkedin.trim()) === false) error = { ...error, network: { ...error.network, linkedin: `*Cet url n'est pas de format valide.` } }

    /*** Pour les informations du tag ***/
    // categories
    if (tag?.categories && tag.categories.length === 0) error = { ...error, tag: { ...error.tag, categories: `*Veuillez choisir au moins une catégorie.` } }

    /*** Pour les informations des images ***/
    // logo
    if (!logo || logo.trim() === '') error = { ...error, logo: '*Ce champ est obligatoire.' }
    else if (logoDimensionError) error = { ...error, logo: `*Veuillez corriger l'erreur ci-dessus.` }
    else if (logoSizeError) error = { ...error, logo: `*Veuillez corriger l'erreur ci-dessus.` }
    else if (logoTypeError) error = { ...error, logo: `*Veuillez corriger l'erreur ci-dessus.` }
    // couverture
    if (!cover || cover.trim() === '') error = { ...error, cover: '*Ce champ est obligatoire.' }
    else if (couvertureDimensionError) error = { ...error, cover: `*Veuillez corriger l'erreur ci-dessus.` }
    else if (couvertureSizeError) error = { ...error, cover: `*Veuillez corriger l'erreur ci-dessus.` }
    else if (couvertureTypeError) error = { ...error, cover: `*Veuillez corriger l'erreur ci-dessus.` }
    // image product1
    if (!product1 || product1.trim() === '') error = { ...error, product1: '*Ce champ est obligatoire.' }
    else if (prodPhare1DimensionError) error = { ...error, product1: `*Veuillez corriger l'erreur ci-dessus.` }
    else if (prodPhare1SizeError) error = { ...error, product1: `*Veuillez corriger l'erreur ci-dessus.` }
    else if (prodPhare1TypeError) error = { ...error, product1: `*Veuillez corriger l'erreur ci-dessus.` }
    // image product2
    if (!product2 || product2.trim() === '') error = { ...error, product2: '*Ce champ est obligatoire.' }
    else if (prodPhare2DimensionError) error = { ...error, product2: `*Veuillez corriger l'erreur ci-dessus.` }
    else if (prodPhare2SizeError) error = { ...error, product2: `*Veuillez corriger l'erreur ci-dessus.` }
    else if (prodPhare2TypeError) error = { ...error, product2: `*Veuillez corriger l'erreur ci-dessus.` }
    // image product3
    if (!product3 || product3.trim() === '') error = { ...error, product3: '*Ce champ est obligatoire.' }
    else if (prodPhare3DimensionError) error = { ...error, product3: `*Veuillez corriger l'erreur ci-dessus.` }
    else if (prodPhare3SizeError) error = { ...error, product3: `*Veuillez corriger l'erreur ci-dessus.` }
    else if (prodPhare3TypeError) error = { ...error, product3: `*Veuillez corriger l'erreur ci-dessus.` }

    return { error, initialError }
}

/************************************************************
 * MODIFICATION DU MOT DE PASSE D'UN MARCHAND
 */
export type EDIT_MARCHAND_PASSWORD_TYPE = {
    current: string
    new_password: string
    new_confirm_password: string
}

export const validation_edit_marchand_password = (props: EDIT_MARCHAND_PASSWORD_TYPE) => {
    const { current, new_password, new_confirm_password } = props

    const initialError: EDIT_MARCHAND_PASSWORD_TYPE = { current: '', new_confirm_password: '', new_password: '' }

    let error = initialError

    // mot de passe actuel
    if (!current) error = { ...error, current: '*Ce champ est obligatoire.' }
    else if (current.length < 8) error = { ...error, current: '*Ce champ doit avoir au moins 8 caractères.' }
    // nouveau mot de passe
    if (!new_password) error = { ...error, new_password: '*Ce champ est obligatoire.' }
    else if (new_password.length < 8) error = { ...error, new_password: '*Ce champ doit avoir au moins 8 caractères.' }
    // confirmer mot de passe
    if (new_password) {
        if (!new_confirm_password) error = { ...error, new_confirm_password: '*Ce champ est obligatoire.' }
        else if (new_password !== new_confirm_password) error = { ...error, new_confirm_password: '*Les mots de passe ne sont pas les mêmes.' }
    }

    return { error, initialError }
}