import React, { createRef, useState } from 'react'
// my importations
import { Cropper, ReactCropperElement } from 'react-cropper'
import AuthContainer from '../components/common/layout/auth/AuthContainer'
import categories from '../utils/json/categories.json'
import CategoryCard from '../components/card/CategoryCard'
import SubCategoryCard from '../components/card/SubCategoryCard'
import Switch from '../components/common/switch/Switch'

type TYPE_IMG_TYPE = 'logo' | 'couverture' | 'prod_phare_1' | 'prod_phare_2' | 'prod_phare_3'

const Signup = () => {

    const [level, setLevel] = useState<'01' | '02'>('01')
    // logo
    const [logoImg, setLogoImg] = useState('')
    const [cropDataLogo, setCropDataLogo] = useState('')
    const [logoDimension, setLogoDimension] = useState<{ height: number, width: number }>()
    const [logoDimensionError, setLogoDimensionError] = useState(false)
    const cropperRefLogo = createRef<ReactCropperElement>()
    // couverture
    const [couvertureImg, setCouvertureImg] = useState('')
    const [cropDataCouverture, setCropDataCouverture] = useState('')
    const [couvertureDimension, setCouvertureDimension] = useState<{ height: number, width: number }>()
    const [couvertureDimensionError, setCouvertureDimensionError] = useState(false)
    const cropperRefCouverture = createRef<ReactCropperElement>()
    // produits phares
    // 1
    const [prodPhareImg1, setProdPhareImg1] = useState('')
    const [cropDataProdPhare1, setCropDataProdPhare1] = useState('')
    const [prodPhare1Dimension, setProdPhare1Dimension] = useState<{ height: number, width: number }>()
    const [prodPhare1DimensionError, setProdPhare1DimensionError] = useState(false)
    const cropperRefprodPhare1 = createRef<ReactCropperElement>()
    // 2
    const [prodPhareImg2, setProdPhareImg2] = useState('')
    const [cropDataProdPhare2, setCropDataProdPhare2] = useState('')
    const [prodPhare2Dimension, setProdPhare2Dimension] = useState<{ height: number, width: number }>()
    const [prodPhare2DimensionError, setProdPhare2DimensionError] = useState(false)
    const cropperRefprodPhare2 = createRef<ReactCropperElement>()
    // 3
    const [prodPhareImg3, setProdPhareImg3] = useState('')
    const [cropDataProdPhare3, setCropDataProdPhare3] = useState('')
    const [prodPhare3Dimension, setProdPhare3Dimension] = useState<{ height: number, width: number }>()
    const [prodPhare3DimensionError, setProdPhare3DimensionError] = useState(false)
    const cropperRefprodPhare3 = createRef<ReactCropperElement>()

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
    }

    const handleMouveLevel2 = () => setLevel('02')

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

    const handleChooseImg = (e: React.ChangeEvent<HTMLInputElement>, type: TYPE_IMG_TYPE) => {
        const file = e.target.files![0]

        if (file) {
            if (type === 'logo') {
                checkImageDimensions(file, type)
                setLogoImg(URL.createObjectURL(file))
            } else if (type === 'couverture') {
                checkImageDimensions(file, type)
                setCouvertureImg(URL.createObjectURL(file))
            } else if (type === 'prod_phare_1') {
                checkImageDimensions(file, type)
                setProdPhareImg1(URL.createObjectURL(file))
            } else if (type === 'prod_phare_2') {
                checkImageDimensions(file, type)
                setProdPhareImg2(URL.createObjectURL(file))
            } else if (type === 'prod_phare_3') {
                checkImageDimensions(file, type)
                setProdPhareImg3(URL.createObjectURL(file))
            }
        } else {
            if (type === 'logo') {
                setLogoImg('')
                setCropDataLogo('')
                setLogoDimension(undefined)
                setLogoDimensionError(false)
            } else if (type === 'couverture') {
                setCouvertureImg('')
                setCropDataCouverture('')
                setCouvertureDimension(undefined)
                setCouvertureDimensionError(false)
            } else if (type === 'prod_phare_1') {
                setProdPhareImg1('')
                setCropDataProdPhare1('')
                setProdPhare1Dimension(undefined)
                setProdPhare1DimensionError(false)
            } else if (type === 'prod_phare_2') {
                setProdPhareImg2('')
                setCropDataProdPhare2('')
                setProdPhare2Dimension(undefined)
                setProdPhare2DimensionError(false)
            } else if (type === 'prod_phare_3') {
                setProdPhareImg3('')
                setCropDataProdPhare3('')
                setProdPhare3Dimension(undefined)
                setProdPhare3DimensionError(false)
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
            }
        } else if (type === 'couverture') {
            if (typeof cropperRefCouverture.current?.cropper !== 'undefined') {
                setCropDataCouverture(cropperRefCouverture.current?.cropper.getCroppedCanvas().toDataURL())
                setCouvertureImg('')
                setCouvertureDimension(undefined)
                setCouvertureDimensionError(false)
            }
        } else if (type === 'prod_phare_1') {
            if (typeof cropperRefprodPhare1.current?.cropper !== 'undefined') {
                setCropDataProdPhare1(cropperRefprodPhare1.current?.cropper.getCroppedCanvas().toDataURL())
                setProdPhareImg1('')
                setProdPhare1Dimension(undefined)
                setProdPhare1DimensionError(false)
            }
        } else if (type === 'prod_phare_2') {
            if (typeof cropperRefprodPhare2.current?.cropper !== 'undefined') {
                setCropDataProdPhare2(cropperRefprodPhare2.current?.cropper.getCroppedCanvas().toDataURL())
                setProdPhareImg2('')
                setProdPhare2Dimension(undefined)
                setProdPhare2DimensionError(false)
            }
        } else if (type === 'prod_phare_3') {
            if (typeof cropperRefprodPhare3.current?.cropper !== 'undefined') {
                setCropDataProdPhare3(cropperRefprodPhare3.current?.cropper.getCroppedCanvas().toDataURL())
                setProdPhareImg3('')
                setProdPhare3Dimension(undefined)
                setProdPhare3DimensionError(false)
            }
        }
    }

    return (
        <AuthContainer title='Créer un compte' info='Veuillez saisir vos informations' signup width={730}>
            <div className='signup_container'>
                {/* level */}
                <div className='level_container'>
                    <p className={level === '01' ? 'level active' : 'level'}>01</p>
                    <p className='level_separator'></p>
                    <p className={level === '02' ? 'level active' : 'level'}>02</p>
                </div>
                {/* formulaire inscription */}
                <form className='form_signup_container' onSubmit={handleSubmit}>
                    {/* level 1 */}
                    {level === '01' &&
                        <div className='level_1_container'>
                            {/* email */}
                            <div className='label_input_error_container'>
                                <label htmlFor='email' className='_label'>Adresse email *</label>
                                <input type='text' name='email' id='email' placeholder='ex: exemple@domaine.com' className='_input' />
                                <div className='error_container'>
                                    <span className='error'>*Ce champ est obligatoire</span>
                                </div>
                            </div>
                            {/* nom et prénom */}
                            <div className='label_input_error_container'>
                                <label htmlFor='full_name' className='_label'>Nom et prénom *</label>
                                <input type='text' name='full_name' id='full_name' placeholder='ex: Massiré Dembélé' className='_input' />
                                <div className='error_container'>
                                    <span className='error'>*Ce champ est obligatoire</span>
                                    <span className='error'>*Ce champ doit avoir au moins 4 caracteres</span>
                                </div>
                            </div>
                            {/* mot de passe */}
                            <div className='label_input_error_container'>
                                <label htmlFor='password' className='_label'>Mot de passe *</label>
                                <input type='password' name='password' id='password' placeholder='Mot de passe' className='_input' />
                                <div className='error_container'>
                                    <span className='error'>*Ce champ est obligatoire</span>
                                    <span className='error'>*Ce champ doit avoir au moins 8 caracteres</span>
                                </div>
                            </div>
                            {/* confirmer le mot de passe */}
                            <div className='label_input_error_container'>
                                <label htmlFor='confirm_password' className='_label'>Confirmer le mot de passe *</label>
                                <input type='password' name='confirm_password' id='confirm_password' placeholder='Confirmer le mot de passe' className='_input' />
                                <div className='error_container'>
                                    <span className='error'>*Ce champ est obligatoire</span>
                                    <span className='error'>*Ce champ doit avoir au moins 8 caracteres</span>
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
                                        <input type='text' name='shop_name' id='shop_name' placeholder='ex: Boutique' className='_input' />
                                        <div className='error_container'>
                                            <span className='error'>*Ce champ est obligatoire</span>
                                            <span className='error'>*Ce champ doit avoir au moins 4 caracteres</span>
                                        </div>
                                    </div>
                                    <div className='label_input_error_container'>
                                        <label htmlFor='shop_email' className='_label'>Email de la boutique *</label>
                                        <input type='email' name='shop_email' id='shop_email' placeholder='ex: exemple@domaine.com' className='_input' />
                                        <div className='error_container'>
                                            <span className='error'>*Ce champ est obligatoire</span>
                                            <span className='error'>*Ce champ doit avoir au moins 4 caracteres</span>
                                        </div>
                                    </div>
                                    <div className='label_input_error_container'>
                                        <label htmlFor='shop_site_url' className='_label'>URL du site web *</label>
                                        <input type='url' name='shop_site_url' id='shop_site_url' placeholder='ex: https://nomdudomaine.com' className='_input' />
                                        <div className='error_container'>
                                            <span className='error'>*Ce champ est obligatoire</span>
                                            <span className='error'>*Ce champ doit avoir au moins 4 caracteres</span>
                                        </div>
                                    </div>
                                    <div className='label_input_error_container'>
                                        <label htmlFor='shop_adresse' className='_label'>Adresse de la boutique *</label>
                                        <input type='text' name='shop_adresse' id='shop_adresse' placeholder='ex: Kalaban coura' className='_input' />
                                        <div className='error_container'>
                                            <span className='error'>*Ce champ est obligatoire</span>
                                            <span className='error'>*Ce champ doit avoir au moins 4 caracteres</span>
                                        </div>
                                    </div>
                                    <div className='label_input_error_container'>
                                        <label htmlFor='shop_region' className='_label'>Région *</label>
                                        <select name='shop_region' id='shop_region' className='_select_container' >
                                            <option value='' className='_select'>Région</option>
                                            <option value='bamako' className='_select'>Bamako</option>
                                            <option value='kayes' className='_select'>Kayes</option>
                                            <option value='koulikoro' className='_select'>Koulikoro</option>
                                            <option value='sikasso' className='_select'>Sikasso</option>
                                            <option value='ségou' className='_select'>Ségou</option>
                                        </select>
                                        <div className='error_container'>
                                            <span className='error'>*Ce champ est obligatoire</span>
                                        </div>
                                    </div>
                                    <div className='label_input_error_container'>
                                        <label htmlFor='shop_num_tel' className='_label'>Numéro de téléphone de la boutique *</label>
                                        <div className='indicatif_tel_container'>
                                            <select name='shop_tel_indicatif' className='_select_container' disabled>
                                                <option value='bamako' className='_select'>+223</option>
                                            </select>
                                            <input type='tel' name='shop_num_tel' id='shop_num_tel' placeholder='ex: 20244715' className='_input' />
                                        </div>
                                        <div className='error_container'>
                                            <span className='error'>*Ce champ est obligatoire</span>
                                            <span className='error'>*Ce champ doit avoir au moins 4 caracteres</span>
                                        </div>
                                    </div>
                                    <div className='label_input_error_container'>
                                        <label htmlFor='shop_description' className='_label'>Description de la boutique *</label>
                                        <textarea name='shop_description' id='shop_description' placeholder='Description de la boutique *' className='_textarea'></textarea>
                                        <div className='error_container'>
                                            <span className='error'>*Ce champ est obligatoire</span>
                                            <span className='error'>*Ce champ doit avoir au moins 4 caracteres</span>
                                        </div>
                                    </div>
                                    <div className='switch_container_'>
                                        <span className='switch_title'>Êtes-vous un marchand Vitepay ?</span>
                                        <Switch />
                                    </div>
                                    <div className='switch_container_'>
                                        <span className='switch_title'>Le site peut-il s'afficher sur daneela ?</span>
                                        <Switch />
                                    </div>
                                </div>
                            </div>
                            {/* lien des reseaux sociaux */}
                            <div className='about_shop'>
                                <h1 className='about_shop_title'>Liens des réseaux sociaux</h1>
                                <div className='about_shop_content_container'>
                                    <div className='label_input_error_container'>
                                        <label htmlFor='shop_facebook_url' className='_label'>Facebook</label>
                                        <input type='url' name='shop_facebook_url' id='shop_facebook_url' placeholder='Lien du compte facebook' className='_input' />
                                        <div className='error_container'>
                                            <span className='error'>*Ce champ doit avoir au moins 4 caracteres</span>
                                        </div>
                                    </div>
                                    <div className='label_input_error_container'>
                                        <label htmlFor='shop_instagram_url' className='_label'>Instagram</label>
                                        <input type='url' name='shop_instagram_url' id='shop_instagram_url' placeholder='Lien du compte instagram' value='' className='_input' />
                                        <div className='error_container'>
                                            <span className='error'>*Ce champ doit avoir au moins 4 caracteres</span>
                                        </div>
                                    </div>
                                    <div className='label_input_error_container'>
                                        <label htmlFor='shop_linkedin_url' className='_label'>Linkedin</label>
                                        <input type='url' name='shop_linkedin_url' id='shop_linkedin_url' placeholder='Lien du compte linkedin' value='' className='_input' />
                                        <div className='error_container'>
                                            <span className='error'>*Ce champ doit avoir au moins 4 caracteres</span>
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
                                            {categories.map(category => <CategoryCard key={category.id} name={category.name} />)}
                                        </div>
                                    </div>

                                    {/* sous categories */}
                                    <div className='category_container'>
                                        <h2 className='category_title'>Sous catégories</h2>
                                    </div>
                                    {categories.map(category => <SubCategoryCard key={category.id} category={category} />)}
                                </div>
                            </div>
                            {/* fourchette de prix */}
                            <div className='f_serv_sup_container'>
                                <h1 className='f_serv_sup_title'>Fouchette de prix</h1>
                                <div className='f_serv_sup_content_container'>
                                    {/* min */}
                                    <div className='fourchette'>
                                        <label htmlFor='min' className='fourchette_label'>Min *</label>
                                        <select name='min' id='min' className='fourchette_select_container'>
                                            <option value='100'>100</option>
                                            <option value='1000'>1.000</option>
                                            <option value='25000'>25.000</option>
                                        </select>
                                    </div>
                                    {/* max */}
                                    <div className='fourchette'>
                                        <label htmlFor='max' className='fourchette_label'>Max *</label>
                                        <select name='max' id='max' className='fourchette_select_container'>
                                            <option value='25000'>25.000</option>
                                            <option value='30000'>30.000</option>
                                            <option value='100000'>100.000</option>
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
                                                <input type='radio' name='livraison' id='non_disponible' value='non disponible' className='liv_serv_ap_vente_content_radio_btn' />
                                            </div>
                                            <div className='liv_serv_ap_vente_content'>
                                                <label htmlFor='gratuite' className='liv_serv_ap_vente_content_title'>Gratuite</label>
                                                <input type='radio' name='livraison' id='gratuite' value='gratuite' className='liv_serv_ap_vente_content_radio_btn' />
                                            </div>
                                            <div className='liv_serv_ap_vente_content'>
                                                <label htmlFor='payante' className='liv_serv_ap_vente_content_title'>Payante</label>
                                                <input type='radio' name='livraison' id='payante' value='payante' className='liv_serv_ap_vente_content_radio_btn' />
                                            </div>
                                        </div>
                                    </div>

                                    {/* service après vente */}
                                    <div className='liv_serv_ap_vente_container'>
                                        <h2 className='liv_serv_ap_vente_title'>Services après vente :</h2>
                                        <div className='liv_serv_ap_vente_content_container'>
                                            <div className='liv_serv_ap_vente_content'>
                                                <label htmlFor='oui' className='liv_serv_ap_vente_content_title'>Oui</label>
                                                <input type='radio' name='serv_ap_vente' id='oui' value='oui' className='liv_serv_ap_vente_content_radio_btn' />
                                            </div>
                                            <div className='liv_serv_ap_vente_content'>
                                                <label htmlFor='non' className='liv_serv_ap_vente_content_title'>Non</label>
                                                <input type='radio' name='serv_ap_vente' id='non' value='non' className='liv_serv_ap_vente_content_radio_btn' />
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
                                {logoDimensionError &&
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
                                {(logoDimensionError && logoDimension) &&
                                    <div className='error_container'>
                                        <span className='error'>*La taille du fichier n'est pas valide, votre fichier doit être un carré</span>
                                        <span className='error'>{`*La taille du fichier n'est pas valide, votre fichier est de (${logoDimension.width}x${logoDimension.height}) au lieu de (100x100)`}</span>
                                    </div>
                                }
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
                                {couvertureDimensionError &&
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
                                {(couvertureDimensionError && couvertureDimension) &&
                                    <div className='error_container'>
                                        <span className='error'>*La taille du fichier n'est pas valide, votre fichier doit être un carré</span>
                                        <span className='error'>{`*La taille du fichier n'est pas valide, votre fichier est de (${couvertureDimension.width}x${couvertureDimension.height}) au lieu de (800x400)`}</span>
                                    </div>
                                }
                            </div>
                            {/* partie produit phare */}
                            <div className='produit_phare_container'>
                                {/* phrase d'importation des 3 photos du produit phare */}
                                <div className='choose_photo_container'>
                                    <span className='choose_photo_text'>Veuillez importer 3 photos pour vos produits phares</span>
                                </div>
                                {/* redimensionner produit phare image (première image) */}
                                {prodPhare1DimensionError &&
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
                                        {(prodPhare1DimensionError && prodPhare1Dimension) &&
                                            <div className='error_container'>
                                                <span className='error'>*La taille du fichier n'est pas valide, votre fichier doit être un carré</span>
                                                <span className='error'>{`*La taille du fichier n'est pas valide, votre fichier est de (${prodPhare1Dimension.width}x${prodPhare1Dimension.height}) au lieu de (300x300)`}</span>
                                            </div>
                                        }

                                        <div className='redimensionner_btn_container'>
                                            <button className='redimensionner_btn' onClick={() => getCropData('prod_phare_1')}>Redimensionner</button>
                                        </div>
                                    </div>
                                }
                                {/* redimensionner produit phare image (deuxième image) */}
                                {prodPhare2DimensionError &&
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
                                        {(prodPhare2DimensionError && prodPhare2Dimension) &&
                                            <div className='error_container'>
                                                <span className='error'>*La taille du fichier n'est pas valide, votre fichier doit être un carré</span>
                                                <span className='error'>{`*La taille du fichier n'est pas valide, votre fichier est de (${prodPhare2Dimension.width}x${prodPhare2Dimension.height}) au lieu de (300x300)`}</span>
                                            </div>
                                        }

                                        <div className='redimensionner_btn_container'>
                                            <button className='redimensionner_btn' onClick={() => getCropData('prod_phare_2')}>Redimensionner</button>
                                        </div>
                                    </div>
                                }
                                {/* redimensionner produit phare image (troisième image) */}
                                {prodPhare3DimensionError &&
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
                                                <span className='error'>*La taille du fichier n'est pas valide, votre fichier doit être un carré</span>
                                                <span className='error'>{`*La taille du fichier n'est pas valide, votre fichier est de (${prodPhare3Dimension.width}x${prodPhare3Dimension.height}) au lieu de (300x300)`}</span>
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