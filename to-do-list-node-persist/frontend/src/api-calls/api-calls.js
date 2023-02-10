import axios from 'axios'
const baseURL = 'http://localhost:5000'

export const getAllTasks = async()=>{
    try {
        return await axios.get(`${baseURL}/api/tasks/getAllTasks`)
    } catch (error) {
        return error.response
    }
}

export const createTask = async(data)=>{
    try {
        return await axios.post(`${baseURL}/api/tasks/createTask`,data)
    } catch (error) {
        return error.response
    }
}