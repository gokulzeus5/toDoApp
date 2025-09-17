import React, { useState } from "react";
import "./App.css";

export default function App() {
  
   const [task,setTask] = useState('');
   const [tasks,setTasks] = useState([]);
   const [isEditing , setIsEditing] = useState(false);
   const [currentIndex , setCurrentIndex] = useState(null);
   const [error,setError] = useState('');

    const addTask = () =>{
      if(task.trim() === ""){
        setError("Task cannot be empty!");
        return
      } 
      if(!isEditing && tasks.includes(task.toLowerCase())){
        setError("Task already exists!");
        return;
      }

      if(isEditing){
        const updatedTasks =[...tasks];
        updatedTasks[currentIndex] = task;
        setTasks(updatedTasks)
        setIsEditing(false);
        setCurrentIndex(null)
      }else{
        setTasks([...tasks,task.toLowerCase()]);
      }
      setTask('');
      setError("")
    }
    const editTask= (index) =>{
      setTask(tasks[index]);
      setIsEditing(true);
      setCurrentIndex(index);
      
    }

    const deleteTask =(index) =>{
      const updatedTasks = tasks.filter((v,i)=> i !== index);
      setTasks(updatedTasks);
    }
    
  return (
    <div className="app-container">
      <div className="todo-card">
        <h1 className="title">✨ My To-Do List</h1>
        
        <div className="input-section">
          <input type="text" placeholder="Add a new task..." className="todo-input" value={task} onChange={(e)=>setTask(e.target.value)} />
          <button className="add-btn" onClick={addTask}> {isEditing ? "✔" : "+"} </button>
        </div>
        {error && <p className="error-text">{error}</p>}

        <ul className="todo-list">
          {tasks.map((value,index)=>(
          <li key={index} className="todo-item">
            <span className="task-text">{value}</span>
            <div className="actions">
              <button className="edit-btn"  onClick={()=>editTask(index)}>✏️</button>
              <button className="delete-btn" onClick={()=>deleteTask(index)}> ✅ </button>
            </div>
          </li>
           ))}
        </ul>
      </div>
    </div>
  );
}
