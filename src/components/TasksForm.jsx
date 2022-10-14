import { useRef, useEffect } from 'react'
import { useTasks } from '../context/TaskContext'

const TasksForm = () => {
	const input = useRef('')
	const { createTask, adding, setCompletadas, getUser } = useTasks()

	const handleSubmit = async e => {
		e.preventDefault()
		const taskName = input.current.value
		setCompletadas(false)
		createTask(taskName)
		input.current.value = ''
	}

	const email = useEffect(() => {
		const { email } = getUser()
		return email
	}, [])

	const emailSplited = email.split('@')

	return (
		<div>
			<p>Hola, {emailSplited[0]}</p>
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
