import React, { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
// my importations
import { ROOT_REDUCER_TYPE } from '../../../../redux/store'
// my icons
import { AiOutlineMenu } from 'react-icons/ai'
import { FiLogOut } from 'react-icons/fi'
import { FaRegUser } from 'react-icons/fa'

type COMPONENT_TYPE = {
    page_name: string
}

const Header: FC<COMPONENT_TYPE> = (props) => {
    const { page_name } = props

    const navigate = useNavigate()

    const { marchand } = useSelector((state: ROOT_REDUCER_TYPE) => state.marchand)

    const handleDisplaySidebar = () => {
        const sidebar = document.querySelector('.sidebar_container')!

        sidebar.classList.toggle('active')
    }

    return (
        <div className='header_container'>
            <AiOutlineMenu className='menu_burger' size={20} onClick={handleDisplaySidebar} />

            <span className='site_name'>{page_name.split(' | ')[1]}</span>

            <button className='acronyme_username_option_container'>
                <div className='acronyme_username_container'>
                    <span className='acronyme'>{marchand?.store.name[0]}{marchand?.store.name[1]}</span>
                    <span className='username'>{marchand?.store.name}</span>
                </div>

                <div className='option_container'>
                    <div className='option' onClick={() => navigate('/profile')}>
                        <FaRegUser className='option_icon' />
                        <span className='option_name'>Profil</span>
                    </div>
                    <div className='option' onClick={() => { localStorage.clear(); window.location.href = '/' }}>
                        <FiLogOut className='option_icon' />
                        <span className='option_name'>Déconnexion</span>
                    </div>
                </div>
            </button>
        </div>
    )
}

export default Header