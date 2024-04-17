import React, { createRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Cropper, ReactCropperElement } from 'react-cropper'
// my importations
import { base64ToFile } from '../utils/functions'
import { ROOT_REDUCER_TYPE } from '../redux/store'
import Switch from '../components/common/switch/Switch'
import Loading from '../components/common/loading/Loading'
import CategoryCard from '../components/card/CategoryCard'
import { images_files_constants } from '../utils/constants'
import { _addMarchand } from '../redux/actions/marchand.action'
import SubCategoryCard from '../components/card/SubCategoryCard'
import AuthContainer from '../components/common/layout/auth/AuthContainer'
import { MARCHAND_VALIDATION_TYPE, validation_marchand } from '../utils/validations/marchand.validation'
// json
import regions from '../utils/json/regions.json'
import categories from '../utils/json/categories.json'


type TYPE_IMG_TYPE = 'logo' | 'couverture' | 'prod_phare_1' | 'prod_phare_2' | 'prod_phare_3'
export type MARCHAND_AE_TYPE = {
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
        categories?: string[]
        sousCategories?: string[]
        prixMaximum?: number
        prixMinimum?: number
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

const Signup = () => {
    const { loadingMarchand } = useSelector((state: ROOT_REDUCER_TYPE) => state.marchand)
    const dispatch = useDispatch<any>()

    // les data
    const data_marchand_init = { name: '', email: '', password: '', confirm_password: '' }
    const data_store_init = { name: '', email: '', url: '', adresse: '', region: '', telephone: '', description: '', vitepay: false, frame: false, certifie: false, livraison: 'Non disponible', serviceApresVente: 'non' }
    const data_network_init = { facebook: '', instagram: '', linkedin: '' }
    const data_tag_init: { categories: string[], sousCategories: string[], prixMaximum: number, prixMinimum: number } = { categories: [], sousCategories: [], prixMaximum: 25000, prixMinimum: 100 }

    // merchant
    const [dataMarchand, setDataMarchand] = useState(data_marchand_init)
    // store
    const [dataStore, setDataStore] = useState(data_store_init)
    const [marchandVitepay, setMarchandVitepay] = useState(false)
    const [frame, setFrame] = useState(false)
    // network
    const [dataNetwork, setDataNetwork] = useState(data_network_init)
    // tag
    const [dataTag, setDataTag] = useState(data_tag_init)
    const [categories_, setCategories_] = useState(data_tag_init.categories)
    const [sousCategories_, setSousCategories_] = useState(data_tag_init.sousCategories)

    const [err, setErr] = useState<MARCHAND_VALIDATION_TYPE>()

    const [level, setLevel] = useState<'01' | '02'>('01')
    // logo
    const [logoImg, setLogoImg] = useState('')
    const [cropDataLogo, setCropDataLogo] = useState('')
    const [logoDimension, setLogoDimension] = useState<{ height: number, width: number }>()
    const [logoDimensionError, setLogoDimensionError] = useState(false)
    const [logoSizeError, setLogoSizeError] = useState(false)
    const [logoTypeError, setLogoTypeError] = useState(false)
    const cropperRefLogo = createRef<ReactCropperElement>()
    // couverture
    const [couvertureImg, setCouvertureImg] = useState('')
    const [cropDataCouverture, setCropDataCouverture] = useState('')
    const [couvertureDimension, setCouvertureDimension] = useState<{ height: number, width: number }>()
    const [couvertureDimensionError, setCouvertureDimensionError] = useState(false)
    const [couvertureSizeError, setCouvertureSizeError] = useState(false)
    const [couvertureTypeError, setCouvertureTypeError] = useState(false)
    const cropperRefCouverture = createRef<ReactCropperElement>()
    // produits phares
    // 1
    const [prodPhareImg1, setProdPhareImg1] = useState('')
    const [cropDataProdPhare1, setCropDataProdPhare1] = useState('')
    const [prodPhare1Dimension, setProdPhare1Dimension] = useState<{ height: number, width: number }>()
    const [prodPhare1DimensionError, setProdPhare1DimensionError] = useState(false)
    const [prodPhare1SizeError, setProdPhare1SizeError] = useState(false)
    const [prodPhare1TypeError, setProdPhare1TypeError] = useState(false)
    const cropperRefprodPhare1 = createRef<ReactCropperElement>()
    // 2
    const [prodPhareImg2, setProdPhareImg2] = useState('')
    const [cropDataProdPhare2, setCropDataProdPhare2] = useState('')
    const [prodPhare2Dimension, setProdPhare2Dimension] = useState<{ height: number, width: number }>()
    const [prodPhare2DimensionError, setProdPhare2DimensionError] = useState(false)
    const [prodPhare2SizeError, setProdPhare2SizeError] = useState(false)
    const [prodPhare2TypeError, setProdPhare2TypeError] = useState(false)
    const cropperRefprodPhare2 = createRef<ReactCropperElement>()
    // 3
    const [prodPhareImg3, setProdPhareImg3] = useState('')
    const [cropDataProdPhare3, setCropDataProdPhare3] = useState('')
    const [prodPhare3Dimension, setProdPhare3Dimension] = useState<{ height: number, width: number }>()
    const [prodPhare3DimensionError, setProdPhare3DimensionError] = useState(false)
    const [prodPhare3SizeError, setProdPhare3SizeError] = useState(false)
    const [prodPhare3TypeError, setProdPhare3TypeError] = useState(false)
    const cropperRefprodPhare3 = createRef<ReactCropperElement>()

    const checkImageDimensions = (file: File, type: TYPE_IMG_TYPE) => {
        const reader = new FileReader()

        reader.onload = (e) => {
            const img = new Image()

            img.onload = () => {
                const width = img.width
                const height = img.height

                if (type === 'logo') {
                    setLogoDimension({ height, width })
                    if (width === 100 && height === 100) {
                        setLogoDimensionError(false)
                    } else {
                        setLogoDimensionError(true)
                    }
                } else if (type === 'couverture') {
                    setCouvertureDimension({ height, width })
                    if (width === 800 && height === 400) {
                        setCouvertureDimensionError(false)
                    } else {
                        setCouvertureDimensionError(true)
                    }
                } else if (type === 'prod_phare_1' || type === 'prod_phare_2' || type === 'prod_phare_3') {
                    type === 'prod_phare_1' && setProdPhare1Dimension({ height, width })
                    type === 'prod_phare_2' && setProdPhare2Dimension({ height, width })
                    type === 'prod_phare_3' && setProdPhare3Dimension({ height, width })

                    if (width === 300 && height === 300) {
                        type === 'prod_phare_1' && setProdPhare1DimensionError(false)
                        type === 'prod_phare_2' && setProdPhare2DimensionError(false)
                        type === 'prod_phare_3' && setProdPhare3DimensionError(false)
                    } else {
                        type === 'prod_phare_1' && setProdPhare1DimensionError(true)
                        type === 'prod_phare_2' && setProdPhare2DimensionError(true)
                        type === 'prod_phare_3' && setProdPhare3DimensionError(true)
                    }
                }
            }

            img.src = e.target!.result as string
        }

        reader.readAsDataURL(file)
    }

    const checkImageSize = (file: File, type: TYPE_IMG_TYPE) => {
        if (type === 'logo') {
            if (images_files_constants.MAX_SIZE < file.size) setLogoSizeError(true)
        } else if (type === 'couverture') {
            if (images_files_constants.MAX_SIZE_COUVERTURE < file.size) setCouvertureSizeError(true)
        } else if (type === 'prod_phare_1') {
            if (images_files_constants.MAX_SIZE < file.size) setProdPhare1SizeError(true)
        } else if (type === 'prod_phare_2') {
            if (images_files_constants.MAX_SIZE < file.size) setProdPhare2SizeError(true)
        } else if (type === 'prod_phare_3') {
            if (images_files_constants.MAX_SIZE < file.size) setProdPhare3SizeError(true)
        }
    }

    const checkImageType = (file: File, type: TYPE_IMG_TYPE) => {
        if (type === 'logo') {
            if (!images_files_constants.FILES_ALLOW_TYPES.includes(file.type)) setLogoTypeError(true)
        } else if (type === 'couverture') {
            if (!images_files_constants.FILES_ALLOW_TYPES.includes(file.type)) setCouvertureTypeError(true)
        } else if (type === 'prod_phare_1') {
            if (!images_files_constants.FILES_ALLOW_TYPES.includes(file.type)) setProdPhare1TypeError(true)
        } else if (type === 'prod_phare_2') {
            if (!images_files_constants.FILES_ALLOW_TYPES.includes(file.type)) setProdPhare2TypeError(true)
        } else if (type === 'prod_phare_3') {
            if (!images_files_constants.FILES_ALLOW_TYPES.includes(file.type)) setProdPhare3TypeError(true)
        }
    }

    const handleChooseImg = (e: React.ChangeEvent<HTMLInputElement>, type: TYPE_IMG_TYPE) => {
        const file = e.target.files![0]

        if (file) {
            if (type === 'logo') {
                // init
                setLogoDimensionError(false)
                setLogoTypeError(false)
                setLogoSizeError(false)
                setErr({ ...err, logo: '' })
                // check
                checkImageDimensions(file, type)
                checkImageSize(file, type)
                checkImageType(file, type)
                setLogoImg(URL.createObjectURL(file))
            } else if (type === 'couverture') {
                // init
                setCouvertureDimensionError(false)
                setCouvertureTypeError(false)
                setCouvertureSizeError(false)
                setErr({ ...err, cover: '' })
                // check
                checkImageDimensions(file, type)
                checkImageSize(file, type)
                checkImageType(file, type)
                setCouvertureImg(URL.createObjectURL(file))
            } else if (type === 'prod_phare_1') {
                // init
                setProdPhare1DimensionError(false)
                setProdPhare1TypeError(false)
                setProdPhare1SizeError(false)
                setErr({ ...err, product1: '' })
                // check
                checkImageDimensions(file, type)
                checkImageSize(file, type)
                checkImageType(file, type)
                setProdPhareImg1(URL.createObjectURL(file))
            } else if (type === 'prod_phare_2') {
                // init
                setProdPhare2DimensionError(false)
                setProdPhare2TypeError(false)
                setProdPhare2SizeError(false)
                setErr({ ...err, product2: '' })
                // check
                checkImageDimensions(file, type)
                checkImageSize(file, type)
                checkImageType(file, type)
                setProdPhareImg2(URL.createObjectURL(file))
            } else if (type === 'prod_phare_3') {
                // init
                setProdPhare3DimensionError(false)
                setProdPhare3TypeError(false)
                setProdPhare3SizeError(false)
                setErr({ ...err, product3: '' })
                // check
                checkImageDimensions(file, type)
                checkImageSize(file, type)
                checkImageType(file, type)
                setProdPhareImg3(URL.createObjectURL(file))
            }
        } else {
            if (type === 'logo') {
                setLogoImg('')
                setCropDataLogo('')
                setLogoDimension(undefined)
                setLogoDimensionError(false)
                setLogoSizeError(false)
                setLogoTypeError(false)
                setErr({ ...err, logo: '' })
            } else if (type === 'couverture') {
                setCouvertureImg('')
                setCropDataCouverture('')
                setCouvertureDimension(undefined)
                setCouvertureDimensionError(false)
                setCouvertureSizeError(false)
                setCouvertureTypeError(false)
                setErr({ ...err, cover: '' })
            } else if (type === 'prod_phare_1') {
                setProdPhareImg1('')
                setCropDataProdPhare1('')
                setProdPhare1Dimension(undefined)
                setProdPhare1DimensionError(false)
                setProdPhare1SizeError(false)
                setProdPhare1TypeError(false)
                setErr({ ...err, product1: '' })
            } else if (type === 'prod_phare_2') {
                setProdPhareImg2('')
                setCropDataProdPhare2('')
                setProdPhare2Dimension(undefined)
                setProdPhare2DimensionError(false)
                setProdPhare2SizeError(false)
                setProdPhare2TypeError(false)
                setErr({ ...err, product2: '' })
            } else if (type === 'prod_phare_3') {
                setProdPhareImg3('')
                setCropDataProdPhare3('')
                setProdPhare3Dimension(undefined)
                setProdPhare3DimensionError(false)
                setProdPhare3SizeError(false)
                setProdPhare3TypeError(false)
                setErr({ ...err, product3: '' })
            }
        }
    }

    const getCropData = (type: TYPE_IMG_TYPE) => {
        if (type === 'logo') {
            if (typeof cropperRefLogo.current?.cropper !== 'undefined') {
                setCropDataLogo(cropperRefLogo.current?.cropper.getCroppedCanvas().toDataURL())
                setLogoImg('')
                setLogoDimension(undefined)
                setLogoDimensionError(false)
                setErr({ ...err, logo: '' })
            }
        } else if (type === 'couverture') {
            if (typeof cropperRefCouverture.current?.cropper !== 'undefined') {
                setCropDataCouverture(cropperRefCouverture.current?.cropper.getCroppedCanvas().toDataURL())
                setCouvertureImg('')
                setCouvertureDimension(undefined)
                setCouvertureDimensionError(false)
                setErr({ ...err, cover: '' })
            }
        } else if (type === 'prod_phare_1') {
            if (typeof cropperRefprodPhare1.current?.cropper !== 'undefined') {
                setCropDataProdPhare1(cropperRefprodPhare1.current?.cropper.getCroppedCanvas().toDataURL())
                setProdPhareImg1('')
                setProdPhare1Dimension(undefined)
                setProdPhare1DimensionError(false)
                setErr({ ...err, product1: '' })
            }
        } else if (type === 'prod_phare_2') {
            if (typeof cropperRefprodPhare2.current?.cropper !== 'undefined') {
                setCropDataProdPhare2(cropperRefprodPhare2.current?.cropper.getCroppedCanvas().toDataURL())
                setProdPhareImg2('')
                setProdPhare2Dimension(undefined)
                setProdPhare2DimensionError(false)
                setErr({ ...err, product2: '' })
            }
        } else if (type === 'prod_phare_3') {
            if (typeof cropperRefprodPhare3.current?.cropper !== 'undefined') {
                setCropDataProdPhare3(cropperRefprodPhare3.current?.cropper.getCroppedCanvas().toDataURL())
                setProdPhareImg3('')
                setProdPhare3Dimension(undefined)
                setProdPhare3DimensionError(false)
                setErr({ ...err, product3: '' })
            }
        }
    }

    // level 1
    // const onBlur = () => {
    //     const { error, initialError } = validation_marchand({ merchant: dataMarchand }, '01')

    //     if (error.merchant?.email !== initialError.merchant?.email ||
    //         error.merchant?.name !== initialError.merchant?.name ||
    //         error.merchant?.password !== initialError.merchant?.password ||
    //         error.merchant?.confirm_password !== initialError.merchant?.confirm_password) {
    //         setErr(error)
    //     } else {
    //         setErr(initialError)
    //     }
    // }
    const handleMouveLevel2 = () => {
        const { error, initialError } = validation_marchand({ merchant: dataMarchand }, '01')

        if (error.merchant?.email !== initialError.merchant?.email ||
            error.merchant?.name !== initialError.merchant?.name ||
            error.merchant?.password !== initialError.merchant?.password ||
            error.merchant?.confirm_password !== initialError.merchant?.confirm_password) {
            setErr(error)
        } else {
            setErr(initialError)

            setLevel('02')
        }
    }

    // leve 2
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const { error, initialError } = validation_marchand({
            store: dataStore,
            network: dataNetwork,
            tag: { ...dataTag, categories: categories_, sousCategories: sousCategories_ },
            logo: cropDataLogo ? cropDataLogo : logoImg,
            logoDimensionError,
            logoSizeError,
            logoTypeError,
            cover: cropDataCouverture ? cropDataCouverture : couvertureImg,
            couvertureDimensionError,
            couvertureSizeError,
            couvertureTypeError,
            product1: cropDataProdPhare1 ? cropDataProdPhare1 : prodPhareImg1,
            prodPhare1DimensionError,
            prodPhare1TypeError,
            prodPhare1SizeError,
            product2: cropDataProdPhare2 ? cropDataProdPhare2 : prodPhareImg2,
            prodPhare2DimensionError,
            prodPhare2SizeError,
            prodPhare2TypeError,
            product3: cropDataProdPhare3 ? cropDataProdPhare3 : prodPhareImg3,
            prodPhare3DimensionError,
            prodPhare3SizeError,
            prodPhare3TypeError
        }, '02')

        if (error.store?.name !== initialError.store?.name ||
            error.store?.name !== initialError.store?.name ||
            error.store?.url !== initialError.store?.url ||
            error.store?.adresse !== initialError.store?.adresse ||
            error.store?.region !== initialError.store?.region ||
            error.store?.telephone !== initialError.store?.telephone ||
            error.store?.description !== initialError.store?.description ||
            error.network?.facebook !== initialError.network?.facebook ||
            error.network?.instagram !== initialError.network?.instagram ||
            error.network?.linkedin !== initialError.network?.linkedin ||
            error.tag?.categories !== initialError.tag?.categories ||
            error.logo !== initialError.logo ||
            error.logoDimensionError !== initialError.logoDimensionError ||
            error.logoSizeError !== initialError.logoSizeError ||
            error.logoTypeError !== initialError.logoTypeError ||
            error.cover !== initialError.cover ||
            error.couvertureDimensionError !== initialError.couvertureDimensionError ||
            error.couvertureSizeError !== initialError.couvertureSizeError ||
            error.couvertureTypeError !== initialError.couvertureTypeError ||
            error.product1 !== initialError.product1 ||
            error.prodPhare1DimensionError !== initialError.prodPhare1DimensionError ||
            error.prodPhare1SizeError !== initialError.prodPhare1SizeError ||
            error.prodPhare1TypeError !== initialError.prodPhare1TypeError ||
            error.product2 !== initialError.product2 ||
            error.prodPhare2DimensionError !== initialError.prodPhare2DimensionError ||
            error.prodPhare2SizeError !== initialError.prodPhare2SizeError ||
            error.prodPhare2TypeError !== initialError.prodPhare2TypeError ||
            error.product3 !== initialError.product3 ||
            error.prodPhare1DimensionError !== initialError.prodPhare1DimensionError ||
            error.prodPhare1SizeError !== initialError.prodPhare1SizeError ||
            error.prodPhare1TypeError !== initialError.prodPhare1TypeError
        ) {
            setErr(error)
        } else {
            setErr(initialError)

            const data = new FormData()

            data.append('merchant', JSON.stringify({
                name: dataMarchand.name,
                email: dataMarchand.email,
                password: dataMarchand.password,
            }))

            data.append('store', JSON.stringify({
                ...dataStore,
                frame,
                vitepay: marchandVitepay,
                telephone: `+223 ${dataStore.telephone}`,
                serviceApresVente: dataStore.serviceApresVente === 'oui' ? true : false
            }))

            data.append('tag', JSON.stringify({
                ...dataTag,
                categories: categories_,
                sousCategories: sousCategories_
            }))

            data.append('network', JSON.stringify(dataNetwork))

            data.append('logo', base64ToFile(cropDataLogo, 'logo'))
            data.append('cover', base64ToFile(cropDataCouverture, 'couverture'))
            data.append('product1', base64ToFile(cropDataProdPhare1, 'prod_phare_1'))
            data.append('product2', base64ToFile(cropDataProdPhare2, 'prod_phare_2'))
            data.append('product3', base64ToFile(cropDataProdPhare3, 'prod_phare_3'))

            dispatch(_addMarchand(
                data,
                setLevel,
                setDataMarchand,
                setDataStore,
                setMarchandVitepay,
                setFrame,
                setDataNetwork,
                setDataTag,
                setCategories_,
                setSousCategories_,
                setCropDataLogo,
                setCropDataCouverture,
                setCropDataProdPhare1,
                setCropDataProdPhare2,
                setCropDataProdPhare3
            ))
        }
    }

    return (
        loadingMarchand ?
            <div style={{ width: '100%', height: '100vh', display: 'flex', justifyContent: 'center' }}>
                <Loading width='100' />
            </div> :
            <AuthContainer title='Créer un compte' info='Veuillez saisir vos informations' signup width={730}>
                <div className='signup_container'>
                    {/* level */}
                    <div className='level_container'>
                        <p className={level === '01' ? 'level active' : 'level'}>01</p>
                        <p className='level_separator'></p>
                        <p className={level === '02' ? 'level active' : 'level'}>02</p>
                    </div>
                    {/* formulaire inscription */}
                    <form className='form_signup_container' onSubmit={handleSubmit} encType='multipart/form-data'>
                        {/* level 1 */}
                        {level === '01' &&
                            <div className='level_1_container'>
                                {/* email */}
                                <div className='label_input_error_container'>
                                    <label htmlFor='email' className='_label'>Adresse email *</label>
                                    <input type='text' name='email' id='email' placeholder='ex: exemple@domaine.com' value={dataMarchand.email} onChange={e => setDataMarchand({ ...dataMarchand, email: e.target.value })} className='_input' />
                                    <div className='error_container'>
                                        {err?.merchant?.email && <span className='error'>{err.merchant.email}</span>}
                                    </div>
                                </div>
                                {/* nom et prénom */}
                                <div className='label_input_error_container'>
                                    <label htmlFor='name' className='_label'>Prénom et nom *</label>
                                    <input type='text' name='name' id='name' placeholder='ex: Cheick Oumar Diabaté' value={dataMarchand.name} onChange={e => setDataMarchand({ ...dataMarchand, name: e.target.value })} className='_input' />
                                    <div className='error_container'>
                                        {err?.merchant?.name && <span className='error'>{err.merchant.name}</span>}
                                    </div>
                                </div>
                                {/* mot de passe */}
                                <div className='label_input_error_container'>
                                    <label htmlFor='password' className='_label'>Mot de passe *</label>
                                    <input type='password' name='password' id='password' placeholder='Mot de passe' value={dataMarchand.password} onChange={e => setDataMarchand({ ...dataMarchand, password: e.target.value })} className='_input' />
                                    <div className='error_container'>
                                        {err?.merchant?.password && <span className='error'>{err.merchant.password}</span>}
                                    </div>
                                </div>
                                {/* confirmer le mot de passe */}
                                <div className='label_input_error_container'>
                                    <label htmlFor='confirm_password' className='_label'>Confirmer le mot de passe *</label>
                                    <input type='password' name='confirm_password' id='confirm_password' placeholder='Confirmer le mot de passe' value={dataMarchand.confirm_password} onChange={e => setDataMarchand({ ...dataMarchand, confirm_password: e.target.value })} className='_input' />
                                    <div className='error_container'>
                                        {err?.merchant?.confirm_password && <span className='error'>{err.merchant.confirm_password}</span>}
                                    </div>
                                </div>
                                {/* bouton suivant */}
                                <div className='next_btn_container'>
                                    <span className='next_btn' onClick={handleMouveLevel2}>Suivant</span>
                                </div>
                            </div>
                        }
                        {/* level 2 */}
                        {level === '02' &&
                            <div className='about_shop_container'>
                                {/* information de la boutique */}
                                <div className='about_shop'>
                                    <h1 className='about_shop_title'>Information de la boutique</h1>
                                    <div className='about_shop_content_container'>
                                        <div className='label_input_error_container'>
                                            <label htmlFor='shop_name' className='_label'>Marchand/Nom de la boutique en ligne *</label>
                                            <input type='text' name='shop_name' id='shop_name' placeholder='ex: Boutique' value={dataStore.name} onChange={e => setDataStore({ ...dataStore, name: e.target.value })} className='_input' />
                                            <div className='error_container'>
                                                {err?.store?.name && <span className='error'>{err.store.name}</span>}
                                            </div>
                                        </div>
                                        <div className='label_input_error_container'>
                                            <label htmlFor='shop_email' className='_label'>Email de la boutique *</label>
                                            <input type='text' name='shop_email' id='shop_email' placeholder='ex: exemple@domaine.com' value={dataStore.email} onChange={e => setDataStore({ ...dataStore, email: e.target.value })} className='_input' />
                                            <div className='error_container'>
                                                {err?.store?.email && <span className='error'>{err.store.email}</span>}
                                            </div>
                                        </div>
                                        <div className='label_input_error_container'>
                                            <label htmlFor='shop_site_url' className='_label'>URL du site web *</label>
                                            <input type='text' name='shop_site_url' id='shop_site_url' placeholder='ex: https://nomdudomaine.com' value={dataStore.url} onChange={e => setDataStore({ ...dataStore, url: e.target.value })} className='_input' />
                                            <div className='error_container'>
                                                {err?.store?.url && <span className='error'>{err.store.url}</span>}
                                            </div>
                                        </div>
                                        <div className='label_input_error_container'>
                                            <label htmlFor='shop_adresse' className='_label'>Adresse de la boutique *</label>
                                            <input type='text' name='shop_adresse' id='shop_adresse' placeholder='ex: Kalaban coura' value={dataStore.adresse} onChange={e => setDataStore({ ...dataStore, adresse: e.target.value })} className='_input' />
                                            <div className='error_container'>
                                                {err?.store?.adresse && <span className='error'>{err.store.adresse}</span>}
                                            </div>
                                        </div>
                                        <div className='label_input_error_container'>
                                            <label htmlFor='shop_region' className='_label'>Région *</label>
                                            <select name='shop_region' id='shop_region' value={dataStore.region} onChange={e => setDataStore({ ...dataStore, region: e.target.value })} className='_select_container'>
                                                <option value='' className='_select'>Région</option>
                                                {regions.map(region => <option key={region.id} value={region.name} className='_select'>{region.name}</option>)}
                                            </select>
                                            <div className='error_container'>
                                                {err?.store?.region && <span className='error'>{err.store.region}</span>}
                                            </div>
                                        </div>
                                        <div className='label_input_error_container'>
                                            <label htmlFor='shop_num_tel' className='_label'>Numéro de téléphone de la boutique *</label>
                                            <div className='indicatif_tel_container'>
                                                <select name='shop_tel_indicatif' className='_select_container' disabled>
                                                    <option value='+223' className='_select'>+223</option>
                                                </select>
                                                <input type='tel' name='shop_num_tel' id='shop_num_tel' placeholder='ex: 20244715' value={dataStore.telephone} onChange={e => setDataStore({ ...dataStore, telephone: e.target.value })} className='_input' />
                                            </div>
                                            <div className='error_container'>
                                                {err?.store?.telephone && <span className='error'>{err.store.telephone}</span>}
                                            </div>
                                        </div>
                                        <div className='label_input_error_container'>
                                            <label htmlFor='shop_description' className='_label'>Description de la boutique *</label>
                                            <textarea name='shop_description' id='shop_description' placeholder='Description de la boutique *' value={dataStore.description} onChange={e => setDataStore({ ...dataStore, description: e.target.value })} className='_textarea'></textarea>
                                            <div className='error_container'>
                                                {err?.store?.description && <span className='error'>{err.store.description}</span>}
                                            </div>
                                        </div>
                                        <div className='switch_container_'>
                                            <span className='switch_title'>Êtes-vous un marchand Vitepay ?</span>
                                            <Switch editable active={marchandVitepay} setActive={setMarchandVitepay} />
                                        </div>
                                        <div className='switch_container_'>
                                            <span className='switch_title'>Le site peut-il s'afficher sur daneela ?</span>
                                            <Switch editable active={frame} setActive={setFrame} />
                                        </div>
                                    </div>
                                </div>
                                {/* lien des reseaux sociaux */}
                                <div className='about_shop'>
                                    <h1 className='about_shop_title'>Liens des réseaux sociaux</h1>
                                    <div className='about_shop_content_container'>
                                        <div className='label_input_error_container'>
                                            <label htmlFor='shop_facebook_url' className='_label'>Facebook</label>
                                            <input type='text' name='shop_facebook_url' id='shop_facebook_url' placeholder='Lien du compte facebook' value={dataNetwork.facebook} onChange={e => setDataNetwork({ ...dataNetwork, facebook: e.target.value })} className='_input' />
                                            <div className='error_container'>
                                                {err?.network?.facebook && <span className='error'>{err.network.facebook}</span>}
                                            </div>
                                        </div>
                                        <div className='label_input_error_container'>
                                            <label htmlFor='shop_instagram_url' className='_label'>Instagram</label>
                                            <input type='text' name='shop_instagram_url' id='shop_instagram_url' placeholder='Lien du compte instagram' value={dataNetwork.instagram} onChange={e => setDataNetwork({ ...dataNetwork, instagram: e.target.value })} className='_input' />
                                            <div className='error_container'>
                                                {err?.network?.instagram && <span className='error'>{err.network.instagram}</span>}
                                            </div>
                                        </div>
                                        <div className='label_input_error_container'>
                                            <label htmlFor='shop_linkedin_url' className='_label'>Linkedin</label>
                                            <input type='text' name='shop_linkedin_url' id='shop_linkedin_url' placeholder='Lien du compte linkedin' value={dataNetwork.linkedin} onChange={e => setDataNetwork({ ...dataNetwork, linkedin: e.target.value })} className='_input' />
                                            <div className='error_container'>
                                                {err?.network?.linkedin && <span className='error'>{err.network.linkedin}</span>}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* catégories et sous catégories */}
                                <div className='about_shop'>
                                    <h1 className='about_shop_title'>Catégories et sous catégories</h1>
                                    <div className='about_shop_content_container'>
                                        {/* categories */}
                                        <div className='category_container'>
                                            <h2 className='category_title'>Catégories</h2>
                                            <div className='category_content_container'>
                                                {categories.map(category => <CategoryCard key={category.id} name={category.name} editable categories={categories_} setCategories={setCategories_} sousCategories={sousCategories_} setSousCategories={setSousCategories_} />)}
                                            </div>
                                            <div className='error_container'>
                                                {err?.tag?.categories && <span className='error'>{err.tag.categories}</span>}
                                            </div>
                                        </div>

                                        {/* sous categories */}
                                        <div className='category_container'>
                                            <h2 className='category_title'>Sous catégories</h2>
                                        </div>
                                        {categories.map(category => <SubCategoryCard key={category.id} category={category} active={categories_.includes(category.name)} sousCategories={sousCategories_} setSousCategories={setSousCategories_} />)}
                                    </div>
                                </div>
                                {/* fourchette de prix */}
                                <div className='f_serv_sup_container'>
                                    <h1 className='f_serv_sup_title'>Fouchette de prix</h1>
                                    <div className='f_serv_sup_content_container'>
                                        {/* min */}
                                        <div className='fourchette'>
                                            <label htmlFor='min' className='fourchette_label'>Min *</label>
                                            <select name='min' id='min' value={dataTag.prixMinimum} onChange={e => setDataTag({ ...dataTag, prixMinimum: parseInt(e.target.value, 10) })} className='fourchette_select_container'>
                                                <option value={100}>100</option>
                                                <option value={1000}>1.000</option>
                                                <option value={25000}>25.000</option>
                                            </select>
                                        </div>
                                        {/* max */}
                                        <div className='fourchette'>
                                            <label htmlFor='max' className='fourchette_label'>Max *</label>
                                            <select name='max' id='max' value={dataTag.prixMaximum} onChange={e => setDataTag({ ...dataTag, prixMaximum: parseInt(e.target.value, 10) })} className='fourchette_select_container'>
                                                <option value={25000}>25.000</option>
                                                <option value={30000}>30.000</option>
                                                <option value={100000}>100.000</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                {/* services supplementaires */}
                                <div className='f_serv_sup_container'>
                                    <h1 className='f_serv_sup_title'>Services supplementaires</h1>
                                    <div className='f_serv_sup_content_container'>
                                        {/* livraison */}
                                        <div className='liv_serv_ap_vente_container'>
                                            <h2 className='liv_serv_ap_vente_title'>Livraison :</h2>
                                            <div className='liv_serv_ap_vente_content_container'>
                                                <div className='liv_serv_ap_vente_content'>
                                                    <label htmlFor='non_disponible' className='liv_serv_ap_vente_content_title'>Non disponible</label>
                                                    <input type='radio' name='livraison' id='non_disponible' checked={dataStore.livraison === 'Non disponible'} value='Non disponible' onChange={e => setDataStore({ ...dataStore, livraison: e.target.value })} className='liv_serv_ap_vente_content_radio_btn' />
                                                </div>
                                                <div className='liv_serv_ap_vente_content'>
                                                    <label htmlFor='gratuite' className='liv_serv_ap_vente_content_title'>Gratuite</label>
                                                    <input type='radio' name='livraison' id='gratuite' checked={dataStore.livraison === 'Gratuite'} value='Gratuite' onChange={e => setDataStore({ ...dataStore, livraison: e.target.value })} className='liv_serv_ap_vente_content_radio_btn' />
                                                </div>
                                                <div className='liv_serv_ap_vente_content'>
                                                    <label htmlFor='payante' className='liv_serv_ap_vente_content_title'>Payante</label>
                                                    <input type='radio' name='livraison' id='payante' checked={dataStore.livraison === 'Payante'} value='Payante' onChange={e => setDataStore({ ...dataStore, livraison: e.target.value })} className='liv_serv_ap_vente_content_radio_btn' />
                                                </div>
                                            </div>
                                        </div>

                                        {/* service après vente */}
                                        <div className='liv_serv_ap_vente_container'>
                                            <h2 className='liv_serv_ap_vente_title'>Services après vente :</h2>
                                            <div className='liv_serv_ap_vente_content_container'>
                                                <div className='liv_serv_ap_vente_content'>
                                                    <label htmlFor='oui' className='liv_serv_ap_vente_content_title'>Oui</label>
                                                    <input type='radio' name='serv_ap_vente' id='oui' value='oui' checked={dataStore.serviceApresVente === 'oui'} onChange={e => setDataStore({ ...dataStore, serviceApresVente: e.target.value })} className='liv_serv_ap_vente_content_radio_btn' />
                                                </div>
                                                <div className='liv_serv_ap_vente_content'>
                                                    <label htmlFor='non' className='liv_serv_ap_vente_content_title'>Non</label>
                                                    <input type='radio' name='serv_ap_vente' id='non' checked={dataStore.serviceApresVente === 'non'} value='non' onChange={e => setDataStore({ ...dataStore, serviceApresVente: e.target.value })} className='liv_serv_ap_vente_content_radio_btn' />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* logo et image de couverture */}
                                <div className='logo_bg_img_container'>
                                    {/* importation du logo */}
                                    <div className='choose_photo_container'>
                                        <span className='choose_photo_text'>Veuillez importer le logo</span>
                                        <span className='choose_photo_size'>(100 x 100)</span>
                                        <label htmlFor='logo' className='choose_photo_btn'>
                                            Choisir le logo
                                            <input type='file' name='logo' id='logo' accept='image/*' onChange={(e) => handleChooseImg(e, 'logo')} style={{ display: 'none' }} />
                                        </label>
                                    </div>
                                    {/* redimensionner le logo */}
                                    {(logoDimensionError && !logoTypeError && !logoSizeError) &&
                                        <div className='redimensionner_container'>
                                            <Cropper
                                                ref={cropperRefLogo}
                                                style={{ height: 100, maxWidth: '100%', width: '100%', marginBottom: 15, }}
                                                zoomTo={0}
                                                src={logoImg}
                                                viewMode={1}
                                                cropBoxResizable={false}
                                                initialAspectRatio={1}
                                                aspectRatio={1}
                                                minCropBoxHeight={100}
                                                minCropBoxWidth={100}
                                                background={true}
                                                responsive={true}
                                                autoCropArea={1}
                                                guides={false}
                                                data={{ height: 100, width: 100 }}
                                            />

                                            <div className='redimensionner_btn_container'>
                                                <button className='redimensionner_btn' onClick={() => getCropData('logo')}>Redimensionner</button>
                                            </div>
                                        </div>
                                    }
                                    {/* logo */}
                                    <div className='logo_bg_img'>
                                        <div className='logo_bg_img_content'>
                                            {(!logoImg.trim() && !cropDataLogo.trim()) ?
                                                <p className='logo_bg_img_content_img_format'>
                                                    <span className='logo_bg_img_content_img_format_size'>(100 x 100)</span>
                                                </p> :
                                                <img src={logoImg ? logoImg : cropDataLogo && cropDataLogo} alt='logo' style={{ objectFit: logoImg ? 'contain' : cropDataLogo ? 'cover' : 'initial' }} className='logo_bg_img_content_img' />}
                                        </div>
                                    </div>
                                    {/* logo erreur */}
                                    <div className='error_container'>
                                        {(logoDimensionError && logoDimension) && <span className='error'>{`*Le format du fichier n'est pas valide, votre fichier est de (${logoDimension.width}x${logoDimension.height}) au lieu de (100x100)`}</span>}
                                        {logoTypeError && <span className='error'>Le type du fichier selectionné n'est pas valide. Type valide (png, jpg, jpeg)</span>}
                                        {logoSizeError && <span className='error'>Le poids du fichier selectionné n'est pas valide. Taille valide (au plus: 512 Ko)</span>}
                                        {err?.logo && <span className='error'>{err.logo}</span>}
                                    </div>
                                    {/* importation de la photo de couverture */}
                                    <div className='choose_photo_container'>
                                        <span className='choose_photo_text'>Veuillez importer la photo de couverture</span>
                                        <span className='choose_photo_size'>(800 x 400)</span>
                                        <label htmlFor='couverture' className='choose_photo_btn'>
                                            Choisir la photo de couverture
                                            <input type='file' name='couverture' id='couverture' accept='image/*' onChange={(e) => handleChooseImg(e, 'couverture')} style={{ display: 'none' }} />
                                        </label>
                                    </div>
                                    {/* redimensionner la photo de couverture */}
                                    {(couvertureDimensionError && !couvertureTypeError && !couvertureSizeError) &&
                                        <div className='redimensionner_container'>
                                            <Cropper
                                                ref={cropperRefCouverture}
                                                style={{ height: 400, maxWidth: '100%', width: '100%', marginBottom: 15, }}
                                                zoomTo={0}
                                                src={couvertureImg}
                                                viewMode={1}
                                                cropBoxResizable={false}
                                                initialAspectRatio={16 / 8}
                                                aspectRatio={16 / 8}
                                                minCropBoxHeight={400}
                                                minCropBoxWidth={800}
                                                background={true}
                                                responsive={true}
                                                autoCropArea={0.7}
                                                guides={false}
                                                data={{ height: 400, width: 800 }}
                                            />

                                            <div className='redimensionner_btn_container'>
                                                <button className='redimensionner_btn' onClick={() => getCropData('couverture')}>Redimensionner</button>
                                            </div>
                                        </div>
                                    }
                                    {/* couverture */}
                                    <div className='logo_bg_img'>
                                        <div className='logo_bg_img_content bg'>
                                            {(!couvertureImg.trim() && !cropDataCouverture.trim()) ?
                                                <p className='logo_bg_img_content_img_format'>
                                                    <span className='logo_bg_img_content_img_format_size'>(800 x 400)</span>
                                                </p> :
                                                <img src={couvertureImg ? couvertureImg : cropDataCouverture && cropDataCouverture} alt='photo_de_couverture' style={{ objectFit: couvertureImg ? 'contain' : cropDataCouverture ? 'cover' : 'initial' }} className='logo_bg_img_content_img' />
                                            }
                                        </div>
                                    </div>
                                    {/* couverture erreur */}
                                    <div className='error_container'>
                                        {(couvertureDimensionError && couvertureDimension) && <span className='error'>{`*Le format du fichier n'est pas valide, votre fichier est de (${couvertureDimension.width}x${couvertureDimension.height}) au lieu de (800x400)`}</span>}
                                        {couvertureTypeError && <span className='error'>Le type du fichier selectionné n'est pas valide. Type valide (png, jpg, jpeg)</span>}
                                        {couvertureSizeError && <span className='error'>Le poids du fichier selectionné n'est pas valide. Taille valide (au plus: 1 Mo)</span>}
                                        {err?.cover && <span className='error'>{err.cover}</span>}
                                    </div>
                                </div>
                                {/* partie produit phare */}
                                <div className='produit_phare_container'>
                                    {/* phrase d'importation des 3 photos du produit phare */}
                                    <div className='choose_photo_container'>
                                        <span className='choose_photo_text'>Veuillez importer 3 photos pour vos produits phares</span>
                                    </div>
                                    {/* redimensionner produit phare image (première image) */}
                                    {(prodPhare1DimensionError && !prodPhare1TypeError && !prodPhare1SizeError) &&
                                        <div className='redimensionner_container'>
                                            <Cropper
                                                ref={cropperRefprodPhare1}
                                                style={{ height: 300, maxWidth: '100%', width: '100%', marginBottom: 15, }}
                                                zoomTo={0}
                                                src={prodPhareImg1}
                                                viewMode={1}
                                                cropBoxResizable={false}
                                                initialAspectRatio={1}
                                                aspectRatio={1}
                                                minCropBoxHeight={300}
                                                minCropBoxWidth={300}
                                                background={true}
                                                responsive={true}
                                                autoCropArea={1}
                                                guides={false}
                                                data={{ height: 300, width: 300 }}
                                            />

                                            {/* produit phare image erreur */}
                                            <div className='error_container'>
                                                {(prodPhare1DimensionError && prodPhare1Dimension) && <span className='error'>{`*Le format du fichier n'est pas valide, votre fichier est de (${prodPhare1Dimension.width}x${prodPhare1Dimension.height}) au lieu de (300x300)`}</span>}
                                                {prodPhare1TypeError && <span className='error'>Le type du fichier selectionné n'est pas valide. Type valide (png, jpg, jpeg)</span>}
                                                {prodPhare1SizeError && <span className='error'>Le poids du fichier selectionné n'est pas valide. Taille valide (au plus: 512 Ko)</span>}
                                            </div>

                                            <div className='redimensionner_btn_container'>
                                                <button className='redimensionner_btn' onClick={() => getCropData('prod_phare_1')}>Redimensionner</button>
                                            </div>
                                        </div>
                                    }
                                    {/* redimensionner produit phare image (deuxième image) */}
                                    {(prodPhare2DimensionError && !prodPhare2TypeError && !prodPhare2SizeError) &&
                                        <div className='redimensionner_container'>
                                            <Cropper
                                                ref={cropperRefprodPhare2}
                                                style={{ height: 300, maxWidth: '100%', width: '100%', marginBottom: 15, }}
                                                zoomTo={0}
                                                src={prodPhareImg2}
                                                viewMode={1}
                                                cropBoxResizable={false}
                                                initialAspectRatio={1}
                                                aspectRatio={1}
                                                minCropBoxHeight={300}
                                                minCropBoxWidth={300}
                                                background={true}
                                                responsive={true}
                                                autoCropArea={1}
                                                guides={false}
                                                data={{ height: 300, width: 300 }}
                                            />

                                            {/* produit phare image erreur */}
                                            <div className='error_container'>
                                                {(prodPhare2DimensionError && prodPhare2Dimension) && <span className='error'>{`*Le format du fichier n'est pas valide, votre fichier est de (${prodPhare2Dimension.width}x${prodPhare2Dimension.height}) au lieu de (300x300)`}</span>}
                                                {prodPhare2TypeError && <span className='error'>Le type du fichier selectionné n'est pas valide. Type valide (png, jpg, jpeg)</span>}
                                                {prodPhare2SizeError && <span className='error'>Le poids du fichier selectionné n'est pas valide. Taille valide (au plus: 512 Ko)</span>}
                                            </div>

                                            <div className='redimensionner_btn_container'>
                                                <button className='redimensionner_btn' onClick={() => getCropData('prod_phare_2')}>Redimensionner</button>
                                            </div>
                                        </div>
                                    }
                                    {/* redimensionner produit phare image (troisième image) */}
                                    {(prodPhare3DimensionError && !prodPhare3TypeError && !prodPhare3SizeError) &&
                                        <div className='redimensionner_container'>
                                            <Cropper
                                                ref={cropperRefprodPhare3}
                                                style={{ height: 300, maxWidth: '100%', width: '100%', marginBottom: 15, }}
                                                zoomTo={0}
                                                src={prodPhareImg3}
                                                viewMode={1}
                                                cropBoxResizable={false}
                                                initialAspectRatio={1}
                                                aspectRatio={1}
                                                minCropBoxHeight={300}
                                                minCropBoxWidth={300}
                                                background={true}
                                                responsive={true}
                                                autoCropArea={1}
                                                guides={false}
                                                data={{ height: 300, width: 300 }}
                                            />

                                            {/* produit phare image erreur */}
                                            {(prodPhare3DimensionError && prodPhare3Dimension) &&
                                                <div className='error_container'>
                                                    {(prodPhare3DimensionError && prodPhare3Dimension) && <span className='error'>{`*Le format du fichier n'est pas valide, votre fichier est de (${prodPhare3Dimension.width}x${prodPhare3Dimension.height}) au lieu de (300x300)`}</span>}
                                                    {prodPhare3TypeError && <span className='error'>Le type du fichier selectionné n'est pas valide. Type valide (png, jpg, jpeg)</span>}
                                                    {prodPhare3SizeError && <span className='error'>Le poids du fichier selectionné n'est pas valide. Taille valide (au plus: 512 Ko)</span>}
                                                </div>
                                            }

                                            <div className='redimensionner_btn_container'>
                                                <button className='redimensionner_btn' onClick={() => getCropData('prod_phare_3')}>Redimensionner</button>
                                            </div>
                                        </div>
                                    }
                                    {/* trois photos phares */}
                                    <div className='produit_phare_content_container'>
                                        <div className='produit_phare_content'>
                                            {[1, 2, 3].map(nb => {
                                                return (
                                                    // produit phare
                                                    <div key={nb} className='produit_phare'>
                                                        {/* choisir la photo */}
                                                        <div className='produit_phare_choose_img'>
                                                            <span className='produit_phare_choose_img_size'>(300 x 300)</span>
                                                            <label htmlFor={`prod_phare_${nb}`} className='produit_phare_choose_img_btn'>
                                                                La {nb === 1 ? 'première' : nb === 2 ? 'deuxième' : 'troisième'} photo
                                                                <input type='file' name={`prod_phare_${nb}`} id={`prod_phare_${nb}`} accept='image/*' onChange={(e) => handleChooseImg(e, nb === 1 ? 'prod_phare_1' : nb === 2 ? 'prod_phare_2' : 'prod_phare_3')} style={{ display: 'none' }} />
                                                            </label>
                                                        </div>
                                                        {/* format ou image choisie */}
                                                        <div className='format_img_container'>
                                                            {nb === 1 ?
                                                                (!prodPhareImg1.trim() && !cropDataProdPhare1) ?
                                                                    <span className='format_img'>(300 x 300)</span> :
                                                                    <img src={prodPhareImg1 ? prodPhareImg1 : cropDataProdPhare1 && cropDataProdPhare1} alt='produit_phare_image_1' style={{ objectFit: prodPhareImg1 ? 'contain' : cropDataProdPhare1 ? 'cover' : 'initial' }} className='format_img' />
                                                                : nb === 2 ?
                                                                    (!prodPhareImg2.trim() && !cropDataProdPhare2) ?
                                                                        <span className='format_img'>(300 x 300)</span> :
                                                                        <img src={prodPhareImg2 ? prodPhareImg2 : cropDataProdPhare2 && cropDataProdPhare2} alt='produit_phare_image_2' style={{ objectFit: prodPhareImg2 ? 'contain' : cropDataProdPhare2 ? 'cover' : 'initial' }} className='format_img' />
                                                                    : nb === 3 && (!prodPhareImg3.trim() && !cropDataProdPhare3) ?
                                                                        <span className='format_img'>(300 x 300)</span> :
                                                                        <img src={prodPhareImg3 ? prodPhareImg3 : cropDataProdPhare3 && cropDataProdPhare3} alt='produit_phare_image_3' style={{ objectFit: prodPhareImg3 ? 'contain' : cropDataProdPhare3 ? 'cover' : 'initial' }} className='format_img' />
                                                            }
                                                        </div>
                                                        {/* erreur des images des produits phares */}
                                                        <div className='error_container'>
                                                            {(nb === 1 && err?.product1) && <span className='error'>{err.product1}</span>}
                                                            {(nb === 2 && err?.product2) && <span className='error'>{err.product2}</span>}
                                                            {(nb === 3 && err?.product3) && <span className='error'>{err.product3}</span>}
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>

                                </div>
                                {/* bouton valider */}
                                <div className='submit_btn_container'>
                                    <span className='submit_btn back' onClick={() => setLevel('01')}>Précédent</span>
                                    <button className='submit_btn'>Valider</button>
                                </div>
                            </div>
                        }
                    </form>
                </div>
            </AuthContainer>
    )
}

export default Signup