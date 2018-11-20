import * as React from "react";
import todoApi from './todoApi';

class TodoApp extends React.Component<any, any> {
  public state = {
    task: undefined,
    id: undefined,
    tasks: [] as any[],
    display: undefined,
    search: undefined
  }

  constructor(props: any) {
    super(props);

    this.state.task = props.task;
    this.state.id = props.id;
    this.state.tasks = props.list;
    this.state.display = props.display;
    this.state.search = props.search;
  }
//==================================================================================================================================
// Set state by input
//==================================================================================================================================
  changeTask = (event: any) => {
    this.setState({ task: event.target.value});
  }

  changeSearch = (event: any) => {
    this.setState({ search: event.target.value });
    this.searchByTask();
  }
//==================================================================================================================================
// Set state by API
//==================================================================================================================================
  createTask = () => {
    todoApi.create({ task: this.state.task, done: false })
      .then(
        (result) => {
          this.setState({id: result})
        }
      )
      .catch(
        (e) => {
          console.log(e)
        }
      )
      if(this.state.display == "all") {
        this.loadAllTasks();
      }
      if(this.state.display == "complete") {
        this.loadCompleteTasks();
      }
      if(this.state.display == "incomplete") {
        this.loadIncompleteTasks()
      }
      if(this.state.display == "search") {
        this.displaySearched()
      }
  }
  
  deleteTask = (props: any) => {
    todoApi.remove(props.id)
    if(this.state.display == "all") {
      this.loadAllTasks();
    }
    if(this.state.display == "complete") {
      this.loadCompleteTasks();
    }
    if(this.state.display == "incomplete") {
      this.loadIncompleteTasks()
    }
    if(this.state.display == "search") {
      this.displaySearched()
    }
  }

  updateTask = (props: any) => {
    todoApi.update(props.id, { done: true })
    if(this.state.display == "all") {
      this.loadAllTasks();
    }
    if(this.state.display == "complete") {
      this.loadCompleteTasks();
    }
    if(this.state.display == "incomplete") {
      this.loadIncompleteTasks()
    }
    if(this.state.display == "search") {
      this.displaySearched()
    }
  }

  loadAllTasks = () => {
    todoApi.all()
    .then(
      (result) =>  {
        this.setState({
          tasks: result
        })
      }
    )
    .catch(
      (e) => {
        console.log(e);
      }
    )
  }

  loadCompleteTasks = () => {
    todoApi.filterBy('done', true)
    .then(
      (result) =>  {
        this.setState({   
          tasks: result  
        })
      }
    )
    .catch(
      (e) => {
        console.log(e);
      }
    )
  }

  loadIncompleteTasks = () => {
    todoApi.filterBy('done', false)
    .then(
      (result) =>  {
        this.setState({
          tasks: result
        })
      }
    )
    .catch(
      (e) => {
        console.log(e);
      }
    )
  }

  searchByTask = () => {
    let searchFor = this.state.search
    todoApi.filterByAny('task', searchFor).then(
      (result) =>  {
        this.setState({
          tasks: result
        })
      }
    )
    .catch(
      (e) => {
        console.log(e);
      }
    )
  }
//==================================================================================================================================
// Component mounts
//==================================================================================================================================
  componentWillMount = () => {
    this.defaultDisplay();
    this.loadAllTasks();
  }

  componentDidMount = () => {
    document.title = "To Do App"
  }
//==================================================================================================================================
// Display state
//==================================================================================================================================
  defaultDisplay = () => {
    this.setState({
      display: "all"
    })
    this.loadAllTasks();
  }

  displaySearched = () => {
    this.setState({
      display: "searched"
    })
    this.searchByTask();
  }

  displayComplete = () => {
    this.setState({
      display: "complete"
    })
    this.loadCompleteTasks();
  }

  displayIncomplete = () => {
    this.setState({
      display: "incomplete"
    })
    this.loadIncompleteTasks();
  }
//==================================================================================================================================
// Render
//==================================================================================================================================
  public render() {
    //==============================================================================================================================
    // Create list
    //==============================================================================================================================
    const tasks = this.state.tasks;
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
                <button className="edit-buttons" onClick={() => {this.updateTask({ id: tasks[i].id })}}>
                  Done
                </button>
                <button className="edit-buttons" onClick={() => {this.deleteTask({ id: tasks[i].id })}}>
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
    //==============================================================================================================================
    // Returned HTML(JSX)
    //==============================================================================================================================
    return (
      <div className="Todo-main">
        <div className="Todo-input">
          <input 
            type="text" 
            className="Todo-task" 
            placeholder="Enter new Todo"
            onChange={ event => this.changeTask(event) }
          />
          <button 
            className="Todo-button"
            onClick={this.createTask}>
            Add Todo
          </button>
          <div className="display">
            <input
              type="text"
              className="searchBar"
              placeholder="Search for Task"
              value={this.state.search}
              onChange={ event => this.changeSearch(event) }
              
            />
            {/* <button className="filter-buttons" onClick={this.displaySearched}>
              Search
            </button> */}
            <button className="filter-buttons" onClick={this.defaultDisplay}>
              ALL
            </button>
            <button className="filter-buttons" onClick={this.displayIncomplete}>
              TO-DO
            </button>
            <button className="filter-buttons last-right-button" onClick={this.displayComplete}>
              DONE
            </button>
          </div>
          <ul className="tasksList">
            { items }
          </ul>
        </div>
      </div>
    );
  }
}

export default TodoApp;

