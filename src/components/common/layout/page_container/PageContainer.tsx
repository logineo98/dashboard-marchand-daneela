import React, { FC, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
// my importations
import Header from './Header'
import { ROOT_REDUCER_TYPE } from '../../../../redux/store'
import { _isAdminConnected } from '../../../../redux/actions/admin.action'
import { isTokenExpired } from '../../../../utils/functions'

type COMPONENT_TYPE = {
    children: React.ReactNode
    page_name: string
}

const PageContainer: FC<COMPONENT_TYPE> = (props) => {
    const { children, page_name } = props

    const navigate = useNavigate()

    let { connected } = useSelector((state: ROOT_REDUCER_TYPE) => state.admin)
    const dispatch = useDispatch<any>()

    const [isConnected, setIsConnected] = useState(connected)

    useEffect(() => {
        document.title = page_name

        const accessToken = localStorage.getItem('accessToken')
        const email = localStorage.getItem('email')
        const expireIn = localStorage.getItem('expireIn')

        if (accessToken && email && expireIn) {
            if (isTokenExpired(new Date().getTime(), parseInt(expireIn, 10))) {
                setIsConnected(false)
                navigate('/')
            } else setIsConnected(true)
        } else {
            setIsConnected(false)
            navigate('/')
        }
    }, [page_name, navigate])

    useEffect(() => {
        dispatch(_isAdminConnected(isConnected))
    }, [isConnected, dispatch])

    return (
        <div className='page_container'>
            <Header page_name={page_name} />

            <div className='page_content_container'>
                {children}
            </div>
        </div>
    )
}

export default PageContainer