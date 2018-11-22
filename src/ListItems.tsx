import * as React from 'react';

const ListItems = (props: any) => {
  return (
    <div>
      <DisplayList 
        tasks = {props.tasks}
        update = {props.update}
        delete = {props.delete}
      />
    </div>
  )
}

const DisplayList = (props: any) => {
  const tasks = props.tasks;
    let items = [] as any[];
    if(typeof tasks == "undefined") {

    }
    else {
      for(let i = 0; i < tasks.length; i++) {
        items.push(
          <span>
            <li 
              className="list-items" 
              key={tasks[i].id}>
              <span className="edit-buttons-span">
                <button className="edit-buttons" onClick={() => {props.update({ id: tasks[i].id })}}>
                  Done
                </button>
                <button className="edit-buttons" onClick={() => {props.delete({ id: tasks[i].id })}}>
                  X
                </button>
              </span>
              {tasks[i].task}
              {tasks[i].done ? <span className="item-status">[DONE]</span> : <span className="item-status">[TO DO]</span>}
            </li>
            {/* <li key={tasks[i].id}> {tasks[i].task} {tasks[i].done && <span> [DONE]</span>} </li> */}
            
          </span>)
      }
    }

    return (
      <ul>
        { items }
      </ul>
    );
}

export default ListItems