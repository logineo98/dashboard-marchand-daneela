import { ADD_MARCHAND, EDIT_PASSWORD_MARCHAND, ERROR_MARCHAND, GET_MARCHAND, LOADING_MARCHAND } from '../constants'
import { INITIAL_MARCHAND_STATE_TYPE } from '../types'

const initialState: INITIAL_MARCHAND_STATE_TYPE = {
    marchand: null,
    allMarchands: [],
    loadingMarchand: false,
    error: null
}

const marchandReducer = (state = initialState, action: { type: string, payload: any }): INITIAL_MARCHAND_STATE_TYPE => {
    const { type, payload } = action

    switch (type) {
        case LOADING_MARCHAND:
            return { ...state, loadingMarchand: true }

        case ERROR_MARCHAND:
            return { ...state, error: payload, loadingMarchand: false }

        case GET_MARCHAND:
            return { ...state, marchand: payload, loadingMarchand: false, error: null }

        case ADD_MARCHAND:
            return { ...state, allMarchands: [payload, ...state.allMarchands], loadingMarchand: false, error: null }

        case EDIT_PASSWORD_MARCHAND:
            return { ...state, loadingMarchand: false, error: null }

        default:
            return state
    }
}

export default marchandReducer