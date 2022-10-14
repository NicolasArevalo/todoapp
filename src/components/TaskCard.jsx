import { useRef } from 'react'
import { useTasks } from '../context/TaskContext'

const TaskCard = ({ task }) => {
    const { id, nombre, completada } = task
	const { deleteTask, updateTask } = useTasks()

	const checkbox = useRef(false)

	const handleDelete = id => {
		deleteTask(id)
	}

	const handleChecked = id => {

		const checkedOrNot = checkbox.current.checked
        updateTask(id, { completada: checkedOrNot })
	}

	return (
		<article key={id} style={{ position: 'relative' }}>
			<h4>{nombre}</h4>

			<fieldset
				style={{
					position: 'absolute',
					top: '10px',
					right: '10px',
					display: 'flex',
					alignItems: 'center',
					gap: '8px',
				}}
			>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					viewBox='0 0 448 512'
					style={{
						width: '18px',
						height: '18px',
						margin: '.1rem',
						cursor: 'pointer',
					}}
					onClick={() => handleDelete(id)}
				>
					<path d='M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z' />
				</svg>
				{/* </button> */}
				<input
					type='checkbox'
					ref={checkbox}
                    checked={completada ? true:false}
					onChange={() => handleChecked(id)}
				></input>
			</fieldset>

			<footer style={{ float: 'center' }}>
				<small style={{ textAlign: 'center' }}>
					{completada ? 'Completada' : 'Incompleta'}
				</small>
			</footer>
		</article>
	)
}

export default TaskCard
