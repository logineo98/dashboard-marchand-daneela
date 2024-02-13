import React, { FC } from 'react'

type COMPONENT_TYPE = {
    children: React.ReactNode
    title: string
    info: string
    signup?: boolean
    width?: number
}

const AuthContainer: FC<COMPONENT_TYPE> = (props) => {
    const { children, info, title, signup, width } = props

    return (
        <div className={signup ? 'auth_container signup' : 'auth_container'}>
            <div className='auth' style={{ width: width ? width : 360 }}>
                <h1 className='auth_title'>{title}</h1>
                <p className='auth_info'>{info}</p>

                {children}
            </div>
        </div>
    )
}

export default AuthContainer