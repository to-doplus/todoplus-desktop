/*
** To-Do Plus
** SettingsOption.tsx
** @author: Patrik Skaloš (xskalo01)
*/

import React, { ReactElement, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export interface SettingsOptionProps{
  title: string;
  callback: any;
  init: boolean;
}

/**
** A setting - one line from the settings menu consisting of some text and a
** checkbox to enable/disable the setting
**
** @author: Patrik Skaloš (xskalo01)
*/
const SettingsOption = (props: SettingsOptionProps): ReactElement => {

  /*
  ** States
  */

  const [toggled, setToggled] = useState(props.init);

  /*
  ** Rendering
  */

  return(
    <div className="settingsOption">
      <div className="settingsOptionName">
        {props.title}
      </div>
      <div className="settingsOptionButton"
          onClick={(e) => {setToggled(!toggled); props.callback()}}>
        {toggled ?
          <FontAwesomeIcon className="settingsOptionIcon" 
              icon={["far", "check-circle"]} size={"lg"} />
          :
          <FontAwesomeIcon className="settingsOptionIcon" 
              icon={["far", "circle"]} size={"lg"} />
        }
      </div>
    </div>
  );
}

export default SettingsOption;
