import { createContext, useContext, useState } from 'react'

import { supabase } from '../Backend/client'
export const TaskContext = createContext()

export const useTasks = () => {
	const context = useContext(TaskContext)
	if (!context) throw new Error('useTasks must be within a TaskContextProvider')
	return context
}

export const TaskContextProvider = ({ children }) => {
	const [tasks, setTasks] = useState([])
	const [adding, setAdding] = useState()
	const [loading, setLoading] = useState(false)
	const [completadas, setCompletadas] = useState(false)
	/* const [deleting, setDeleting] = useState(false) */

	const getUser = async () => {
		const { data } = await supabase.auth.getUser()
		const { user } = data
		return {
			userId: user?.id,
			email: user?.email,
		}
	}

	const getTasks = async (done = false) => {
		setLoading(true)

		const { userId } = await getUser()
		const { error, data } = await supabase
			.from('Tareas')
			.select()
			.eq('userId', userId)
			.eq('completada', done)

		if (error) {
			throw error
		} else {
			setTasks(data)
		}

		setLoading(false)

		console.log(data)
		return data
	}

	const createTask = async (taskName, priority) => {
		setAdding(true)
		try {
			const {
				data: { user },
			} = await supabase.auth.getUser()

			const { data, error } = await supabase
				.from('Tareas')
				.insert({
					nombre: taskName,
					userId: user.id,
					priority: priority
				})
				.select()

			if (error) throw error
			setTasks([...tasks, ...data])

			console.log('tarea agregada con exitoso exito')
		} catch (error) {
			console.log(error)
		} finally {
			setAdding(false)
		}
	}

	const deleteTask = async id => {
		const { userId } = await getUser()

		const { error, data } = await supabase
			.from('Tareas')
			.delete()
			.eq('userId', userId)
			.eq('id', id)

		if (error) throw error

		/* Quitar el objeto eliminado del estado */
		setTasks(tasks.filter(task => task.id !== id))
	}

	const updateTask = async (id, updateFields) => {
		const { userId } = await getUser()
		const { error } = await supabase
			.from('Tareas')
			.update(updateFields)
			.eq('userId', userId)
			.eq('id', id)

		if (error) throw `Esto es lo que está pasando: ${error}`

		setTasks(tasks.filter(task => task.id !== id))
	}

	return (
		<TaskContext.Provider
			value={{
				tasks,
				getTasks,
				getUser,
				createTask,
				adding,
				loading,
				deleteTask,
				updateTask,
				completadas,
				setCompletadas,
			}}
		>
			{children}
		</TaskContext.Provider>
	)
}
