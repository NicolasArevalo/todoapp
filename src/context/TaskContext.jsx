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
		const { userId, email } = await getUser()
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

		return data
	}

	const createTask = async taskName => {
		setAdding(true)
		try {
			const {
				data: { user },
			} = await supabase.auth.getUser()

			const { data, error } = await supabase.from('Tareas').insert({
				nombre: taskName,
				userId: user.id,
			}).select()

			if(error) throw error
			setTasks([...tasks, ...data])

			console.log('tarea agregada con exitoso exito')
		} catch (error) {
			console.log(error)
		} finally{
			setAdding(false)
		}
	}

	return (
		<TaskContext.Provider value={{ tasks, getTasks, getUser, createTask, adding, loading }}>
			{children}
		</TaskContext.Provider>
	)
}
