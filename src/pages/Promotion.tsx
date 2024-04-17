import { Link } from 'react-router-dom'
import React, { createRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// my importations
import { ROOT_REDUCER_TYPE } from '../redux/store'
import { page_promotion } from '../utils/page_name'
import { images_files_constants } from '../utils/constants'
import { Cropper, ReactCropperElement } from 'react-cropper'
import { _addPromotion } from '../redux/actions/promotion.action'
import PageContainer from '../components/common/layout/page_container/PageContainer'
import { PROMOTION_VALIDATION_TYPE, validation_promotion } from '../utils/validations/promotion.validation'
import { addMonth, amountCalculation, base64ToFile, formatDateJMA, formatNumberWithSpaces } from '../utils/functions'

type TYPE_IMG_TYPE = 'couverture'

const Promotion = () => {
    const { marchand } = useSelector((state: ROOT_REDUCER_TYPE) => state.marchand)
    const dispatch = useDispatch<any>()

    const [niveau, setNiveau] = useState(1)
    const [duree, setDuree] = useState(1)
    const [debut, setDebut] = useState<Date>()

    // photo de couverture
    const [couvertureImg, setCouvertureImg] = useState('')
    const [cropDataCouverture, setCropDataCouverture] = useState('')
    const [couvertureDimension, setCouvertureDimension] = useState<{ height: number, width: number }>()
    const [couvertureDimensionError, setCouvertureDimensionError] = useState(false)
    const [couvertureSizeError, setCouvertureSizeError] = useState(false)
    const [couvertureTypeError, setCouvertureTypeError] = useState(false)
    const cropperRefCouverture = createRef<ReactCropperElement>()

    const [err, setErr] = useState<PROMOTION_VALIDATION_TYPE>()

    const checkImageDimensions = (file: File, type: TYPE_IMG_TYPE) => {
        const reader = new FileReader()

        reader.onload = (e) => {
            const img = new Image()

            img.onload = () => {
                const width = img.width
                const height = img.height

                if (type === 'couverture') {
                    setCouvertureDimension({ height, width })
                    if (width === 1000 && height === 350) {
                        setCouvertureDimensionError(false)
                    } else {
                        setCouvertureDimensionError(true)
                    }
                }
            }

            img.src = e.target!.result as string
        }

        reader.readAsDataURL(file)
    }

    const checkImageSize = (file: File, type: TYPE_IMG_TYPE) => {
        if (type === 'couverture') {
            if (images_files_constants.MAX_SIZE_COUVERTURE < file.size) setCouvertureSizeError(true)
        }
    }

    const checkImageType = (file: File, type: TYPE_IMG_TYPE) => {
        if (type === 'couverture') {
            if (!images_files_constants.FILES_ALLOW_TYPES.includes(file.type)) setCouvertureTypeError(true)
        }
    }

    const handleChooseImg = (e: React.ChangeEvent<HTMLInputElement>, type: TYPE_IMG_TYPE) => {
        const file = e.target.files![0]

        if (file) {
            if (type === 'couverture') {
                // init
                setCouvertureDimensionError(false)
                setCouvertureTypeError(false)
                setCouvertureSizeError(false)
                setErr({ ...err, slider: '' })
                // check
                checkImageDimensions(file, type)
                checkImageSize(file, type)
                checkImageType(file, type)
                setCouvertureImg(URL.createObjectURL(file))
            }
        } else {
            if (type === 'couverture') {
                setCouvertureImg('')
                setCropDataCouverture('')
                setCouvertureDimension(undefined)
                setCouvertureDimensionError(false)
                setCouvertureSizeError(false)
                setCouvertureTypeError(false)
                setErr({ ...err, slider: '' })
            }
        }
    }

    const getCropData = (type: TYPE_IMG_TYPE) => {
        if (type === 'couverture') {
            if (typeof cropperRefCouverture.current?.cropper !== 'undefined') {
                setCropDataCouverture(cropperRefCouverture.current?.cropper.getCroppedCanvas().toDataURL())
                setCouvertureImg('')
                setCouvertureDimension(undefined)
                setCouvertureDimensionError(false)
                setErr({ ...err, slider: '' })
            }
        }
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const { error, initialError } = validation_promotion({
            debut: debut ? debut.toISOString() : '',
            cover: cropDataCouverture ? cropDataCouverture : couvertureImg,
            couvertureDimensionError,
            couvertureSizeError,
            couvertureTypeError,
        })

        if (error.debut !== initialError.debut || error.slider !== initialError.slider) {
            setErr(error)
        } else {
            setErr(initialError)

            const data = new FormData()

            marchand && data.append('storeId', marchand.store.id)
            marchand && debut && data.append('debut', debut.toISOString())
            marchand && duree && data.append('duree', duree.toString())
            marchand && niveau && data.append('niveau', niveau.toString())
            marchand && niveau && duree && data.append('montant', amountCalculation(niveau === 1 ? 200000 : niveau === 2 ? 100000 : 80000, duree).toString())

            data.append('slider', base64ToFile(cropDataCouverture, 'couverture'))

            dispatch(_addPromotion(
                data,
                setNiveau,
                setDuree,
                setDebut,
                setCropDataCouverture
            ))
        }
    }

    return (
        <PageContainer page_name={page_promotion}>
            <form onSubmit={handleSubmit} encType='multipart/form-data' className='promotion_container'>
                {/* description */}
                <div className='promotion'>
                    <h1 className='promotion_title'>Description</h1>
                    <ul className='promotion_list'>
                        <li className='promotion_list_item'>● La promo est un format d'annonce publicitaire prenant la forme de bannière cliquable.</li>
                        <li className='promotion_list_item'>● La promo doit répondre au critère général d’utilisation et devra être validée par les administrateurs de la plateforme.</li>
                        <li className='promotion_list_item'>● Le marchand doit fournir le visuel répondant au format …………</li>
                    </ul>
                </div>
                {/* type de promotion et tarif */}
                <div className='promotion'>
                    <h1 className='promotion_title'>Types De Promo Et Tarifs</h1>
                    <p className='promotion_text'>■ Bannière principale page d’accueil :</p>
                    <ul className='promotion_list'>
                        <li className='promotion_list_item'>● 200.000 FCFA/mois</li>
                        <li className='promotion_list_item'>● Remise de 25% à partir de 3 mois</li>
                        <li className='promotion_list_item'>● Remise de 30% à partir de 6 mois</li>
                        <li className='promotion_list_item'>● Remise de 35% à partir de 9 mois</li>
                        <li className='promotion_list_item'>● Remise de 40% pour abonnement de 1 an</li>
                    </ul>
                    <p className='promotion_text'>■ Bannière sous le box Marchand certifié :</p>
                    <ul className='promotion_list'>
                        <li className='promotion_list_item'>● 100.000 FCFA/mois</li>
                        <li className='promotion_list_item'>● Remise de 25% à partir de 3 mois</li>
                        <li className='promotion_list_item'>● Remise de 30% à partir de 6 mois</li>
                        <li className='promotion_list_item'>● Remise de 35% à partir de 9 mois</li>
                        <li className='promotion_list_item'>● Remise de 40% pour abonnement de 1 an</li>
                    </ul>
                    <p className='promotion_text'>■ Bannière sous le box Marchand vitepay :</p>
                    <ul className='promotion_list'>
                        <li className='promotion_list_item'>● 80.000 FCFA/mois</li>
                        <li className='promotion_list_item'>● Remise de 25% à partir de 3 mois</li>
                        <li className='promotion_list_item'>● Remise de 30% à partir de 6 mois</li>
                        <li className='promotion_list_item'>● Remise de 35% à partir de 9 mois</li>
                        <li className='promotion_list_item'>● Remise de 40% pour abonnement de 1 an</li>
                    </ul>
                </div>
                {/* durée */}
                <div className='promotion'>
                    <h1 className='promotion_title'>Durée</h1>
                    <div className='promotion_duree_container'>
                        <div className='promotion_duree'>
                            <label htmlFor='niveau' className='promotion_duree_title'>Niveau de la promotion *</label>
                            <select name='niveau' id='niveau' value={niveau} onChange={e => setNiveau(parseInt(e.target.value, 10))} className='promotion_duree_select_container'>
                                {[1, 2, 3].map(nb => <option key={nb} value={nb} className='promotion_duree_select'>{`Slider ${nb}`}</option>)}
                            </select>
                        </div>
                        <div className='promotion_duree'>
                            <label htmlFor='mois' className='promotion_duree_title'>Durée de la promotion *</label>
                            <select name='mois' id='mois' value={duree} onChange={e => setDuree(parseInt(e.target.value, 10))} className='promotion_duree_select_container'>
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(nb => <option key={nb} value={nb} className='promotion_duree_select'>{`${nb} Mois`}</option>)}
                            </select>
                        </div>
                        <div className='promotion_duree'>
                            <label htmlFor='debut' className='promotion_duree_title'>Début previsionnel *</label>
                            <input type='date' name='debut' id='debut' onChange={e => setDebut(e.target.valueAsDate as Date)} className='promotion_duree_date' />
                            <div className='error_container'>
                                {err?.debut && <span className='error'>{err.debut}</span>}
                            </div>
                        </div>
                        <div className='promotion_duree'>
                            <label htmlFor='fin' className='promotion_duree_title'>Fin previsionnelle de la promotion *</label>
                            <input type='text' name='fin' id='fin' value={debut ? formatDateJMA(addMonth(debut, duree).getTime()) : 'jj/mm/aaaa'} className='promotion_duree_date' disabled />
                        </div>
                    </div>
                </div>
                {/* montant */}
                <div className='promotion'>
                    <h1 className='promotion_title'>Montant</h1>
                    <h1 className='promotion_montant'>{formatNumberWithSpaces(amountCalculation(niveau === 1 ? 200000 : niveau === 2 ? 100000 : 80000, duree))} FCFA</h1>
                </div>
                {/* importation de la photo de couverture */}
                <div className='promotion_photo_couverture_container'>
                    <div className='choose_photo_couverture_container'>
                        <span className='choose_photo_couverture_text'>Veuillez importer la photo de couverture</span>
                        <span className='choose_photo_couverture_size'>(1000 x 350)</span>
                        <label htmlFor='photo_couverture' className='choose_photo_couverture_btn'>
                            Choisir la photo de couverture
                            <input type='file' name='photo_couverture' id='photo_couverture' accept='image/*' onChange={(e) => handleChooseImg(e, 'couverture')} style={{ display: 'none' }} />
                        </label>
                    </div>
                    {/* redimensionner la photo de couverture */}
                    {(couvertureDimensionError && !couvertureTypeError && !couvertureSizeError) &&
                        <div className='redimensionner_container'>
                            <Cropper
                                ref={cropperRefCouverture}
                                style={{ height: 350, maxWidth: '100%', width: '100%', marginBottom: 15, }}
                                zoomTo={0}
                                src={couvertureImg}
                                viewMode={1}
                                cropBoxResizable={false}
                                initialAspectRatio={16 / 8}
                                aspectRatio={16 / 8}
                                minCropBoxHeight={350}
                                minCropBoxWidth={1000}
                                background={true}
                                responsive={true}
                                autoCropArea={0.7}
                                guides={false}
                                data={{ height: 350, width: 1000 }}
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
                                    <span className='logo_bg_img_content_img_format_size'>(1000 x 350)</span>
                                </p> :
                                <img src={couvertureImg ? couvertureImg : cropDataCouverture && cropDataCouverture} alt='photo_de_couverture' style={{ objectFit: couvertureImg ? 'contain' : cropDataCouverture ? 'cover' : 'initial' }} className='logo_bg_img_content_img' />
                            }
                        </div>
                    </div>
                    {/* couverture erreur */}
                    <div className='error_container'>
                        {(couvertureDimensionError && couvertureDimension) && <span className='error'>{`*Le format du fichier n'est pas valide, votre fichier est de (${couvertureDimension.width}x${couvertureDimension.height}) au lieu de (1000x350)`}</span>}
                        {couvertureTypeError && <span className='error'>Le type du fichier selectionné n'est pas valide. Type valide (png, jpg, jpeg)</span>}
                        {couvertureSizeError && <span className='error'>Le poids du fichier selectionné n'est pas valide. Taille valide (au plus: 1 Mo)</span>}
                        {err?.slider && <span className='error'>{err.slider}</span>}
                    </div>
                </div>
                {/* valider ou annuler */}
                <div className='validate_cancel_container'>
                    <Link to='/demandes' className='cancel'>Annuler</Link>
                    <button className='validate'>Valider</button>
                </div>
            </form>
        </PageContainer>
    )
}

export default Promotion