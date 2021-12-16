import {combineReducers} from 'redux'
import auth from './auth'
import profile from './profile'
import post from './post'
import {  persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'


const persistConfig={
    key:'root',
    storage,
    whitelist:['profile']
}


const rootReducer =combineReducers({auth,profile,post})

export default persistReducer(persistConfig,rootReducer)