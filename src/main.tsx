import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.tsx'
import './global.scss'
import Home from './Home/index.tsx'
import ProgressPage from './routes/Progress/index.tsx'
import Page404 from './404/index.tsx'
import Log from './routes/Progress/Log/index.tsx'

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		children: [
			{
				path: '/',
				element: <Home />
			},
			{
				path: '/avances',
				element: <ProgressPage />
			},
			{
				path: '/avances/:id',
				element: <Log />
			},
			{
				path: '*',
				element: <Page404 />
			}
		]
	}
])

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<RouterProvider router={router} />
	</StrictMode>,
)
