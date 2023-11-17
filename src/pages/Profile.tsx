import React from 'react'
// my importations
import PageContainer from '../components/common/layout/page_container/PageContainer'
import { page_profile } from '../utils/page_name'
import categories from '../utils/json/categories.json'
import CategoryCard from '../components/card/CategoryCard'
import SubCategoryCard from '../components/card/SubCategoryCard'
import Switch from '../components/common/switch/Switch'
// my images
import iabomi_logo from '../assets/images/iabomi_logo.png'
import iabomi_couverture from '../assets/images/iabomi_couverture.jpg'

const Profile = () => {

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
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
                                <input type='text' name='shop_name' id='shop_name' placeholder='Marchand/Nom de la boutique en ligne' value='Iabomi' disabled className='_input' />
                            </div>
                            <div className='label_input_error_container'>
                                <label htmlFor='shop_email' className='_label'>Email de la boutique *</label>
                                <input type='email' name='shop_email' id='shop_email' placeholder='Email de la boutique' value='mail@iabomi.com' disabled className='_input' />
                            </div>
                            <div className='label_input_error_container'>
                                <label htmlFor='shop_site_url' className='_label'>URL du site web *</label>
                                <input type='url' name='shop_site_url' id='shop_site_url' placeholder='URL du site web' value='https://iabomi.com/' disabled className='_input' />
                            </div>
                            <div className='label_input_error_container'>
                                <label htmlFor='shop_adresse' className='_label'>Adresse de la boutique *</label>
                                <input type='text' name='shop_adresse' id='shop_adresse' placeholder='Adresse de la boutique' value='Iabomi.com' disabled className='_input' />
                            </div>
                            <div className='label_input_error_container'>
                                <label htmlFor='shop_region' className='_label'>Région *</label>
                                <select name='shop_region' id='shop_region' className='_select_container' disabled>
                                    <option value='bamako' className='_select'>Bamako</option>
                                </select>
                            </div>
                            <div className='label_input_error_container'>
                                <label htmlFor='shop_num_tel' className='_label'>Numéro de téléphone de la boutique *</label>
                                <div className='indicatif_tel_container'>
                                    <select name='shop_tel_indicatif' className='_select_container' disabled>
                                        <option value='bamako' className='_select'>+223</option>
                                    </select>
                                    <input type='tel' name='shop_num_tel' id='shop_num_tel' placeholder='Numéro de téléphone de la boutique' value='82901148' disabled className='_input' />
                                </div>
                            </div>
                            <div className='label_input_error_container'>
                                <label htmlFor='shop_description' className='_label'>Description de la boutique *</label>
                                <textarea name='shop_description' id='shop_description' placeholder='Description de la boutique *' value='' disabled className='_textarea'></textarea>
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
                                <input type='url' name='shop_facebook_url' id='shop_facebook_url' placeholder='Lien du compte facebook' value='https://www.facebook.com/iabomi' disabled className='_input' />
                            </div>
                            <div className='label_input_error_container'>
                                <label htmlFor='shop_instagram_url' className='_label'>Instagram</label>
                                <input type='url' name='shop_instagram_url' id='shop_instagram_url' placeholder='Lien du compte instagram' value='' disabled className='_input' />
                            </div>
                            <div className='label_input_error_container'>
                                <label htmlFor='shop_linkedin_url' className='_label'>Linkedin</label>
                                <input type='url' name='shop_linkedin_url' id='shop_linkedin_url' placeholder='Lien du compte linkedin' value='' disabled className='_input' />
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
                                <select name='min' id='min' disabled className='fourchette_select_container'>
                                    <option value='1000'>1000</option>
                                </select>
                            </div>
                            {/* max */}
                            <div className='fourchette'>
                                <label htmlFor='max' className='fourchette_label'>Max *</label>
                                <select name='max' id='max' disabled className='fourchette_select_container'>
                                    <option value='1000'>1000</option>
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
                                        <input type='radio' name='livraison' id='non_disponible' value='non disponible' disabled className='liv_serv_ap_vente_content_radio_btn' />
                                    </div>
                                    <div className='liv_serv_ap_vente_content'>
                                        <label htmlFor='gratuite' className='liv_serv_ap_vente_content_title'>Gratuite</label>
                                        <input type='radio' name='livraison' id='gratuite' value='gratuite' disabled className='liv_serv_ap_vente_content_radio_btn' />
                                    </div>
                                    <div className='liv_serv_ap_vente_content'>
                                        <label htmlFor='payante' className='liv_serv_ap_vente_content_title'>Payante</label>
                                        <input type='radio' name='livraison' id='payante' value='payante' disabled className='liv_serv_ap_vente_content_radio_btn' />
                                    </div>
                                </div>
                            </div>

                            {/* service après vente */}
                            <div className='liv_serv_ap_vente_container'>
                                <h2 className='liv_serv_ap_vente_title'>Services après vente :</h2>
                                <div className='liv_serv_ap_vente_content_container'>
                                    <div className='liv_serv_ap_vente_content'>
                                        <label htmlFor='oui' className='liv_serv_ap_vente_content_title'>Oui</label>
                                        <input type='radio' name='serv_ap_vente' disabled id='oui' value='oui' className='liv_serv_ap_vente_content_radio_btn' />
                                    </div>
                                    <div className='liv_serv_ap_vente_content'>
                                        <label htmlFor='non' className='liv_serv_ap_vente_content_title'>Non</label>
                                        <input type='radio' name='serv_ap_vente' disabled id='non' value='non' className='liv_serv_ap_vente_content_radio_btn' />
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
                                <img src={iabomi_logo} alt='logo' className='logo_bg_img_content_img' />
                            </div>
                        </div>
                        {/* couverture */}
                        <div className='logo_bg_img'>
                            <span className='logo_bg_img_title'>Image de couverture</span>
                            <div className='logo_bg_img_content bg'>
                                <img src={iabomi_couverture} alt='couverture' className='logo_bg_img_content_img' />
                            </div>
                        </div>
                    </div>
                    {/* produit phare */}
                    <div className='produit_phare_container'>
                        <span className='produit_phare_title'>Images de trois produits phares</span>
                        <div className='produit_phare_content_container'>
                            <img src={iabomi_couverture} alt='couverture' className='produit_phare_content' />
                            <img src={iabomi_couverture} alt='couverture' className='produit_phare_content' />
                            <img src={iabomi_couverture} alt='couverture' className='produit_phare_content' />
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
                                <span className='information_generale_value'>Diabaté Cheick Oumar</span>
                            </div>
                            <div className='information_generale'>
                                <span className='information_generale_title'>Email</span>
                                <span className='information_generale_value'>tz@gmail.com</span>
                            </div>
                            <div className='information_generale'>
                                <span className='information_generale_title'>Rôle</span>
                                <span className='information_generale_value'>Marchand</span>
                            </div>
                        </div>
                    </div>
                    {/* modifier le mot de passe */}
                    <form className='information_password' onSubmit={handleSubmit}>
                        <h1 className='information_password_title'>Changer le mot de passe</h1>
                        <div className='information_password_content'>
                            {/* actual mot de passe */}
                            <div className='label_input_error_container'>
                                <label htmlFor='actual_password' className='_label'>Actuel mot de passe *</label>
                                <input type='password' name='actual_password' id='actual_password' placeholder='Actuel mot de passe' className='_input' />
                                <div className='error_container'>
                                    <span className='error'>*Ce champ est obligatoire</span>
                                    <span className='error'>*Ce champ doit avoir au moins 4 caracteres</span>
                                </div>
                            </div>
                            {/* nouveau mot de passe */}
                            <div className='label_input_error_container'>
                                <label htmlFor='new_password' className='_label'>Nouveau mot de passe *</label>
                                <input type='password' name='new_password' id='new_password' placeholder='Nouveau mot de passe *' className='_input' />
                                <div className='error_container'>
                                    <span className='error'>*Ce champ est obligatoire</span>
                                    <span className='error'>*Ce champ doit avoir au moins 8 caracteres</span>
                                </div>
                            </div>
                            {/* confirmer le mot de passe */}
                            <div className='label_input_error_container'>
                                <label htmlFor='confirm_password' className='_label'>Confirmer le mot de passe *</label>
                                <input type='password' name='confirm_password' id='confirm_password' placeholder='Confirmer le mot de passe *' className='_input' />
                                <div className='error_container'>
                                    <span className='error'>*Ce champ est obligatoire</span>
                                    <span className='error'>*Ce champ doit avoir au moins 8 caracteres</span>
                                </div>
                            </div>
                            {/* bouton modifier */}
                            <div className='submit_btn_container'>
                                <button type='submit' className='submit_btn'>Modifier</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </PageContainer>
    )
}

export default Profile