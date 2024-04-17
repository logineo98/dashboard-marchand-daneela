import React from 'react'
import { Link } from 'react-router-dom'
// my importations
import Menu from './Menu'
import { menus } from '../../../../utils/menus'
// my images
import logo from '../../../../assets/images/logo.png'

const Sidebar = () => {

    return (
        <div className='sidebar_container'>
            <div className='left_part_container'></div>
            <div className='overlay' onClick={() => document.querySelector('.sidebar_container')!.classList.remove('active')}></div>

            <div className='sidebar_content_container'>
                <Link to='/' className='sidebar_header_container'>
                    <div className='logo_container'>
                        <img src={logo} alt='logo daneela' className='logo' />
                    </div>
                </Link>

                <div className='sidebar_content'>
                    {menus.map((menu, i) => <Menu key={i} menu={menu} />)}
                </div>
            </div>
        </div>
    )
}

export default Sidebar