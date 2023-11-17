import React, { useState } from 'react'
// my importations
import PageContainer from '../components/common/layout/page_container/PageContainer'
import { page_home } from '../utils/page_name'
import Modal from '../components/common/modal/Modal'
// my icons
import { AiFillCreditCard } from 'react-icons/ai'
import { FaCertificate, FaGift } from 'react-icons/fa'
import { IoEyeSharp } from 'react-icons/io5'
import { MdEdit, MdNotifications } from 'react-icons/md'
// my images
import logo from '../assets/images/logo.png'

const Home = () => {

    const [openModificationModal, setOpenModificationModal] = useState(false)
    const [openPromotionModal, setOpenPromotionModal] = useState(false)
    const [openForfaitModal, setOpenForfaitModal] = useState(false)

    return (
        <PageContainer page_name={page_home}>
            <div className='home_container'>
                <div className='m_c_p_f_container'>
                    {/* modification d'information */}
                    <div className='m_c_p_f mod_cert'>
                        <div className='m_c_p_f_header_container'>
                            <MdEdit className='m_c_p_f_header_icon' size={20} />
                            <span className='m_c_p_f_header_name'>Modification d'informations</span>
                        </div>
                        <div className='m_c_p_f_menu_container'>
                            <span className='m_c_p_f_menu_name'>Date</span>
                            <span className='m_c_p_f_menu_name'>Statut</span>
                            <span className='m_c_p_f_menu_action'></span>
                        </div>
                        <div className='m_c_p_f_content_container'>
                            <span className='m_c_p_f_content_value'>06/11/2023 à 11:47</span>
                            <span className='m_c_p_f_content_value'>Défaut</span>
                            <IoEyeSharp className='eyes' size={14} onClick={() => setOpenModificationModal(true)} />
                            {/* modal */}
                            {openModificationModal &&
                                <Modal title={`Modification d'information`} setOpenModal={setOpenModificationModal}>
                                    <div className='modal_content'>
                                        <div className='label_input_error_container'>
                                            <label htmlFor='motif' className='_label'>Motif *</label>
                                            <textarea name='motif' id='motif' placeholder='Motif' disabled className='_textarea'></textarea>
                                        </div>
                                    </div>
                                </Modal>
                            }
                        </div>
                    </div>
                    {/* certification */}
                    <div className='m_c_p_f mod_cert'>
                        <div className='m_c_p_f_header_container'>
                            <FaCertificate className='m_c_p_f_header_icon' size={20} />
                            <span className='m_c_p_f_header_name'>Certifications</span>
                        </div>
                        <div className='m_c_p_f_menu_container'>
                            <span className='m_c_p_f_menu_name'>Date</span>
                            <span className='m_c_p_f_menu_name'>Statut</span>
                            <span className='m_c_p_f_menu_action'></span>
                        </div>
                        <div className='m_c_p_f_content_container'>
                            <span className='m_c_p_f_content_value'>06/11/2023 à 11:47</span>
                            <span className='m_c_p_f_content_value'>Défaut</span>
                            <IoEyeSharp className='eyes' size={14} />
                        </div>
                    </div>
                    {/* promotions */}
                    <div className='m_c_p_f promo'>
                        <div className='m_c_p_f_header_container'>
                            <FaGift className='m_c_p_f_header_icon' size={20} />
                            <span className='m_c_p_f_header_name'>Promotions</span>
                        </div>
                        <div className='m_c_p_f_menu_container'>
                            <span className='m_c_p_f_menu_name'>Date</span>
                            <span className='m_c_p_f_menu_name'>Statut</span>
                            <span className='m_c_p_f_menu_name'>Montant(fcfa)</span>
                            <span className='m_c_p_f_menu_action'></span>
                        </div>
                        <div className='m_c_p_f_content_container'>
                            <span className='m_c_p_f_content_value'>06/11/2023 à 11:47</span>
                            <span className='m_c_p_f_content_value'>Défaut</span>
                            <span className='m_c_p_f_content_value'>140000</span>
                            <IoEyeSharp className='eyes' size={14} onClick={() => setOpenPromotionModal(true)} />
                            {/* modal */}
                            {openPromotionModal &&
                                <Modal title={`Promotion`} setOpenModal={setOpenPromotionModal}>
                                    <div className='modal_content'>
                                        <h2 className='modal_content_title'>Image du slider</h2>
                                        <div className='label_input_error_container'>
                                            <img src={logo} alt='image_du_slider' className='image_slider' />
                                        </div>
                                    </div>
                                    <div className='modal_content'>
                                        <h2 className='modal_content_title'>Durée</h2>
                                        <div className='two_content_container'>
                                            <div className='label_input_error_container'>
                                                <label htmlFor='debut' className='_label'>Début *</label>
                                                <input type='date' name='debut' id='debut' disabled className='_input' />
                                            </div>
                                            <div className='label_input_error_container'>
                                                <label htmlFor='fin' className='_label'>Fin *</label>
                                                <input type='date' name='fin' id='fin' disabled className='_input' />
                                            </div>
                                        </div>
                                    </div>
                                    <div className='modal_content'>
                                        <div className='label_input_error_container'>
                                            <label htmlFor='motif' className='_label'>Motif *</label>
                                            <textarea name='motif' id='motif' placeholder='Motif' disabled className='_textarea'></textarea>
                                        </div>
                                    </div>
                                </Modal>
                            }
                        </div>
                    </div>
                    {/* forfait */}
                    <div className='m_c_p_f forfait'>
                        <div className='m_c_p_f_header_container'>
                            <AiFillCreditCard className='m_c_p_f_header_icon' size={20} />
                            <span className='m_c_p_f_header_name'>Forfaits</span>
                        </div>
                        <div className='m_c_p_f_menu_container'>
                            <span className='m_c_p_f_menu_name'>Date</span>
                            <span className='m_c_p_f_menu_name'>Statut</span>
                            <span className='m_c_p_f_menu_name'>Pack</span>
                            <span className='m_c_p_f_menu_name'>Montant</span>
                            <span className='m_c_p_f_menu_action'></span>
                        </div>
                        <div className='m_c_p_f_content_container'>
                            <span className='m_c_p_f_content_value'>06/11/2023 à 11:47</span>
                            <span className='m_c_p_f_content_value'>Défaut</span>
                            <span className='m_c_p_f_content_value'>GOLD</span>
                            <span className='m_c_p_f_content_value'>140000</span>
                            <IoEyeSharp className='eyes' size={14} onClick={() => setOpenForfaitModal(true)} />
                            {/* modal */}
                            {openForfaitModal &&
                                <Modal title={`Forfait`} setOpenModal={setOpenForfaitModal}>
                                    <div className='modal_content'>
                                        <h2 className='modal_content_title'>Durée</h2>
                                        <div className='two_content_container'>
                                            <div className='label_input_error_container'>
                                                <label htmlFor='duree' className='_label'>Durée</label>
                                                <input type='text' name='duree' id='duree' placeholder='Durée' disabled className='_input' />
                                            </div>
                                            <div className='label_input_error_container'>
                                                <label htmlFor='montant' className='_label'>Montant</label>
                                                <input type='number' name='montant' id='montant' placeholder='Montant' disabled className='_input' />
                                            </div>
                                        </div>
                                    </div>
                                    <div className='modal_content'>
                                        <div className='two_content_container'>
                                            <div className='label_input_error_container'>
                                                <label htmlFor='debut' className='_label'>Début *</label>
                                                <input type='date' name='debut' id='debut' disabled className='_input' />
                                            </div>
                                            <div className='label_input_error_container'>
                                                <label htmlFor='fin' className='_label'>Fin *</label>
                                                <input type='date' name='fin' id='fin' disabled className='_input' />
                                            </div>
                                        </div>
                                    </div>
                                    <div className='modal_content'>
                                        <h2 className='modal_content_title'>Coordonnées GPS</h2>
                                        <div className='two_content_container'>
                                            <div className='label_input_error_container'>
                                                <label htmlFor='latitude' className='_label'>Latitude *</label>
                                                <input type='text' name='latitude' id='latitude' placeholder='Latitude' disabled className='_input' />
                                            </div>
                                            <div className='label_input_error_container'>
                                                <label htmlFor='longitude' className='_label'>Longitude *</label>
                                                <input type='text' name='longitude' id='longitude' placeholder='Longitude' disabled className='_input' />
                                            </div>
                                        </div>
                                    </div>
                                    <div className='modal_content'>
                                        <div className='label_input_error_container'>
                                            <label htmlFor='motif' className='_label'>Motif *</label>
                                            <textarea name='motif' id='motif' placeholder='Motif' disabled className='_textarea'></textarea>
                                        </div>
                                    </div>
                                </Modal>
                            }
                        </div>
                    </div>
                </div>

                {/* notification container */}
                <div className='notification_container'>
                    <div className='notification_header_container'>
                        <MdNotifications className='notification_header_icon' size={20} />
                        <span className='notification_header_name'>Notification</span>
                    </div>
                    <div className='notification_content_container'>
                        <div className='notification_content'>
                            <span className='notification_content_name'>Modification d'information</span>
                            <span className='notification_content_value'>4</span>
                        </div>
                        <div className='notification_content'>
                            <span className='notification_content_name'>Certifications</span>
                            <span className='notification_content_value'>10</span>
                        </div>
                        <div className='notification_content'>
                            <span className='notification_content_name'>Promotions</span>
                            <span className='notification_content_value'>8</span>
                        </div>
                        <div className='notification_content'>
                            <span className='notification_content_name'>Forfaits</span>
                            <span className='notification_content_value'>4</span>
                        </div>
                    </div>
                </div>
            </div>
        </PageContainer>
    )
}

export default Home