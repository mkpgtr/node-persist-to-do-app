const express = require('express');
const path = require('path')

const cors = require('cors')




  const app = express()
  


const storage = require('node-persist')




app.use(express.json())

app.use(cors());





app.get('/api/tasks/getAllTasks',async(req,res)=>{
    await storage.init()
    const tasks = await storage.getItem('tasks')
    if(!tasks){
      return res.status(404).json({msg:"No items found"})
    }
    res.status(200).json({tasks})
})
const tasks = []
app.post('/api/tasks/createTask',async(req,res)=>{

    const {taskName:task}=req.body;
    if(!task){
      return res.status(404).json({msg:"Please provide a task"})
    }
    const taskObject = {
      // ! this now function generates a unique id because it represents the milliseconds elapsed since the epoch.
      // ! what is epoch? epoch is defined as the midnight at the beginning of January 1, 1970 (ECMA Script epoch). // quite interesting
        id: Date.now(),
        taskName : task
    }
    // ! every task is an object
    tasks.push(taskObject)
    await storage.init()
    await storage.setItem('tasks',[...tasks])
    
  console.log(task)
    res.send({task})
})

app.listen(5000,async()=>{
    await storage.init()
    await storage.clear()
  
    console.log('app listening on port 5000')
})

