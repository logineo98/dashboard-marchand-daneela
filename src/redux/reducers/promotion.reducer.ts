// my importations
import { ADD_PROMOTION, ERROR_PROMOTION, GET_ALL_PROMOTIONS, GET_PROMOTION, LOADING_PROMOTION } from '../constants'
import { INITIAL_PROMOTION_STATE_TYPE } from '../types'

const initialState: INITIAL_PROMOTION_STATE_TYPE = {
    promotion: null,
    allPromotions: [],
    loadingPromotion: false,
    error: null
}

const promotionReducer = (state = initialState, action: { type: string, payload: any }): INITIAL_PROMOTION_STATE_TYPE => {
    const { type, payload } = action

    switch (type) {
        case LOADING_PROMOTION:
            return { ...state, loadingPromotion: true }

        case ERROR_PROMOTION:
            return { ...state, error: payload, loadingPromotion: false }

        case GET_ALL_PROMOTIONS:
            return { ...state, allPromotions: payload, loadingPromotion: false, error: null }

        case GET_PROMOTION:
            return { ...state, promotion: payload, loadingPromotion: false, error: null }

        case ADD_PROMOTION:
            return { ...state, allPromotions: [payload, ...state.allPromotions], loadingPromotion: false, error: null }

        default:
            return state
    }
}

export default promotionReducer