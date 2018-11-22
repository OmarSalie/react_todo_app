import * as React from "react";
import todoApi from './todoApi';
import ListItems from './ListItems';
import ChangeList from './ChangeList';
import Display from './Display';
import AddItem from './AddItem';

class TodoApp extends React.Component<any, any> {
  public state = {
    list: undefined,
    task: undefined,
    tasks: [] as any[],
    display: undefined,
    search: undefined
  }

  constructor(props: any) {
    super(props);

    this.state.list = props.list;
    this.state.task = props.task;
    this.state.tasks = props.list;
    this.state.display = props.display;
    this.state.search = props.search;
  }
//==================================================================================================================================
// Set state by input
//==================================================================================================================================
  changeList = (event: any) => {
    this.setState({ list: event.target.value }, () => {
      if(this.state.display == "all") {
        this.loadAllTasks();
      }
      if(this.state.display == "complete") {
        this.loadCompleteTasks();
      }
      if(this.state.display == "incomplete") {
        this.loadIncompleteTasks()
      }
    });    
  }  

  changeTask = (event: any) => {
    this.setState({ task: event.target.value });
  }

  changeSearch = (event: any) => {
    this.setState({ search: event.target.value }, () => {
      this.searchByTask();
    });
  }
//==================================================================================================================================
// Set state by API
//==================================================================================================================================
  createTask = () => {
    // todoApi.create({ task: this.state.task, done: false })

    todoApi.create({ task: this.state.task, done: false, list: this.state.list })

      if(this.state.display == "all") {
        this.loadAllTasks();
      }
      if(this.state.display == "complete") {
        this.loadCompleteTasks();
      }
      if(this.state.display == "incomplete") {
        this.loadIncompleteTasks()
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
  }

  loadAllTasks = () => {
    todoApi.filterBy('list', this.state.list)
    .then(
      (result) =>  {
        this.setState({tasks: result}, () => {

        });
      }
    )
    .catch(
      (e) => {
        console.log(e);
      }
    )
  }

  loadCompleteTasks = () => {
    todoApi.filterBy('list', this.state.list)
    .then(
      (specificList) => {
        const result = specificList.filter(
          function(result) {
          return result['done'] == true;
        })
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
    todoApi.filterBy('list', this.state.list)
    .then(
      (specificList) => {
        const result = specificList.filter(
          function(result) {
          return result['done'] == false;
        })
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
    todoApi.filterBy('list', this.state.list)
    .then(
      (specificList) => {
        const result = specificList.filter(
          function(result) {
          return result['task'].includes(searchFor);
        })
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
    this.defaultList();
    this.loadAllTasks();
  }

  componentDidMount = () => {
    document.title = "To Do App"
  }

  sh
//==================================================================================================================================
// Display state
//==================================================================================================================================
  defaultDisplay = () => {
    this.setState({
      display: "all"
    })
    this.loadAllTasks();
  }

  defaultList = () => {
    this.setState({
      list: "list1"
    }, () => {
      this.loadAllTasks();
    })
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
    // Returned HTML(JSX)
    //==============================================================================================================================
    return (
      <div className="Todo-main">
        <ChangeList 
          list = {this.state.list}
          changeList = {this.changeList}
        />
        <div className="Todo-input">
          <AddItem 
            changeTask = {this.changeTask}
            createTask = {this.createTask}
          />
          <Display 
            search = {this.state.search}
            changeSearch = {this.changeSearch}
            defaultDisplay = {this.defaultDisplay}
            displayIncomplete = {this.displayIncomplete}
            displayComplete = {this.displayComplete}
          />
          <div className="tasksList">
            <ListItems 
              tasks = {this.state.tasks}
              update = {this.updateTask}
              delete = {this.deleteTask}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default TodoApp;

