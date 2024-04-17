import React, { FC } from 'react'
// my importations
import Sidebar from './sidebar/Sidebar'

type COMPONENT_TYPE = { children: JSX.Element | JSX.Element[] }

const Layout: FC<COMPONENT_TYPE> = (props) => {
    const { children } = props

    return (
        <div className='layout_container'>
            <Sidebar />

            {children}
        </div>
    )
}

export default Layout