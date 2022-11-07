import { configureStore } from '@reduxjs/toolkit'
import FilterReducer from './FilterSlice'
import loginReducer  from './LoginSlice'

const store = configureStore({
    reducer : {
        user : loginReducer,
        filter : FilterReducer
    }
})

export default store