import { useRef, useEffect, useState } from 'react'
import { useTasks } from '../context/TaskContext'

const TasksForm = () => {
	const inputTaskName = useRef('')
	const inputPriority = useRef('')

	const { createTask, adding, setCompletadas, getUser } = useTasks()

	const [email, setEmail] = useState('')

	async function traerUsuario() {
		const { email } = await getUser()
		if (email) setEmail(email.split('@')[0])
	}

	const handleSubmit = async e => {
		e.preventDefault()
		const taskName = inputTaskName.current.value
		const priority = inputPriority.current.value
		setCompletadas(false)
		createTask(taskName, priority)
		inputTaskName.current.value = ''
	}

	//const emailSplited = email.split('@')

	useEffect(() => {
		traerUsuario()
	}, [])

	return (
		<div>
			<p>Hola, {email} 👋🏼</p>
			<form onSubmit={handleSubmit}>
				<input
					type='text'
					name='taskName'
					placeholder='Escribe una tarea'
					ref={inputTaskName}
				/>

				{/* <label for='fruit'>Prioridad</label> */}
				<select id='fruit' required ref={inputPriority}>
					<option value='NN' selected muted>Elige la prioridad</option>
					<option value='IyU'>Importante y urgente</option>
					<option value='U'>No importante pero urgente</option>
					<option value='I'>Importante pero no urgente</option>
					<option value='NN'>
						No importante y no urgente
					</option>
				</select>

				<button disabled={adding}>{adding ? 'Agregando...' : 'Agregar'}</button>
			</form>
		</div>
	)
}

export default TasksForm
