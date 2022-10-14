import { useRef, useEffect } from 'react'
import { supabase } from '../Backend/client'
import { useNavigate } from 'react-router-dom'

const Login = () => {
	const input = useRef('youremail@site.com')
	const btn = useRef()
	const navigate = useNavigate()

	useEffect(() => {
		async function isRedirectable(){
			const {data: { user }} = await supabase.auth.getUser()
			if(user) navigate('/')
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
	return (
		<div className='container' style={{marginTop:'2rem'}}>
			<form onSubmit={handleSubmit}>
				<hgroup>
					<h1>¡Ingresa!</h1>
					<p>Solo pon tu correo y listo! Quedarás registrado. Puedes crear tus tareitas y para volver a entrar vuelves a poner tu correo y abres el link. Easy peacy.</p>
				</hgroup>
				<input
					type='email'
					name='email'
					placeholder='tu-correo@dominio.com'
					ref={input}
				/>
				<button aria-busy="false" ref={btn} onClick={()=>btn.current.ariaBusy = true}>Dame mi link mágico</button>
			</form>
		</div>
	)
}

export default Login
