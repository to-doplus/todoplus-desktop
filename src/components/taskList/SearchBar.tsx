/*
** To-Do Plus
** SearchBar.tsx
** @author: Patrik Skaloš (xskalo01)
*/

import React, { ReactElement, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export interface SearchBarProps{
  setSearchPhrase: any;
}

/**
** @brief Lose focus of a form after it is submitted
*/
const loseFocus = () => {
  if(document.activeElement instanceof HTMLElement){
    document.activeElement.blur()
  }
}

/**
** A search bar allowing the user to put in a string and filter all the tasks
** by containment of that string
**
** @author Patrik Skaloš (xskalo01)
*/
const SearchBar = (props: SearchBarProps, ref: React.LegacyRef<HTMLInputElement>): ReactElement => {
  return(
    <div className="searchBar">
      <FontAwesomeIcon className="searchBarIcon"
          icon={["fas", "search"]} size={"lg"} />
      <form className="searchBarForm unselectable"
            onSubmit={(e) => {e.preventDefault(); loseFocus()}}>
        <input ref={ref} type="text" className="searchBarInput"
            placeholder="Search for a task by name" spellCheck="false"
            onChange={(e) => {
              props.setSearchPhrase(e.target.value);
            }}/>
      </form>
    </div>
  );
}

export default React.forwardRef(SearchBar)
