import { combineReducers } from "@reduxjs/toolkit"
import { reducer as notificationsReducer } from "reapop"
import commonSlice from "./commonSlice"
import profileSlice from "./profileSlice"

const rootReducer = combineReducers({
  notifications: notificationsReducer(),
  common: commonSlice,
  profile: profileSlice,
})

export default rootReducer
