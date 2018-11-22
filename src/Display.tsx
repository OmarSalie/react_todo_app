import * as React from 'react';

const Display = (props: any) => {
  return (
    <div className="display">
      <input
        type="text"
        className="searchBar"
        placeholder="Search for Task"
        value={props.search}
        onChange={ event => props.changeSearch(event) }
        
      />
      <button className="filter-buttons" onClick={props.defaultDisplay}>
        ALL
      </button>
      <button className="filter-buttons" onClick={props.displayIncomplete}>
        TO-DO
      </button>
      <button className="filter-buttons last-right-button" onClick={props.displayComplete}>
        DONE
      </button>
    </div>
  )
}

export default Display;