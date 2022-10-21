import { useRef, useEffect, useState } from 'react'
import { supabase } from '../Backend/client'
import { useNavigate } from 'react-router-dom'
import { Auth, ThemeMinimal, ThemeSupa } from '@supabase/auth-ui-react'

const Login = () => {
	const input = useRef('youremail@site.com')
	const btn = useRef()
	const navigate = useNavigate()
	const [validandoUser, setValidandoUser] = useState(false)

	useEffect(() => {
		async function isRedirectable() {
			setValidandoUser(true)
			const {
				data: { user },
			} = await supabase.auth.getUser()
			setValidandoUser(false)
			if (user) navigate('/')
		}
		isRedirectable()
	}, [navigate])

	const handleSubmit = async e => {
		e.preventDefault()
		const email = input.current.value
		try {
			const result = await supabase.auth.signInWithOtp({
				email,
			})
			console.log(result)
			console.log('enviadoooooo')

			btn.current.ariaBusy = false
			btn.current.textContent = 'Enviado, revisa tu correo.'
			btn.current.disabled = true
		} catch (error) {
			console.log(error)
		}
	}

	if (validandoUser)
		return (
			<div
				style={{
					width: '99vw',
					height: '99vh',
					display: 'grid',
					placeItems: 'center',
				}}
			>
				<span aria-busy='true'></span>
			</div>
		)

	return (
		<div className='container' style={{ marginTop: '2rem' }}>
			<form
				onSubmit={handleSubmit}
				style={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					marginBottom: '0'
				}}
			>
				<hgroup>
					<h1>¡Ingresa!</h1>
					<p>
						Solo pon tu correo y listo! Quedarás registrado. Puedes crear tus
						tareitas y para volver a entrar vuelves a poner tu correo y abres el
						link. Easy peacy.
					</p>
				</hgroup>
				<div
					className='form-container'
					style={{
						width: '70%',
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}
				>
					<input
						type='email'
						name='email'
						placeholder='tu-correo@dominio.com'
						ref={input}
					/>
					<button
						aria-busy='false'
						ref={btn}
						onClick={() => (btn.current.ariaBusy = true)}
						style={{ width: '100%' }}
					>
						Dame mi link mágico
					</button>
				</div>
				<hr />
			</form>
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}
			>
				ó
				<Auth
					supabaseClient={supabase}
					appearance={{
						theme: ThemeMinimal,
					}}
					localization={{
						variables: {
							sign_in: {
								email_label: 'Tu correo',
								password_label: 'Tu contraseña',
							},
						},
					}}
					providers={['google', 'github']}
					onlyThirdPartyProviders
					socialLayout=''
				></Auth>
			</div>
		</div>
	)
}

export default Login
