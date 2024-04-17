import { applyMiddleware, combineReducers, legacy_createStore as createStore } from 'redux'

// dev extension
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

// reducers importations
import adminReducer from './reducers/admin.reducer'
import marchandReducer from './reducers/marchand.reducer'
import certificationReducer from './reducers/certification.reducer'
import forfaitReducer from './reducers/forfait.reducer'
import promotionReducer from './reducers/promotion.reducer'
import modificationReducer from './reducers/modification.reducer'
import avisReducer from './reducers/avis.reducer'
import notificationReducer from './reducers/notification.reducer'

// regrouper tous les reducers
const rootReducer = combineReducers({
    admin: adminReducer,
    marchand: marchandReducer,
    certification: certificationReducer,
    forfait: forfaitReducer,
    promotion: promotionReducer,
    modification: modificationReducer,
    avis: avisReducer,
    notification: notificationReducer,
})

export type ROOT_REDUCER_TYPE = ReturnType<typeof rootReducer>

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))

export default store