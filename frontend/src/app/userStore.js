import { configureStore } from '@reduxjs/toolkit'

import userReducer from './userSlice'

export default configureStore({
	reducer: { user: userReducer },
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			immutableCheck: false,
			serializableCheck: false,
		}),
})
