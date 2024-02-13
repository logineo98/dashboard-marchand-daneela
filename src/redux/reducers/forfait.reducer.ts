// my importations
import { ADD_FORFAIT, ERROR_FORFAIT, GET_ALL_FORFAITS, GET_FORFAIT, LOADING_FORFAIT } from '../constants'
import { INITIAL_FORFAIT_STATE_TYPE } from '../types'

const initialState: INITIAL_FORFAIT_STATE_TYPE = {
    forfait: null,
    allForfaits: [],
    loadingForfait: false,
    error: null
}

const forfaitReducer = (state = initialState, action: { type: string, payload: any }): INITIAL_FORFAIT_STATE_TYPE => {
    const { type, payload } = action

    switch (type) {
        case LOADING_FORFAIT:
            return { ...state, loadingForfait: true }

        case ERROR_FORFAIT:
            return { ...state, error: payload, loadingForfait: false }

        case GET_ALL_FORFAITS:
            return { ...state, allForfaits: payload, loadingForfait: false, error: null }

        case GET_FORFAIT:
            return { ...state, forfait: payload, loadingForfait: false, error: null }

        case ADD_FORFAIT:
            return { ...state, allForfaits: [payload, ...state.allForfaits], loadingForfait: false, error: null }

        default:
            return state
    }
}

export default forfaitReducer