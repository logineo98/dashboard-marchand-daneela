import { ERROR_ADMIN, IS_CONNECTED_ADMIN, LOADING_ADMIN } from '../constants'
import { INITIAL_ADMIN_STATE_TYPE } from '../types'

const initialState: INITIAL_ADMIN_STATE_TYPE = {
    connected: false,
    admin: null,
    allAdmins: [],
    loadingAdmin: false,
    error: null
}

const adminReducer = (state = initialState, action: { type: string, payload: any }): INITIAL_ADMIN_STATE_TYPE => {
    const { type, payload } = action

    switch (type) {
        case LOADING_ADMIN:
            return { ...state, loadingAdmin: true }

        case ERROR_ADMIN:
            return { ...state, error: payload, loadingAdmin: false }

        case IS_CONNECTED_ADMIN:
            return { ...state, connected: payload, loadingAdmin: false, error: null }

        default:
            return state
    }
}

export default adminReducer