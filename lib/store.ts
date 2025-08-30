import { configureStore } from "@reduxjs/toolkit";
import uiReducer from './features/ui/uiSlice';

export const makeStore =()=>{
    return configureStore({
        reducer:{
            ui: uiReducer
        }
    })
}


// here infer the type of makestore
export type AppStore = ReturnType<typeof makeStore>

// here infer the RootState and AppDispatch types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
