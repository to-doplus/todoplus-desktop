// To-Do Plus
// react-app.tsx
// @author Miroslav Safar (xsafar23)

import { IpcRendererEvent } from 'electron/renderer';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import { addTaskToMyDay } from './data/actions';
import { removeTaskFromMyDay } from './data/subtask_actions';

function render() {
      ReactDOM.render(<App />, document.body);
}

render();