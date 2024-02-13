import React, { FC, useState } from 'react'
// my importations
import Modal from '../../common/modal/Modal'
import { MODIFICATION_TYPE } from '../../../redux/types'
import { formatDate, formatDateJMA } from '../../../utils/functions'
// my icons
import { IoEyeSharp } from 'react-icons/io5'

type COMPONENT_TYPE = {
    modification: MODIFICATION_TYPE
}

const ModificationCard: FC<COMPONENT_TYPE> = (props) => {
    const { modification } = props

    const [openModal, setOpenModal] = useState(false)

    return (
        <div className='m_c_p_f_content_container'>
            <span className='m_c_p_f_content_value'>{formatDate(new Date(modification.createdAt).getTime())}</span>
            <span className='m_c_p_f_content_value'>{modification.status}</span>
            <IoEyeSharp className='eyes' size={14} onClick={() => setOpenModal(true)} />
            {/* modal */}
            {openModal &&
                <Modal title={`Modification d'information`} setOpenModal={setOpenModal}>
                    <div className='modal_content'>
                        <div className='label_input_error_container'>
                            <label htmlFor='motif' className='_label'>Motif *</label>
                            <textarea name='motif' id='motif' placeholder='Motif' disabled value={modification.motif || ''} className='_textarea'></textarea>
                        </div>
                    </div>
                </Modal>
            }
        </div>
    )
}

export default ModificationCard