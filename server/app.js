import express from 'express'
import cors from 'cors'

import { getTasks, getTask, createTask, deleteTask, updateTaskReminder } from './database.js'

const app = express()
app.use(cors());
app.use(express.json())

app.get("/tasks", async (req, res) =>{
	try {
		const tasks = await getTasks()
		res.json(tasks)
	} catch (ex) {
		console.error(ex)
	}
})

app.put("/tasks/:id", async (req, res) =>{
	const id = req.params["id"];
	const reminder = req.body["reminder"];
	console.log(req.params);
	console.log(`####${id}:${reminder}`);
	try {
		const task = await updateTaskReminder(id, reminder)
		res.json(task)
	} catch (ex) {
		console.error(ex)
	}
})

app.get("/tasks/:id", async (req, res) =>{
	const { id } = req.params;
	try {
		const task = await getTask(id)
		res.json(task)
	} catch (ex) {
		console.error(ex)
	}
})

app.delete("/tasks/:id", async (req, res) =>{
	try {
		const { id } = req.params;
		const tasks = await deleteTask(id)
		res.json(tasks)
	} catch (ex) {
		console.error(ex)
	}
})


app.post("/tasks", async(req, res) => {
	const { text, day, reminder } = req.body;
	const task = await createTask(text, day, reminder);
	res.json(task)
})

app.listen(5000, ()=>{
    console.log(`Server is running on port 5000`)
})