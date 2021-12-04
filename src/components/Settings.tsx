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


const Settings = (): ReactElement => {

  const [showSettings, setShowSettings] = useState(false);
  const [myDayEnabled, setMyDayEnabled] = useState(false);
  const [importantEnabled, setImportantEnabled] = useState(false);

  const getUserSettings = async () => {
    const settings = await useSettings();
    setMyDayEnabled(settings.data.myDayEnabled);
    setImportantEnabled(settings.data.importantEnabled);
  }

  getUserSettings();

  const changeMyDayDisplay = async () => {
    console.log("Changing display of My day built in list to " + !myDayEnabled);
    await setSettingsMyDayEnabled(!myDayEnabled);
    setMyDayEnabled(!myDayEnabled);
  }

  const changeImportantDisplay = async () => {
    console.log("Changing display of Important built in list to " + !importantEnabled);
    await setSettingsImportantEnabled(!importantEnabled);
    setImportantEnabled(!importantEnabled);
  }

  /*
  ** Rendering
  */

  return(
    <div className="settingsButton unselectable"
        onClick={() => {setShowSettings(!showSettings)}}>
      <i className="settingsIcon fas fa-cogs fa-sm" />
      Settings
      {myDayEnabled || importantEnabled ?
        <Divider/>
        :
        null
      }

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
              <SettingsOption title="Display the 'My day' built in list" 
                  callback={changeMyDayDisplay} init={myDayEnabled} />
              <SettingsOption title="Display the 'Important' built in list" 
                  callback={changeImportantDisplay} init={importantEnabled} />
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
