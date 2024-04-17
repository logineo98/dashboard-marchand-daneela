import TimeAgo from 'javascript-time-ago'
import React, { FC, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// my importations
import Loading from '../../common/loading/Loading'
import { NOTIFICATION_TYPE } from '../../../redux/types'
import { ROOT_REDUCER_TYPE } from '../../../redux/store'
import { _putNotificationToRead } from '../../../redux/actions/notification.action'

type COMPONENT_TYPE = {
    notification: NOTIFICATION_TYPE
}

const NotificationCard: FC<COMPONENT_TYPE> = (props) => {
    const { notification } = props

    const { loadingPutNotificationRead } = useSelector((state: ROOT_REDUCER_TYPE) => state.notification)
    const dispatch = useDispatch<any>()

    const [notifIdSelected, setNotifIdSelected] = useState<string>()

    const handleReadNotification = (notifId: string) => {
        if (!notification.read) {
            setNotifIdSelected(notifId)
            dispatch(_putNotificationToRead(notification.id))
        }
    }

    return (
        <div className={notification.read ? 'notification_content read' : 'notification_content'} onClick={() => handleReadNotification(notification.id)}>
            {(notification.id === notifIdSelected && loadingPutNotificationRead) ?
                <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                    <Loading />
                </div> :
                <>
                    <p className='notification_content_name'>{notification.title}</p>
                    <span className='notification_content_value'>{notification.message}</span>
                    <div className='notification_content_date_container'>
                        <span className='notification_content_read'>{notification.read ? 'Lue' : 'Non lue'}</span>
                        <span className='notification_content_date'>{new TimeAgo('').format(new Date(notification.createdAt))}</span>
                    </div>
                </>
            }
        </div>
    )
}

export default NotificationCard