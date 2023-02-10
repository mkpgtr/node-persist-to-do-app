import React, { useEffect, useState } from 'react'
import { getAllTasks } from '../api-calls/api-calls'
import './Tasks.css'

const Tasks = ({...tasks}) => {


    // ! get the props
    const myTasks = tasks?.allTasks;

 
  return (
    // ! render the props inside the tasks-container
    <div className='tasks-container'>
       {myTasks && myTasks.map((task,index)=>{
        return <p key={index}>{task.taskName}</p>
       })}
    </div>
  )
}

export default Tasks