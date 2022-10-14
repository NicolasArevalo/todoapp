import { useRef, useEffect, useState } from 'react'
import { useTasks } from '../context/TaskContext'

const TasksForm = () => {
	const input = useRef('')
	const { createTask, adding, setCompletadas, getUser } = useTasks()

	const [email, setEmail] = useState('')
	
	async function traerUsuario(){
		const {email} = await getUser()
		setEmail(email.split('@')[0])
	}

	const handleSubmit = async e => {
		e.preventDefault()
		const taskName = input.current.value
		setCompletadas(false)
		createTask(taskName)
		input.current.value = ''
	}

	//const emailSplited = email.split('@')

	useEffect(()=>{
		traerUsuario()
	}, [])

	return (
		<div>
			<p>Hola, {email}</p>
			<form onSubmit={handleSubmit}>
				<input
					type='text'
					name='taskName'
					placeholder='Escribe una tarea'
					ref={input}
				/>
				<button disabled={adding}>{adding ? 'Agregando...' : 'Agregar'}</button>
			</form>
		</div>
	)
}

export default TasksForm
