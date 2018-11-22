import * as React from 'react';

const AddItem = (props: any) => {
  return (
    <div className="addTodo">
            <input 
              type="text" 
              className="Todo-task" 
              placeholder="Enter new Todo"
              onChange={ event => props.changeTask(event) }
            />
            <button 
              className="Todo-button"
              onClick={props.createTask}>
              Add Todo
            </button>
          </div> 
  );
}

export default AddItem;