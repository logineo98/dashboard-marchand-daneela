import React, { FC, useState } from 'react'
// my importations
import Modal from '../../common/modal/Modal'
import { api_file } from '../../../redux/constants'
import { PROMOTION_TYPE } from '../../../redux/types'
import { formatDate, formatDateJMA } from '../../../utils/functions'
// my icons
import { IoEyeSharp } from 'react-icons/io5'

type COMPONENT_TYPE = {
    promotion: PROMOTION_TYPE
}

const PromotionCard: FC<COMPONENT_TYPE> = (props) => {
    const { promotion } = props

    const [openModal, setOpenModal] = useState(false)

    return (
        <div className='m_c_p_f_content_container'>
            <span className='m_c_p_f_content_value'>{formatDate(new Date(promotion.createdAt).getTime())}</span>
            <span className='m_c_p_f_content_value'>{promotion.status}</span>
            <span className='m_c_p_f_content_value'>{promotion.montant}</span>
            <IoEyeSharp className='eyes' size={14} onClick={() => setOpenModal(true)} />
            {/* modal */}
            {openModal &&
                <Modal title={`Promotion`} setOpenModal={setOpenModal}>
                    <div className='modal_content'>
                        <h2 className='modal_content_title'>Image du slider</h2>
                        <div className='label_input_error_container'>
                            <img src={`${api_file}/${promotion.slider}`} alt='image_du_slider' className='image_slider' />
                        </div>
                    </div>
                    <div className='modal_content'>
                        <h2 className='modal_content_title'>Durée</h2>
                        <div className='two_content_container'>
                            <div className='label_input_error_container'>
                                <label htmlFor='debut' className='_label'>Début *</label>
                                <input type='text' name='debut' id='debut' value={formatDateJMA(new Date(promotion.debut).getTime())} disabled className='_input' />
                            </div>
                            <div className='label_input_error_container'>
                                <label htmlFor='fin' className='_label'>Fin *</label>
                                <input type='text' name='fin' id='fin' value={formatDateJMA(new Date(promotion.fin).getTime())} disabled className='_input' />
                            </div>
                        </div>
                    </div>
                    <div className='modal_content'>
                        <div className='label_input_error_container'>
                            <label htmlFor='motif' className='_label'>Motif *</label>
                            <textarea name='motif' id='motif' placeholder='Motif' value={promotion.motif || ''} disabled className='_textarea'></textarea>
                        </div>
                    </div>
                </Modal>
            }
        </div>
    )
}

export default PromotionCard