import * as React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

const ListItems = (props: any, { match }: any) => {
  return (
    <div>
      <Router>
        <DisplayList 
          tasks = {props.tasks}
          changeTask = {props.changeTask}
          updateTask = {props.updateTask}
          updateTrue = {props.updateTrue}
          delete = {props.delete}
          updateFalse = {props.updateFalse}
        />

      </Router>
    </div>
  )
}

const DisplayList = (props: any) => {
  const tasks = props.tasks;
  let items = [] as any[];

  if(typeof tasks != "undefined") {
    for(let i = 0; i < tasks.length; i++) {
      items.push(
        <span>
          <li 
            className="list-items" 
            key={tasks[i].id}>
            <span className="edit-buttons-span">
              <button className="edit-buttons" onClick={() => {props.updateTrue({ id: tasks[i].id })}}>
                Done
              </button>
              <button className="edit-buttons" onClick={() => {props.updateFalse({ id: tasks[i].id })}}>
                To-Do
              </button>
              <button className="edit-buttons" onClick={() => {props.delete({ id: tasks[i].id })}}>
                X
              </button>
            </span>
            {tasks[i].done 
              ? <span className="item-status"><del><Link className="edit-link" to={`/${tasks[i].id}`} >{tasks[i].task}</Link></del></span> 
              : <span className="item-status"><Link className="edit-link" to={`/${tasks[i].id}`} >{tasks[i].task}</Link></span>
            }
            {/* <Link to={`/${tasks[i].id}`} >{tasks[i].task}</Link> */}
            <Route 
              exact path={`/${tasks[i].id}`} 
              render = { () => 
                <Hello id={tasks[i].id} updateTask={props.updateTask} changeTask={props.changeTask}/> 
              }
            />
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

const Hello = (props: any) => {
  const ID = { id: props.id }
  console.log(ID);
  return (
    <div>
      <br/>
      <p>{ID.id}</p>
      <input type="text" onChange={event => props.changeTask(event)}/>
      <button 
        // onClick={props.updateTask(ID)}
      >
        Update Task
      </button>
    </div>
  );
}

export default ListItems