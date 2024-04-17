import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// my importations
import { ROOT_REDUCER_TYPE } from '../redux/store'
import { page_notification } from '../utils/page_name'
import Loading from '../components/common/loading/Loading'
import NotificationCard from '../components/card/home/NotificationCard'
import { _getAllNotifications } from '../redux/actions/notification.action'
import PageContainer from '../components/common/layout/page_container/PageContainer'

const Notification = () => {

    const { marchand } = useSelector((state: ROOT_REDUCER_TYPE) => state.marchand)
    const { loadingNotification, allNotifications } = useSelector((state: ROOT_REDUCER_TYPE) => state.notification)
    const dispatch = useDispatch<any>()

    useEffect(() => {
        marchand && dispatch(_getAllNotifications(marchand.store.id))
    }, [dispatch, marchand])

    return (
        <PageContainer page_name={page_notification}>
            <div className='notification_page_container'>
                {loadingNotification ?
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', }}>
                        <Loading />
                    </div> :
                    allNotifications.length === 0 ? <p style={{ fontSize: 12, textAlign: 'center', }}>Aucune notification trouvée pour le moment.</p> :
                        allNotifications.map(notif => <NotificationCard key={notif.id} notification={notif} />)
                }
            </div>
        </PageContainer>
    )
}

export default Notification