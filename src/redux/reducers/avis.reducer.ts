import { ADD_AVIS, DELETE_AVIS, DELETE_AVIS_RESPONSE, ERROR_AVIS, GET_AVIS, LOADING_ADD_AVIS, LOADING_AVIS, LOADING_DELETE_AVIS, LOADING_DELETE_AVIS_RESPONSE } from '../constants'
import { INITIAL_AVIS_STATE_TYPE } from '../types'

const initialState: INITIAL_AVIS_STATE_TYPE = {
    avis: null,
    allAvis: [],
    loadingAvis: false,
    loadingAddAvis: false,
    loadingDeleteAvis: false,
    loadingDeleteAvisResponse: false,
    error: null,
}

const avisReducer = (state = initialState, action: { type: string, payload: any }): INITIAL_AVIS_STATE_TYPE => {
    const { type, payload } = action

    switch (type) {
        case LOADING_AVIS:
            return { ...state, loadingAvis: true }

        case LOADING_ADD_AVIS:
            return { ...state, loadingAddAvis: true }

        case LOADING_DELETE_AVIS:
            return { ...state, loadingDeleteAvis: true }

        case LOADING_DELETE_AVIS_RESPONSE:
            return { ...state, loadingDeleteAvisResponse: true }

        case ERROR_AVIS:
            return { ...state, error: payload, loadingAvis: false, loadingAddAvis: false, loadingDeleteAvis: false, loadingDeleteAvisResponse: false }

        case GET_AVIS:
            return { ...state, avis: payload, loadingAvis: false, error: null }

        case ADD_AVIS:
            return { ...state, avis: payload, loadingAddAvis: false, error: null }

        case DELETE_AVIS:
            return { ...state, avis: payload, loadingDeleteAvis: false, error: null }

        case DELETE_AVIS_RESPONSE:
            return { ...state, avis: payload, loadingDeleteAvisResponse: false, error: null }

        default:
            return state
    }
}

export default avisReducer