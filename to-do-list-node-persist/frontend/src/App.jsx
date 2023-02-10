import reactLogo from './assets/react.svg'
import './App.css'
import Tasks from './components/Tasks'
import { useEffect, useState } from 'react'
import { createTask, getAllTasks } from './api-calls/api-calls'

function App() {

  // ! keep one dummy task from the beginning if there are no previous items in the localStorage.
  
  const localStorageData =  JSON.parse(localStorage.getItem('tasks')) || [{id:11111,taskName:'dummy task'}];
  
  
  useEffect(()=>{
    
    getTasks()
  },[])
 
  const [task,setTask] = useState()
  const [allTasks,setAlltasks] = useState();
  const handleChange = (e)=>{
   
    setTask({...task,[e.target.name]:e.target.value});
    
  }

  // ! this function is called inside useEffect, which means it will run everytime the app loads
  const getTasks = async()=>{
    const response2 = await getAllTasks();
    console.log('called')
    // ! the useEffect runs and when the control reaches here, it checks if there any tasks in the node-persist
    // ! if not, then it removes all previous tasks from the localStorage.
    // ! this helps to keep in sync with the reality/ truth/ state of the data in the backend.
    if(!response2.data.tasks){
      localStorage.removeItem('tasks')
      
      
    }
    // ! the allTasks is set to the items present in the localStorage
    setAlltasks(JSON.parse(localStorage.getItem('tasks')))
    
    console.log(response2?.data?.tasks)
    

  }

  const addTask = async()=>{
    // ! if the task field is empty then don't proceed
    if(!task){
      return;
    }
    const response = await createTask(task);

    console.log(response)
    const response2 = await getAllTasks();
    console.log(response2)
   
    localStorage.setItem('tasks',JSON.stringify(response2?.data?.tasks))

    // ! the interesting thing to note is that allTasks is not being used anywhere
    // ! but it is used to trigger a re-render. when the re-render is triggered, the useEffect runs.
  //  ! finally we are only passing the localStorage data itself and not some state variable to the Tasks child component as prop

  // ! re-rendering is quite important in this case to keep track of already present items in the localstorage.
    setAlltasks(response2?.data?.tasks)
   


   
    localStorage.setItem('tasks',JSON.stringify(response2?.data?.tasks))

   
  }

  return (
    <>
    <h2>To Do List Using Node Persist</h2>
    <div className="dark form-container">
     <div class="mb-3 d-lg-flex w-100">
  <label for="exampleFormControlInput1" class="form-label">Enter the task</label>
  <input type="text" className="form-control w-50" name='taskName' onChange={(e)=>handleChange(e)} id="exampleFormControlInput1" placeholder="Enter your task here"/>
  <button className='btn' onClick={()=>addTask()}>Add Task</button>
</div>

    </div>

    <Tasks allTasks={localStorageData} />
    </>
  )
}

export default App
