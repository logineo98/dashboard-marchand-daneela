import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// my importations
import { api_file } from '../redux/constants'
import { page_profile } from '../utils/page_name'
import { ROOT_REDUCER_TYPE } from '../redux/store'
import Switch from '../components/common/switch/Switch'
import Loading from '../components/common/loading/Loading'
import CategoryCard from '../components/card/CategoryCard'
import SubCategoryCard from '../components/card/SubCategoryCard'
import { _editPasswordMarchand } from '../redux/actions/marchand.action'
import PageContainer from '../components/common/layout/page_container/PageContainer'
import { EDIT_MARCHAND_PASSWORD_TYPE, validation_edit_marchand_password } from '../utils/validations/marchand.validation'
// json
import categories from '../utils/json/categories.json'

const Profile = () => {
    const { loadingMarchand, marchand } = useSelector((state: ROOT_REDUCER_TYPE) => state.marchand)
    const dispatch = useDispatch<any>()

    const data = { current: '', new_password: '', new_confirm_password: '' }

    const [editPasswordData, setEditPasswordData] = useState(data)
    const [err, setErr] = useState<EDIT_MARCHAND_PASSWORD_TYPE>()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditPasswordData({ ...editPasswordData, [e.target.id]: e.target.value })
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const { error, initialError } = validation_edit_marchand_password({ current: editPasswordData.current, new_password: editPasswordData.new_password, new_confirm_password: editPasswordData.new_confirm_password })

        if (error.current !== initialError.current || error.new_password !== initialError.new_password || error.new_confirm_password !== initialError.new_confirm_password) {
            setErr(error)
        } else {
            setErr(initialError)

            marchand?.id && dispatch(
                _editPasswordMarchand(
                    marchand.id,
                    { current: editPasswordData.current, new: editPasswordData.new_password },
                    setEditPasswordData
                )
            )
        }
    }

    return (
        <PageContainer page_name={page_profile}>
            <div className='profile_container'>
                {/* information necessaire sur la boutique */}
                <div className='about_shop_container'>
                    {/* information de la boutique */}
                    <div className='about_shop'>
                        <h1 className='about_shop_title'>Information de la boutique</h1>
                        <div className='about_shop_content_container'>
                            <div className='label_input_error_container'>
                                <label htmlFor='shop_name' className='_label'>Marchand/Nom de la boutique en ligne *</label>
                                <input type='text' name='shop_name' id='shop_name' placeholder='Marchand/Nom de la boutique en ligne' value={marchand?.store.name} disabled className='_input' />
                            </div>
                            <div className='label_input_error_container'>
                                <label htmlFor='shop_email' className='_label'>Email de la boutique *</label>
                                <input type='email' name='shop_email' id='shop_email' placeholder='Email de la boutique' value={marchand?.store.email} disabled className='_input' />
                            </div>
                            <div className='label_input_error_container'>
                                <label htmlFor='shop_site_url' className='_label'>URL du site web *</label>
                                <input type='url' name='shop_site_url' id='shop_site_url' placeholder='URL du site web' value={marchand?.store.url} disabled className='_input' />
                            </div>
                            <div className='label_input_error_container'>
                                <label htmlFor='shop_adresse' className='_label'>Adresse de la boutique *</label>
                                <input type='text' name='shop_adresse' id='shop_adresse' placeholder='Adresse de la boutique' value={marchand?.store.adresse} disabled className='_input' />
                            </div>
                            <div className='label_input_error_container'>
                                <label htmlFor='shop_region' className='_label'>Région *</label>
                                <select name='shop_region' id='shop_region' className='_select_container' disabled>
                                    <option value={marchand?.store.region} className='_select'>{marchand?.store.region}</option>
                                </select>
                            </div>
                            <div className='label_input_error_container'>
                                <label htmlFor='shop_num_tel' className='_label'>Numéro de téléphone de la boutique *</label>
                                <div className='indicatif_tel_container'>
                                    <select name='shop_tel_indicatif' className='_select_container' disabled>
                                        <option value='bamako' className='_select'>+223</option>
                                    </select>
                                    <input type='tel' name='shop_num_tel' id='shop_num_tel' placeholder='Numéro de téléphone de la boutique' value={marchand?.store.telephone.split(' ')[1]} disabled className='_input' />
                                </div>
                            </div>
                            <div className='label_input_error_container'>
                                <label htmlFor='shop_description' className='_label'>Description de la boutique *</label>
                                <textarea name='shop_description' id='shop_description' placeholder='Description de la boutique *' value={marchand?.store.description} disabled className='_textarea'></textarea>
                            </div>
                            <div className='switch_container_'>
                                <span className='switch_title'>Êtes-vous un marchand Vitepay ?</span>
                                <Switch active={marchand?.store.vitepay} />
                            </div>
                            <div className='switch_container_'>
                                <span className='switch_title'>Le site peut-il s'afficher sur daneela ?</span>
                                <Switch active={marchand?.store.frame} />
                            </div>
                        </div>
                    </div>
                    {/* lien des reseaux sociaux */}
                    <div className='about_shop'>
                        <h1 className='about_shop_title'>Liens des réseaux sociaux</h1>
                        <div className='about_shop_content_container'>
                            <div className='label_input_error_container'>
                                <label htmlFor='shop_facebook_url' className='_label'>Facebook</label>
                                <input type='url' name='shop_facebook_url' id='shop_facebook_url' placeholder='Lien du compte facebook' value={marchand?.store.network.facebook} disabled className='_input' />
                            </div>
                            <div className='label_input_error_container'>
                                <label htmlFor='shop_instagram_url' className='_label'>Instagram</label>
                                <input type='url' name='shop_instagram_url' id='shop_instagram_url' placeholder='Lien du compte instagram' value={marchand?.store.network.instagram} disabled className='_input' />
                            </div>
                            <div className='label_input_error_container'>
                                <label htmlFor='shop_linkedin_url' className='_label'>Linkedin</label>
                                <input type='url' name='shop_linkedin_url' id='shop_linkedin_url' placeholder='Lien du compte linkedin' value={marchand?.store.network.linkedin} disabled className='_input' />
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
                                    {categories.map(category => <CategoryCard key={category.id} name={category.name} categories={marchand?.store.tags.categories} />)}
                                </div>
                            </div>

                            {/* sous categories */}
                            <div className='category_container'>
                                <h2 className='category_title'>Sous catégories</h2>
                            </div>
                            {categories.map(category => <SubCategoryCard key={category.id} category={category} active={marchand?.store.tags.categories.includes(category.name)} sousCategories={marchand?.store.tags.sousCategories} />)}
                        </div>
                    </div>
                    {/* fourchette de prix */}
                    <div className='f_serv_sup_container'>
                        <h1 className='f_serv_sup_title'>Fouchette de prix</h1>
                        <div className='f_serv_sup_content_container'>
                            {/* min */}
                            <div className='fourchette'>
                                <label htmlFor='min' className='fourchette_label'>Min *</label>
                                <select name='min' id='min' disabled className='fourchette_select_container'>
                                    <option value={marchand?.store.tags.prixMinimum}>{marchand?.store.tags.prixMinimum}</option>
                                </select>
                            </div>
                            {/* max */}
                            <div className='fourchette'>
                                <label htmlFor='max' className='fourchette_label'>Max *</label>
                                <select name='max' id='max' disabled className='fourchette_select_container'>
                                    <option value={marchand?.store.tags.prixMaximum}>{marchand?.store.tags.prixMaximum}</option>
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
                                        <input type='radio' name='livraison' id='non_disponible' value='Non disponible' checked={marchand?.store.livraison === 'Non disponible' ? true : false} disabled className='liv_serv_ap_vente_content_radio_btn' />
                                    </div>
                                    <div className='liv_serv_ap_vente_content'>
                                        <label htmlFor='gratuite' className='liv_serv_ap_vente_content_title'>Gratuite</label>
                                        <input type='radio' name='livraison' id='gratuite' value='Gratuite' checked={marchand?.store.livraison === 'Gratuite' ? true : false} disabled className='liv_serv_ap_vente_content_radio_btn' />
                                    </div>
                                    <div className='liv_serv_ap_vente_content'>
                                        <label htmlFor='payante' className='liv_serv_ap_vente_content_title'>Payante</label>
                                        <input type='radio' name='livraison' id='payante' value='Payante' checked={marchand?.store.livraison === 'Payante' ? true : false} disabled className='liv_serv_ap_vente_content_radio_btn' />
                                    </div>
                                </div>
                            </div>

                            {/* service après vente */}
                            <div className='liv_serv_ap_vente_container'>
                                <h2 className='liv_serv_ap_vente_title'>Services après vente :</h2>
                                <div className='liv_serv_ap_vente_content_container'>
                                    <div className='liv_serv_ap_vente_content'>
                                        <label htmlFor='oui' className='liv_serv_ap_vente_content_title'>Oui</label>
                                        <input type='radio' name='serv_ap_vente' checked={marchand?.store.serviceApresVente ? true : false} disabled id='oui' value='oui' className='liv_serv_ap_vente_content_radio_btn' />
                                    </div>
                                    <div className='liv_serv_ap_vente_content'>
                                        <label htmlFor='non' className='liv_serv_ap_vente_content_title'>Non</label>
                                        <input type='radio' name='serv_ap_vente' checked={!marchand?.store.serviceApresVente ? true : false} disabled id='non' value='non' className='liv_serv_ap_vente_content_radio_btn' />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* logo et image de couverture */}
                    <div className='logo_bg_img_container'>
                        {/* logo */}
                        <div className='logo_bg_img'>
                            <span className='logo_bg_img_title'>Image du logo</span>
                            <div className='logo_bg_img_content'>
                                <img src={`${api_file}/${marchand?.store.logo}`} alt='logo' className='logo_bg_img_content_img' />
                            </div>
                        </div>
                        {/* couverture */}
                        <div className='logo_bg_img'>
                            <span className='logo_bg_img_title'>Image de couverture</span>
                            <div className='logo_bg_img_content bg'>
                                <img src={`${api_file}/${marchand?.store.couverture}`} alt='couverture' className='logo_bg_img_content_img' />
                            </div>
                        </div>
                    </div>
                    {/* produit phare */}
                    <div className='produit_phare_container'>
                        <span className='produit_phare_title'>Images de trois produits phares</span>
                        <div className='produit_phare_content_container'>
                            {marchand?.store.produits.map((image, i) => <img key={image} src={`${api_file}/${marchand.store.produits[i]}`} alt='couverture' className='produit_phare_content' />)}
                        </div>
                    </div>
                </div>

                {/* information generale et changer le mot de passe */}
                <div className='information_password_container'>
                    {/* information generale */}
                    <div className='information_password'>
                        <h1 className='information_password_title'>Informations générales</h1>
                        <div className='information_password_content'>
                            <div className='information_generale'>
                                <span className='information_generale_title'>Nom et Prénom</span>
                                <span className='information_generale_value'>{marchand?.name}</span>
                            </div>
                            <div className='information_generale'>
                                <span className='information_generale_title'>Email</span>
                                <span className='information_generale_value'>{marchand?.email}</span>
                            </div>
                            <div className='information_generale'>
                                <span className='information_generale_title'>Rôle</span>
                                <span className='information_generale_value'>Marchand</span>
                            </div>
                        </div>
                    </div>
                    {/* modifier le mot de passe */}
                    {loadingMarchand ?
                        <div style={{ height: 285, display: 'flex', justifyContent: 'center' }}>
                            <Loading width='80' />
                        </div> :
                        <form className='information_password' onSubmit={handleSubmit}>
                            <h1 className='information_password_title'>Changer le mot de passe</h1>
                            <div className='information_password_content'>
                                {/* actual mot de passe */}
                                <div className='label_input_error_container'>
                                    <label htmlFor='current' className='_label'>Actuel mot de passe *</label>
                                    <input type='password' name='current' id='current' placeholder='Actuel mot de passe' value={editPasswordData.current} onChange={handleChange} className='_input' />
                                    <div className='error_container'>
                                        {err?.current && <span className='error'>{err.current}</span>}
                                    </div>
                                </div>
                                {/* nouveau mot de passe */}
                                <div className='label_input_error_container'>
                                    <label htmlFor='new_password' className='_label'>Nouveau mot de passe *</label>
                                    <input type='password' name='new_password' id='new_password' placeholder='Nouveau mot de passe *' value={editPasswordData.new_password} onChange={handleChange} className='_input' />
                                    <div className='error_container'>
                                        {err?.new_password && <span className='error'>{err.new_password}</span>}
                                    </div>
                                </div>
                                {/* confirmer le mot de passe */}
                                <div className='label_input_error_container'>
                                    <label htmlFor='new_confirm_password' className='_label'>Confirmer le mot de passe *</label>
                                    <input type='password' name='new_confirm_password' id='new_confirm_password' placeholder='Confirmer le mot de passe *' value={editPasswordData.new_confirm_password} onChange={handleChange} className='_input' />
                                    <div className='error_container'>
                                        {err?.new_confirm_password && <span className='error'>{err.new_confirm_password}</span>}
                                    </div>
                                </div>
                                {/* bouton modifier */}
                                <div className='submit_btn_container'>
                                    <button type='submit' className='submit_btn'>Modifier</button>
                                </div>
                            </div>
                        </form>
                    }
                </div>
            </div>
        </PageContainer>
    )
}

export default Profile