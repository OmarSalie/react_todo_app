import * as React from 'react';
import './App.css';

import logo from './logo.svg';
import TodoApp from './TodoApp';
// import Test from './Test';

class App extends React.Component {
  constructor(props: any) {
    super(props);
  }

  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">To Do App</h1>
        </header>
        <p className="App-intro">
          Simple To Do App built in React
        </p>
        <TodoApp />
      </div>
    );
  }
}

export default App;
