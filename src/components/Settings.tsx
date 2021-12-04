/*
** To-Do Plus
** Settings.tsx
** @author: Patrik Skaloš (xskalo01)
*/

import React, { ReactElement, useState } from "react";
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
  const [myDayEnabled, setMyDayEnabled] = useState(false);
  const [importantEnabled, setImportantEnabled] = useState(false);

  /**
  ** @brief Fetch user settings and change the states accordingly
  */
  const getUserSettings = async () => {
    const settings = await useSettings();
    setMyDayEnabled(settings.data.myDayEnabled);
    setImportantEnabled(settings.data.importantEnabled);
  }

  /**
  ** @brief Change the setting responsible for displaying (or not displaying)
  ** the 'My day' built in task list
  */
  const changeMyDayDisplay = async () => {
    console.log("Changing display of My day built in list to " + !myDayEnabled);
    await setSettingsMyDayEnabled(!myDayEnabled);
    setMyDayEnabled(!myDayEnabled);
  }

  /**
  ** @brief Change the setting responsible for displaying (or not displaying)
  ** the 'Important' built in task list
  */
  const changeImportantDisplay = async () => {
    console.log("Changing display of Important built in list to " + !importantEnabled);
    await setSettingsImportantEnabled(!importantEnabled);
    setImportantEnabled(!importantEnabled);
  }

  getUserSettings();

  /*
  ** Rendering
  */

  return(
    <div className="settingsButton unselectable"
        onClick={() => {setShowSettings(!showSettings)}}>

      {/* The button opening the settings menu */}
      <i className="settingsIcon fas fa-cogs fa-sm" />
      Settings

      {/* Only display a divider if at least one built-in list is displayed */}
      {myDayEnabled || importantEnabled ?
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
                  callback={changeMyDayDisplay} init={myDayEnabled} />
              <SettingsOption title="Display the 'Important' built in list" 
                  callback={changeImportantDisplay} init={importantEnabled} />
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
