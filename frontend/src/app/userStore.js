import { configureStore } from '@reduxjs/toolkit'
import { useReducer } from 'react'

export default configureStore({
	reducer: { user: useReducer },
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			immutableCheck: false,
			serializableCheck: false,
		}),
})
