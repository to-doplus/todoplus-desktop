/*
** To-Do Plus
** SettingsMenu.tsx
** @author: Patrik Skaloš (xskalo01)
*/

import React, { ReactElement } from "react";

const SettingsMenu = (): ReactElement => {

  /*
  ** Rendering
  */

  return(
    <div className="settingsMenuWrapper">
      <div className="settingsMenu" onClick={(e) => e.stopPropagation()}>
        <div className="settingsMenuTitle">
          <p className="settingsMenuTitleText">Settings</p>
          <i className="settingsMenuClose fas fa-times fa-2x"></i>
        </div>

      </div>
    </div>
  );
}

export default SettingsMenu;
