/*
** To-Do Plus
** Settings.tsx
** @author: Patrik Skaloš (xskalo01)
*/

import React, { ReactElement, useState } from "react";

const Settings = (): ReactElement => {

  const [showSettings, setShowSettings] = useState(false);

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
          </div>
        </div>
        :
        null
      }

    </div>

  );
}

export default Settings;
