/*
** To-Do Plus
** Settings.tsx
** @author: Patrik Skaloš (xskalo01)
*/

import React, { ReactElement, useState } from "react";
import SettingsOption from "./SettingsOption";

const Settings = (): ReactElement => {

  const [showSettings, setShowSettings] = useState(false);

  const a = () => {
    console.log("A");
  }

  /*
  ** Rendering
  */

  return(
    <div className="settingsButton unselectable"
        onClick={() => {setShowSettings(!showSettings)}}>

      <i className="settingsIcon fas fa-cogs fa-sm" />
      Settings

      {showSettings ? 
        <div className="settingsMenuWrapper">
          <div className="settingsMenu" onClick={(e) => e.stopPropagation()}>
            <div className="settingsMenuTitle">
              <p className="settingsMenuTitleText">Settings</p>
              <div className="settingsMenuClose"
                onClick={() => {setShowSettings(!showSettings)}} >
                <i className="fas fa-times fa-2x" />
              </div>
            </div>

            <div className="settingsMenuItems">
              <SettingsOption title="Display the 'My day' built in list" callback={a} init={true} />
              <SettingsOption title="Display the 'Important' built in list" callback={a} init={true} />
            </div>
          </div>
        </div>
        :
        null
      }

    </div>

  );
}

export default Settings;
