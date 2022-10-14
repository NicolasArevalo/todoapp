import { useEffect, useState } from 'react'
import { useTasks } from '../context/TaskContext'
import TaskCard from './TaskCard'

const TaskList = () => {
	
	const { tasks, getTasks, getUser, loading, completadas, setCompletadas } =
		useTasks()

	useEffect(() => {
		getTasks(completadas)
		getUser()
	}, [completadas])

	function whatToRender() {
		if (loading) return <p style={{ textAlign: 'center' }}>Cargando...</p>
		if (tasks.length === 0)
			return (
				<p style={{ textAlign: 'center' }}>
					No hay tareas para mostrar. {!completadas && '¡Crea una!'}
				</p>
			)

		return (
			<div>
				{tasks.map(task => (
					<TaskCard task={task} key={task.id} />
				))}
			</div>
		)
	}

	return (
		<div>
			<div className='div' style={{ width: '100%', display: 'flex', justifyContent: 'space-between'}}>
				<h2>Tareas {!completadas ? 'incompletas' : 'completadas'}</h2>
				<button
					className='contrast outline'
					onClick={() => setCompletadas(!completadas)}
					style={{ width: '30%', textAlign: 'center' }}
				>
					Ver tareas {completadas ? 'incompletas' : 'completadas'}
				</button>
			</div>
			{whatToRender()}
		</div>
	)
}

export default TaskList
