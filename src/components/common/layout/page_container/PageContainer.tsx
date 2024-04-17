import { useNavigate } from 'react-router-dom'
import React, { FC, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// my importations
import Header from './Header'
import { ROOT_REDUCER_TYPE } from '../../../../redux/store'
import { isTokenExpired } from '../../../../utils/functions'
import { _isAdminConnected } from '../../../../redux/actions/admin.action'
import { page_certification, page_forfait, page_modification, page_promotion } from '../../../../utils/page_name'

type COMPONENT_TYPE = {
    children: React.ReactNode
    page_name: string
}

const PageContainer: FC<COMPONENT_TYPE> = (props) => {
    const { children, page_name } = props

    const navigate = useNavigate()

    let { connected } = useSelector((state: ROOT_REDUCER_TYPE) => state.admin)
    let { loadingModification } = useSelector((state: ROOT_REDUCER_TYPE) => state.modification)
    let { loadingCertification } = useSelector((state: ROOT_REDUCER_TYPE) => state.certification)
    let { loadingPromotion } = useSelector((state: ROOT_REDUCER_TYPE) => state.promotion)
    let { loadingForfait } = useSelector((state: ROOT_REDUCER_TYPE) => state.forfait)
    const dispatch = useDispatch<any>()

    const [isConnected, setIsConnected] = useState(connected)
    const [reduxLoading, setReduxLoading] = useState(false)

    useEffect(() => {
        switch (page_name) {
            case page_modification: setReduxLoading(loadingModification); break
            case page_certification: setReduxLoading(loadingCertification); break
            case page_promotion: setReduxLoading(loadingPromotion); break
            case page_forfait: setReduxLoading(loadingForfait); break

            default: setReduxLoading(false); break
        }
    }, [page_name, loadingCertification, loadingForfait, loadingModification, loadingPromotion])


    useEffect(() => {
        document.title = page_name

        const accessToken = localStorage.getItem('accessToken')
        const email = localStorage.getItem('email')
        const expireIn = localStorage.getItem('expireIn')
        const marchand = localStorage.getItem('marchand')

        if (accessToken && email && expireIn && marchand) {
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

                {reduxLoading &&
                    <div className='waiting_msg_container'>
                        <p className='waiting_msg'>Veuillez patienter...</p>
                    </div>
                }
            </div>
        </div>
    )
}

export default PageContainer