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
  value: boolean;
}

/**
** A setting - one line from the settings menu consisting of some text and a
** checkbox to enable/disable the setting
**
** @author: Patrik Skaloš (xskalo01)
*/
const SettingsOption = (props: SettingsOptionProps): ReactElement => {

  /*
  ** Rendering
  */

  return(
    <div className="settingsOption">
      <div className="settingsOptionName">
        {props.title}
      </div>
      <div className="settingsOptionButton"
          onClick={(e) => {props.callback()}}>
        {props.value ?
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
