import { useEffect, useState } from 'react'
import { useTasks } from '../context/TaskContext'
import TaskCard from './TaskCard'

const TaskList = () => {

	const svgCheck = <svg xmlns="http://www.w3.org/2000/svg" style={{ fill: '#BBC6CE', width: '24px', height: '24px' }} viewBox="0 0 512 512"><path d="M470.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L192 338.7 425.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/></svg>
	const svgUnChecked = <svg xmlns="http://www.w3.org/2000/svg" style={{ fill: '#BBC6CE', width: '24px', height: '24px' }} viewBox="0 0 320 512"><path d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z"/></svg>


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
					className='secondary'
					onClick={() => setCompletadas(!completadas)}
					style={{ width: 'auto', textAlign: 'center', height:'90%' }}
					data-tooltip={`Ver tareas ${completadas ? 'incompletas' : 'completadas'}`}
					data-placement='left'
				>
					{completadas ? svgUnChecked : svgCheck}
				</button>
			</div>
			{whatToRender()}
		</div>
	)
}

export default TaskList
