import { useRef } from 'react'
import { useTasks } from '../context/TaskContext'

const TasksForm = () => {
	const input = useRef('')
	const { createTask, adding, setCompletadas } = useTasks()

	const handleSubmit = async e => {
		e.preventDefault()
		const taskName = input.current.value
		setCompletadas(false)
		createTask(taskName)
		input.current.value = ''
	}
	return (
		<div>
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
