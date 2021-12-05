/*
** To-Do Plus
** Settings.tsx
** @author: Patrik Skaloš (xskalo01)
*/

import React, { Fragment, ReactElement, useCallback, useState } from "react";
import SettingsOption from "./SettingsOption";
import { UserSettings } from "../../lib/models";
import { useSettings } from "../data/hooks";
import { setSettingsImportantEnabled, setSettingsMyDayEnabled } from "../data/user_actions";
import Divider from "./Divider";

/**
** A settings button (in the sidebar) - when clicked, this component also shows
** a menu drawn over all other components - user settings
**
** @author: Patrik Skaloš (xskalo01)
*/
const Settings = (): ReactElement => {

  /*
  ** States
  */
  const [showSettings, setShowSettings] = useState(false);
  const {isLoading, isError, data: settings} = useSettings();

  const changeMyDayDisplay = useCallback(async () => {
    const success = await setSettingsMyDayEnabled(!settings.myDayEnabled);
    if(!success) {
      //TODO: Handle error
    }
  }, [settings]);

  const changeImportantDisplay = useCallback(async () => {
    const success = await setSettingsImportantEnabled(!settings.importantEnabled);
    if(!success) {
      //TODO: Handle error
    }
  }, [settings]);

  /*
  ** Rendering
  */

  if(isLoading || isError) {
    return <Fragment />
  }

  return(
    <div className="settingsButton unselectable"
        onClick={() => {setShowSettings(!showSettings)}}>

      {/* The button opening the settings menu */}
      <i className="settingsIcon fas fa-cogs fa-sm" />
      Settings

      {/* Only display a divider if at least one built-in list is displayed */}
      {settings.myDayEnabled || settings.importantEnabled ?
        <Divider/>
        :
        null
      }

      {/* Settings menu (only shown after clicking on the button) */}
      {showSettings ? 
        <div className="settingsMenuWrapper">
          <div className="settingsMenu" onClick={(e) => e.stopPropagation()}>

            {/* Settings menu title */}
            <div className="settingsMenuTitle">
              <p className="settingsMenuTitleText">Settings</p>
              <div className="settingsMenuClose"
                onClick={() => {setShowSettings(!showSettings)}} >
                <i className="fas fa-times fa-2x" />
              </div>
            </div> {/* Settings menu title */}
            

            {/* Settings menu items */}
            <div className="settingsMenuItems">
              <SettingsOption title="Display the 'My day' built in list" 
                  callback={changeMyDayDisplay} value={settings.myDayEnabled} />
              <SettingsOption title="Display the 'Important' built in list" 
                  callback={changeImportantDisplay} value={settings.importantEnabled} />
            </div> {/* Settings menu items */}

          </div>
        </div>
        :
        null
      } {/* Settings menu (only shown after clicking on the button) */}

    </div>
  );
}

export default Settings;
