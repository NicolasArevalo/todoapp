import { useRef, useState, useEffect } from 'react'
import { useTasks } from '../context/TaskContext'

import './TaskCard.css'

const TaskCard = ({ task }) => {
	const { id, nombre, completada, priority } = task
	const { deleteTask, updateTask } = useTasks()
	const [color, setColor] = useState('auto')

	const checkbox = useRef(false)
	const passedInlineStyle = { '--colorROJO':'blue'}


	const handleDelete = id => {
		deleteTask(id)
	}

	const handleChecked = id => {
		const checkedOrNot = checkbox.current.checked
		updateTask(id, { completada: checkedOrNot })
	}

	const colores = {
		IyU: '#CC1302',
		U: '#FFE82F',
		I: '#00BD45',
		NN: '#BBBBBB'
	}

	useEffect(() => {
		if (priority === 'IyU') setColor(colores.IyU)
		if (priority === 'U') setColor(colores.U)
		if (priority === 'I') setColor(colores.I)
		if (priority === 'NN') setColor(colores.NN)
	}, [])

	return (
		<article
			key={id}
			data-color={color}
			style={{ '--colorPriority': color, position: 'relative' }}
		>
			<h4 style={{ marginBottom: '0' }}>{nombre}</h4>

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
					checked={completada ? true : false}
					data-tooltip={`Marcar como ${
						completada ? 'incompleta' : 'completada'
					}`}
					data-placement='left'
					onChange={() => handleChecked(id)}
				></input>
			</fieldset>
			{/* <footer style={{ float: 'center' }}>
				<small style={{ textAlign: 'center' }}>
					{completada ? 'Completada' : 'Incompleta'}
				</small>
			</footer> */}
		</article>
	)
}

export default TaskCard
