import mysql from 'mysql2'
import dotenv from 'dotenv'
dotenv.config()

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise()

export async function getTasks() {
    const [rows] = await pool.query("select * from task")
    console.log(rows)
    return rows
}

export async function getTask(id) {
    const [rows] = await pool.query("select * from task where id = ?", [id])
    return rows[0]
}

export async function deleteTask(id) {
    const rows = await pool.query("delete from task where id = ?", [id])
    return rows
}

export async function updateTaskReminder(id, reminder) {
    const rows = await pool.query("update task set reminder = ? where id = ?", [reminder,id])
    return getTask(id)
}

export async function createTask(text, day, reminder) {
    const [result] = await pool.query(`
    INSERT INTO task (text, day, reminder)
    VALUES (?, ?, ?)
    `, [text, day, reminder])
    const id = result.insertId
    return getTask(id)
}