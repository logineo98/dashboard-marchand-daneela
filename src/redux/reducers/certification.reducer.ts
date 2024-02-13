// my importations
import { ADD_CERTIFICATION, ERROR_CERTIFICATION, GET_ALL_CERTIFICATIONS, GET_CERTIFICATION, LOADING_CERTIFICATION } from '../constants'
import { INITIAL_CERTIFICATION_STATE_TYPE } from '../types'

const initialState: INITIAL_CERTIFICATION_STATE_TYPE = {
    certification: null,
    allCertifications: [],
    loadingCertification: false,
    error: null
}

const certificationReducer = (state = initialState, action: { type: string, payload: any }): INITIAL_CERTIFICATION_STATE_TYPE => {
    const { type, payload } = action

    switch (type) {
        case LOADING_CERTIFICATION:
            return { ...state, loadingCertification: true }

        case ERROR_CERTIFICATION:
            return { ...state, error: payload, loadingCertification: false }

        case GET_ALL_CERTIFICATIONS:
            return { ...state, allCertifications: payload, loadingCertification: false, error: null }

        case GET_CERTIFICATION:
            return { ...state, certification: payload, loadingCertification: false, error: null }

        case ADD_CERTIFICATION:
            return { ...state, allCertifications: [payload, ...state.allCertifications], loadingCertification: false, error: null }

        default:
            return state
    }
}

export default certificationReducer