import React from "react";
import { useState } from "react";

export default function Todo(props){
   
  const [isEditing, setEditing] = useState(false);
  const [newName , setNewName] = useState('');

  function handleChange(e){
    setNewName(e.target.value);
  }
  function hadleSubmit(e){
    e.preventDefault();
    if(newName.length>1){
      props.editTask(props.id,newName)
    setNewName("");
    setEditing(false);
    }else{
      alert("Please Describe your task properly");
    }
  }

  const editingTemplate = (
    <form className="stack-small" onSubmit ={hadleSubmit}>
      <div className="form-group">
        <label className="todo-label" htmlFor={props.id}>
          New name for {props.name}
        </label>
        <input id={props.id} className="todo-text" type="text" value={newName} onChange={handleChange} />
      </div>
      <div className="btn-group">
        <button type="button" className="btn todo-cancel" onClick={() => setEditing(false)}  >
          Cancel
          <span className="visually-hidden">renaming {props.name}</span>
        </button>
        <button type="submit" className="btn btn__primary todo-edit">
          Save
          <span className="visually-hidden">new name for {props.name}</span>
        </button>
      </div>
    </form>
  );
  console.log(props.filter);
  const viewTemplate = (
    <div className="stack-small">
      <div className="c-cb">
          <input
            id={props.id}
            type="checkbox"
            defaultChecked={props.completed}
            onChange={() => props.toggleTaskCompleted(props.id)}
          />
          <label className={props.completed && props.filter == "All" ? "todo-label strikethrough" : "todo-label"} htmlFor={props.id}>
            {props.name}
          </label>
        </div>
        <div className="btn-group">
          <button type="button" className="btn" onClick={() => setEditing(true)}  >
            Edit <span className="visually-hidden">{props.name}</span>
          </button>
          <button
            type="button"
            className="btn btn__danger"
            onClick={() => props.deleteTask(props.id)}
          >
            Delete <span className="visually-hidden">{props.name}</span>
          </button>
        </div>
    </div>
  );
  
  // const taskList=props.task.map((task)=> <Todo id={task.id} name={task.name} completed={task.completed} />)

    return(
        <li className="todo">
          {isEditing ? editingTemplate : viewTemplate}
        </li>
    );
}