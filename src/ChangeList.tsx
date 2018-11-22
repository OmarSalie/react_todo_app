import * as React from 'react';

const ChangeList = (props: any) => {
  return (
    <div className="changeList">
      <select value={props.list} onChange={ event => props.changeList(event) } className="dropdown-list">
        <option value="list1">List 1</option>
        <option value="list2">List 2</option>
        <option value="list3">List 3</option>
      </select>
      {/* <input type="radio" value="list1" name="list" checked={props.list === "list1"} onChange={ event => props.changeList(event) }/>
      <span>List 1 |</span>
      <input type="radio" value="list2" name="list" checked={props.list === "list2"} onChange={ event => props.changeList(event) }/>
      <span>List 2 |</span>
      <input type="radio" value="list3" name="list" checked={props.list === "list3"} onChange={ event => props.changeList(event) }/>
      <span>List 3</span> */}
    </div>
  );
}

export default ChangeList