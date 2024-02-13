import React, { FC, useState } from 'react'
// my importations
import Modal from '../../common/modal/Modal'
import { FORFAIT_TYPE } from '../../../redux/types'
import { formatDate, formatDateJMA } from '../../../utils/functions'
// my icons
import { IoEyeSharp } from 'react-icons/io5'

type COMPONENT_TYPE = {
    forfait: FORFAIT_TYPE
}

const ForfaitCard: FC<COMPONENT_TYPE> = (props) => {
    const { forfait } = props

    const [openModal, setOpenModal] = useState(false)

    return (
        <div className='m_c_p_f_content_container'>
            <span className='m_c_p_f_content_value'>{formatDate(new Date(forfait.createdAt).getTime())}</span>
            <span className='m_c_p_f_content_value'>{forfait.status}</span>
            <span className='m_c_p_f_content_value'>{forfait.type}</span>
            <span className='m_c_p_f_content_value'>{forfait.montant}</span>
            <IoEyeSharp className='eyes' size={14} onClick={() => setOpenModal(true)} />
            {/* modal */}
            {openModal &&
                <Modal title={`Forfait`} setOpenModal={setOpenModal}>
                    <div className='modal_content'>
                        <h2 className='modal_content_title'>Durée</h2>
                        <div className='two_content_container'>
                            <div className='label_input_error_container'>
                                <label htmlFor='duree' className='_label'>Durée</label>
                                <input type='text' name='duree' id='duree' placeholder='Durée' disabled value={forfait.duree} className='_input' />
                            </div>
                            <div className='label_input_error_container'>
                                <label htmlFor='montant' className='_label'>Montant</label>
                                <input type='number' name='montant' id='montant' placeholder='Montant' disabled value={forfait.montant} className='_input' />
                            </div>
                        </div>
                    </div>
                    <div className='modal_content'>
                        <div className='two_content_container'>
                            <div className='label_input_error_container'>
                                <label htmlFor='debut' className='_label'>Début *</label>
                                <input type='text' name='debut' id='debut' disabled value={forfait.debut ? formatDateJMA(new Date(forfait.debut).getTime()) : 'jj/mm/aaaa'} className='_input' />
                            </div>
                            <div className='label_input_error_container'>
                                <label htmlFor='fin' className='_label'>Fin *</label>
                                <input type='text' name='fin' id='fin' disabled value={forfait.fin ? formatDateJMA(new Date(forfait.fin).getTime()) : 'jj/mm/aaaa'} className='_input' />
                            </div>
                        </div>
                    </div>
                    <div className='modal_content'>
                        <h2 className='modal_content_title'>Coordonnées GPS</h2>
                        <div className='two_content_container'>
                            <div className='label_input_error_container'>
                                <label htmlFor='latitude' className='_label'>Latitude *</label>
                                <input type='text' name='latitude' id='latitude' placeholder='Latitude' value={forfait.latitude || 0} disabled className='_input' />
                            </div>
                            <div className='label_input_error_container'>
                                <label htmlFor='longitude' className='_label'>Longitude *</label>
                                <input type='text' name='longitude' id='longitude' placeholder='Longitude' value={forfait.longitude || 0} disabled className='_input' />
                            </div>
                        </div>
                    </div>
                    <div className='modal_content'>
                        <div className='label_input_error_container'>
                            <label htmlFor='motif' className='_label'>Motif *</label>
                            <textarea name='motif' id='motif' placeholder='Motif' disabled value={forfait.motif || ''} className='_textarea'></textarea>
                        </div>
                    </div>
                </Modal>
            }
        </div>
    )
}

export default ForfaitCard