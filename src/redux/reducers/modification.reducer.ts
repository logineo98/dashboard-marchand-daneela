// my importations
import { ADD_MODIFICATION, ERROR_MODIFICATION, GET_ALL_MODIFICATIONS, GET_MODIFICATION, LOADING_MODIFICATION } from '../constants'
import { INITIAL_MODIFICATION_STATE_TYPE } from '../types'

const initialState: INITIAL_MODIFICATION_STATE_TYPE = {
    modification: null,
    allModifications: [],
    loadingModification: false,
    error: null
}

const modificationReducer = (state = initialState, action: { type: string, payload: any }): INITIAL_MODIFICATION_STATE_TYPE => {
    const { type, payload } = action

    switch (type) {
        case LOADING_MODIFICATION:
            return { ...state, loadingModification: true }

        case ERROR_MODIFICATION:
            return { ...state, error: payload, loadingModification: false }

        case GET_ALL_MODIFICATIONS:
            return { ...state, allModifications: payload, loadingModification: false, error: null }

        case GET_MODIFICATION:
            return { ...state, modification: payload, loadingModification: false, error: null }

        case ADD_MODIFICATION:
            return { ...state, allModifications: [payload, ...state.allModifications], loadingModification: false, error: null }

        default:
            return state
    }
}

export default modificationReducer