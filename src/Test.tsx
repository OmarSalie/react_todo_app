import * as React from "react";

class Test extends React.Component<any, any> {
  public render() {
    const data =[{"name":"test1"},{"name":"test2"}];
    const listItems = data.map((d) => <li key={d.name}>{d.name}</li>);

    return (
      <div className="test">
      {listItems }
      <div>Hello</div>
      </div>
      
    );
  }
}

export default Test;