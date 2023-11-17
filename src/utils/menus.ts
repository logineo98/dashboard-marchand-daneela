
// my icons
import { IconType } from 'react-icons'
import { AiFillDashboard, AiOutlineWechat } from 'react-icons/ai'
import { BsInboxFill } from 'react-icons/bs'

type COMPONENT_TYPE = Array<{
    menu_name: string,
    submenus: Array<{ submenu_name: string, submenu_url: string, submenu_icon: IconType }>
}>

export const menus: COMPONENT_TYPE = [
    {
        menu_name: 'Menu',
        submenus: [
            { submenu_name: 'Accueil', submenu_url: '/', submenu_icon: AiFillDashboard },
            { submenu_name: 'Demandes', submenu_url: '/demandes', submenu_icon: BsInboxFill },
            { submenu_name: 'Commentaires', submenu_url: '/commentaires', submenu_icon: AiOutlineWechat },
        ]
    },
]