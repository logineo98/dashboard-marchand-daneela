import React, { FC } from 'react'

type COMPONENT_TYPE = {
    title: string
    children: JSX.Element | JSX.Element[]
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
    width?: number
}

const Modal: FC<COMPONENT_TYPE> = (props) => {
    const { children, setOpenModal, title, width } = props

    return (
        <div className='modal_global_container'>
            <div className='modal_container' style={{ width: width || 400 }}>
                {/* titre du modal */}
                <h1 className='modal_title'>{title}</h1>

                {/* contenu du modal */}
                <div className='modal_content_container'>
                    {children}
                </div>

                {/* bouton de fermeture du modal */}
                <div className='modal_close_container'>
                    <button className='modal_close_btn' onClick={() => setOpenModal(false)}>Fermer</button>
                </div>
            </div>
        </div>
    )
}

export default Modal