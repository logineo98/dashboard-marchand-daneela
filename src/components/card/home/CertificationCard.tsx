import React, { FC, useState } from 'react'
// my importations
import Modal from '../../common/modal/Modal'
import { formatDate } from '../../../utils/functions'
import { CERTIFICATION_TYPE } from '../../../redux/types'
// my icons
import { IoEyeSharp } from 'react-icons/io5'

type COMPONENT_TYPE = {
    certification: CERTIFICATION_TYPE
}

const CertificationCard: FC<COMPONENT_TYPE> = (props) => {
    const { certification } = props

    const [openModal, setOpenModal] = useState(false)

    return (
        <div className='m_c_p_f_content_container'>
            <span className='m_c_p_f_content_value'>{formatDate(new Date(certification.createdAt).getTime())}</span>
            <span className='m_c_p_f_content_value'>{certification.status}</span>
            <IoEyeSharp className='eyes' size={14} onClick={() => setOpenModal(true)} />
            {openModal &&
                <Modal title={`Certifications`} setOpenModal={setOpenModal}>
                    <div className='modal_content'>
                        <div className='label_input_error_container'>
                            <label htmlFor='motif' className='_label'>Motif *</label>
                            <textarea name='motif' id='motif' placeholder='Motif' value={certification.motif as string || ''} disabled className='_textarea'></textarea>
                        </div>
                    </div>
                </Modal>
            }
        </div>
    )
}

export default CertificationCard