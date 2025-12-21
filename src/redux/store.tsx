import { configureStore } from '@reduxjs/toolkit'
import authslice from './AuthSlice'

import datalist_slice from './DatalistSlice'

export default configureStore({
  reducer: {authslice,datalist_slice},
})