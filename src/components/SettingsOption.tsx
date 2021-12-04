/*
** To-Do Plus
** SettingsOption.tsx
** @author: Patrik Skaloš (xskalo01)
*/

import React, { ReactElement, useState } from "react";

export interface SettingsOptionProps{
  title: string;
  callback: any;
  // settings: ;
}

const SettingsOption = (props: SettingsOptionProps): ReactElement => {

  const [toggled, setToggled] = useState(true); // TODO init from the server

  /*
  ** Rendering
  */

  return(
    <div className="settingsOption">
      <div className="settingsOptionName">
        {props.title}
      </div>
      <div className="settingsOptionButton"
          onClick={(e) => {setToggled(!toggled); props.callback(); console.log(toggled)}}>
        {toggled ?
          <i className="far fa-check-circle fa-lg" />
          :
          <i className="far fa-circle fa-lg" />
        }
      </div>
    </div>
  );
}

export default SettingsOption;
