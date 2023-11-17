import React from 'react'
import { Link } from 'react-router-dom'
// my importations
import PageContainer from '../components/common/layout/page_container/PageContainer'
import { page_promotion } from '../utils/page_name'

const Promotion = () => {

    const handleValidate = () => { }

    return (
        <PageContainer page_name={page_promotion}>
            <div className='promotion_container'>
                {/* description */}
                <div className='promotion'>
                    <h1 className='promotion_title'>Description</h1>
                    <ul className='promotion_list'>
                        <li className='promotion_list_item'>● La promo est un format d'annonce publicitaire prenant la forme de bannière cliquable.</li>
                        <li className='promotion_list_item'>● La promo doit répondre au critère général d’utilisation et devra être validée par les administrateurs de la plateforme.</li>
                        <li className='promotion_list_item'>● Le marchand doit fournir le visuel répondant au format …………</li>
                    </ul>
                </div>
                {/* type de promotion */}
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
                            <select name='niveau' id='niveau' className='promotion_duree_select_container'>
                                {[1, 2, 3].map(nb => <option key={nb} value={`slider${nb}`} className='promotion_duree_select'>{`Slider ${nb}`}</option>)}
                            </select>
                        </div>
                        <div className='promotion_duree'>
                            <label htmlFor='mois' className='promotion_duree_title'>Durée de la promotion *</label>
                            <select name='mois' id='mois' className='promotion_duree_select_container'>
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(nb => <option key={nb} value={`${nb}`} className='promotion_duree_select'>{`${nb} Mois`}</option>)}
                            </select>
                        </div>
                        <div className='promotion_duree'>
                            <label htmlFor='debut' className='promotion_duree_title'>Début previsionnel *</label>
                            <input type='date' name='debut' id='debut' className='promotion_duree_date' />
                        </div>
                        <div className='promotion_duree'>
                            <label htmlFor='fin' className='promotion_duree_title'>Fin previsionnelle de la promotion *</label>
                            <input type='date' name='fin' id='fin' className='promotion_duree_date' disabled />
                        </div>
                    </div>
                </div>
                {/* montant */}
                <div className='promotion'>
                    <h1 className='promotion_title'>Montant</h1>
                    <h1 className='promotion_montant'>200 000 FCFA</h1>
                </div>
                {/* importation de la photo de couverture */}
                <div className='promotion_photo_couverture_container'>
                    <div className='choose_photo_couverture_container'>
                        <span className='choose_photo_couverture_text'>Veuillez importer la photo de couverture</span>
                        <span className='choose_photo_couverture_size'>(1000 x 350)</span>
                        <label htmlFor='photo_couverture' className='choose_photo_couverture_btn'>
                            Choisir la photo de couverture
                            <input type='file' name='photo_couverture' id='photo_couverture' style={{ display: 'none' }} />
                        </label>
                    </div>
                    <div className='display_photo_container'>
                        <span className='display_photo_text'>1000x350</span>
                    </div>
                </div>
                {/* valider ou annuler */}
                <div className='validate_cancel_container'>
                    <Link to='/demandes' className='cancel'>Annuler</Link>
                    <button className='validate' onClick={handleValidate}>Valider</button>
                </div>
            </div>
        </PageContainer>
    )
}

export default Promotion