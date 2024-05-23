import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import './index.scss'
import App from './App'
import userStore from './app/userStore'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
	<Provider store={userStore}>
		<BrowserRouter>
			<React.StrictMode>
				<App />
			</React.StrictMode>
		</BrowserRouter>
	</Provider>,
)
