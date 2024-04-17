import { ERROR_NOTIFICATION, ERROR_PUT_NOTIFICATION_READ, GET_ALL_NOTIFICATIONS, GET_ALL_NOTIFICATIONS_UNREAD, LOADING_NOTIFICATION, LOADING_PUT_NOTIFICATION_READ, PUT_NOTIFICATION_TO_READ } from '../constants'
import { INITIAL_NOTIFICATION_TYPE } from '../types'

const initialState: INITIAL_NOTIFICATION_TYPE = {
    allNotifications: [],
    error: null,
    errorPutNotificationRead: null,
    loadingNotification: false, loadingPutNotificationRead: false,
    notification: null
}

const notificationReducer = (state = initialState, action: { type: string, payload: any }): INITIAL_NOTIFICATION_TYPE => {
    const { type, payload } = action

    switch (type) {
        case LOADING_NOTIFICATION:
            return { ...state, loadingNotification: true }

        case LOADING_PUT_NOTIFICATION_READ:
            return { ...state, loadingPutNotificationRead: true }

        case ERROR_NOTIFICATION:
            return { ...state, error: payload, loadingNotification: false, }

        case ERROR_PUT_NOTIFICATION_READ:
            return { ...state, errorPutNotificationRead: payload, loadingPutNotificationRead: false, }

        case GET_ALL_NOTIFICATIONS:
            return { ...state, allNotifications: payload, loadingNotification: false, error: null }

        case GET_ALL_NOTIFICATIONS_UNREAD:
            return { ...state, allNotifications: payload, loadingNotification: false, error: null }

        case PUT_NOTIFICATION_TO_READ:
            return {
                ...state,
                allNotifications: state.allNotifications.map(notif => {
                    if (notif.id === payload.id) return { ...notif, read: true }
                    else return notif
                }),
                loadingPutNotificationRead: false, errorPutNotificationRead: null
            }

        default:
            return state
    }
}

export default notificationReducer