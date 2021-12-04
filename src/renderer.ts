import './index.css';
import './styles/login.css'
import './styles/taskDetails.css';
import './styles/taskListView.css';
import './styles/layout.css';
import './styles/settings.css';
import './styles/all.min.js'

import { IpcRenderer } from 'electron/renderer';
import { IpcMessage } from './ipc/ipcMessages';

import './react-app.tsx'

export function sendIpcMessage(ipcRenderer: IpcRenderer, message: IpcMessage) {
    console.log("Task message send to channel: " + message.channel);
    ipcRenderer.send(message.channel, ...message.args);
}

