import React, { FC } from 'react'
// my icons
import { IconType } from 'react-icons'
import { NavLink } from 'react-router-dom'

type MENU_TYPE = {
    menu: {
        menu_name: string
        submenus: Array<{ submenu_name: string, submenu_url: string, submenu_icon: IconType }>
    }
}

const Menu: FC<MENU_TYPE> = (props) => {
    let { menu } = props
    let { menu_name, submenus } = menu

    return (
        <div className='menu_container'>
            <p className='menu_name'>{menu_name}</p>

            <ul className='submenu_container'>
                {submenus.map((submenu, i) => {
                    const { submenu_icon, submenu_name, submenu_url } = submenu
                    const SubMenuIcon = submenu_icon

                    return (
                        <li key={i} className='submenu'>
                            <NavLink to={submenu_url} className={({ isActive }) => isActive ? `submenu_name_icon_container active` : `submenu_name_icon_container`}>
                                <SubMenuIcon size={25} className='submenu_icon' />
                                <span className='submenu_name'>{submenu_name}</span>
                            </NavLink>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default Menu