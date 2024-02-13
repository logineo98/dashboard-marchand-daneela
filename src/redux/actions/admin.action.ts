import { ERROR_ADMIN, IS_CONNECTED_ADMIN, LOADING_ADMIN } from '../constants'

export const _loadingAdmin = () => (dispatch: any) => {
    dispatch({ type: LOADING_ADMIN })
}

export const _errorAdmin = (payload: any) => (dispatch: any) => {
    dispatch({ type: ERROR_ADMIN, payload })
}

export const _isAdminConnected = (payload: boolean) => (dispatch: any) => {
    dispatch(_loadingAdmin())
    dispatch({ type: IS_CONNECTED_ADMIN, payload })
}