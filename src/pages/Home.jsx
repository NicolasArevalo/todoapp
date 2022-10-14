import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

import { supabase } from '../Backend/client'
import TasksForm from '../components/TasksForm'
import TasksList from '../components/TasksList'

const Home = () => {
	const navigate = useNavigate()
	const modal = useRef()
	const exitModal = useRef()

	const [validandoUser, setValidandoUser] = useState(false)

	const toggleModal = cualModal => {
		if (cualModal === 'nav') {
			if (modal.current.open) {
				modal.current.close()
			} else {
				modal.current.open = 'true'
			}
		} else {
			if (exitModal.current.open) {
				exitModal.current.close()
			} else {
				exitModal.current.open = 'true'
			}
		}
	}

	useEffect(() => {
		async function isRedirectable() {
			setValidandoUser(true)
			const {
				data: { user },
			} = await supabase.auth.getUser()
			setValidandoUser(false)
			if (!user) navigate('/login')
		}
		isRedirectable()
	}, [navigate])

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
			<nav>
				<ul>
					<li>
						<a
							href='#'
							className='secondary'
							data-target='modal-example'
							onClick={() => toggleModal('nav')}
						>
							<svg
								style={{ fill: '#BBC6CE', width: '24px', height: '24px' }}
								xmlns='http://www.w3.org/2000/svg'
								viewBox='0 0 448 512'
							>
								<path d='M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z' />
							</svg>
						</a>
					</li>
				</ul>
				<ul>
					<li>
						<strong>To-do App</strong>
					</li>
				</ul>
				<ul>
					<li>
						<a
							href='/'
							className='secondary'
							data-tooltip='Salir'
							data-placement='left'
							onClick={() => {
								supabase.auth.signOut()
								localStorage.removeItem('sb-clotjbkokdcjqeilzhab-auth-token')
								toggleModal()
							}}
						>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								viewBox='0 0 576 512'
								style={{ fill: '#BBC6CE', width: '24px', height: '24px' }}
							>
								<path d='M320 32c0-9.9-4.5-19.2-12.3-25.2S289.8-1.4 280.2 1l-179.9 45C79 51.3 64 70.5 64 92.5V448H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H96 288h32V480 32zM256 256c0 17.7-10.7 32-24 32s-24-14.3-24-32s10.7-32 24-32s24 14.3 24 32zm96-128h96V480v32h32 64c17.7 0 32-14.3 32-32s-14.3-32-32-32H512V128c0-35.3-28.7-64-64-64H352v64z' />
							</svg>
						</a>
					</li>
				</ul>
			</nav>
			<br />

			<main>
				{/* <Link to='/login'>Ve al login</Link> */}
				<TasksForm />
				<TasksList />
			</main>

			<dialog id='modal-example' ref={modal}>
				<article>
					<h3>Ups...</h3>
					<p>
						Aún no tenemos navbar :v pero tal vez algún día. Solo lo dejo de
						bonito.
					</p>
					<footer>
						<a
							href='#'
							role='button'
							data-target='modal-example'
							onClick={() => toggleModal('nav')}
						>
							Ok bro
						</a>
					</footer>
				</article>
			</dialog>
			<dialog id='modal-example' ref={exitModal}>
				<article>
					<p>
						Saliendo <span aria-busy='true'></span>
					</p>
				</article>
			</dialog>
		</div>
	)
}

export default Home
