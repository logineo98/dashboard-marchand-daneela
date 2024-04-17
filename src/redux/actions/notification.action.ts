import axios from 'axios'
import { toast } from 'react-toastify'
import { ERROR_NOTIFICATION, ERROR_PUT_NOTIFICATION_READ, GET_ALL_NOTIFICATIONS, GET_ALL_NOTIFICATIONS_UNREAD, LOADING_NOTIFICATION, LOADING_PUT_NOTIFICATION_READ, PUT_NOTIFICATION_TO_READ, notification } from '../constants'

const token = localStorage.getItem('accessToken')

export const _loadingNotification = () => (dispatch: any) => {
    dispatch({ type: LOADING_NOTIFICATION })
}

export const _errorNotification = (payload: any) => (dispatch: any) => {
    dispatch({ type: ERROR_NOTIFICATION, payload })
}

export const _getAllNotifications = (storeId: string) => async (dispatch: any) => {
    try {
        dispatch(_loadingNotification())

        const res = await axios.get(`${notification}/store/${storeId}`, { headers: { Authorization: `Bearer ${token}` } })

        dispatch({ type: GET_ALL_NOTIFICATIONS, payload: res.data })
    } catch (error: any) {
        toast.error(error?.response?.data?.message)
        dispatch(_errorNotification(error?.response?.data?.message))
    }
}

export const _getAllNotificationsUnread = (storeId: string) => async (dispatch: any) => {
    try {
        dispatch(_loadingNotification())

        const res = await axios.get(`${notification}/store/${storeId}/unread`, { headers: { Authorization: `Bearer ${token}` } })

        dispatch({ type: GET_ALL_NOTIFICATIONS_UNREAD, payload: res.data })
    } catch (error: any) {
        toast.error(error?.response?.data?.message)
        dispatch(_errorNotification(error?.response?.data?.message))
    }
}

export const _putNotificationToRead = (notificationId: string) => async (dispatch: any) => {
    try {
        dispatch({ type: LOADING_PUT_NOTIFICATION_READ })

        const res = await axios.put(`${notification}/${notificationId}/read`, {}, { headers: { Authorization: `Bearer ${token}` } })

        toast.success('La notification a été marquée comme lue.')

        dispatch({ type: PUT_NOTIFICATION_TO_READ, payload: res.data })
    } catch (error: any) {
        toast.error(error?.response?.data?.message)
        dispatch({ type: ERROR_PUT_NOTIFICATION_READ, payload: error?.response?.data?.message })
    }
}

