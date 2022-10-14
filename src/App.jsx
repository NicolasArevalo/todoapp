import { useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'

import { supabase } from './Backend/client'

import { TaskContextProvider } from './context/TaskContext'

import Login from './pages/Login'
import Home from './pages/Home'
import NotFound from './pages/NotFound'

function App() {
	const navigate = useNavigate()

	useEffect(() => {
		supabase.auth.onAuthStateChange((event, session) => {
			if (!session) {
				navigate('/login')
			} else {
				navigate('/')
			}
		})
	}, [])

	return (
		<div className='App'>
			<TaskContextProvider>
				<Routes>
					<Route path='/login' element={<Login />} />
					<Route path='/' element={<Home />} />

					<Route path='*' element={<NotFound />} />
				</Routes>
				<footer style={{ textAlign: 'center' }}>
					<small>
						Aplicación creada con
						<a href='https://es.reactjs.org'> React </a> +
						<a href='https://supabase.com'> Supabase </a>
						siguiendo el tutorial de{' '}
						<a href='https://www.youtube.com/watch?v=I1zzgAfSUBQ'>Fazt</a>.
						Hecha por <a href='https://niiico.com'>Nico.</a>
					</small>
				</footer>
			</TaskContextProvider>
		</div>
	)
}

export default App
