// To-Do Plus
// renderer.ts
// @authors Miroslav Safar (xsafar23), Michaela Parilova (xparil04), Patrik Skaloš (xskalo01)

import './index.css';
import './styles/login.css'
import './styles/taskDetails.css';
import './styles/taskListView.css';
import './styles/layout.css';
import './styles/settings.css';
import './styles/homepage.css';
import './styles/all.min.js';

import { IpcRenderer } from 'electron/renderer';
import { IpcMessage } from './ipc/ipcMessages';

import './react-app.tsx'

/**
 * Send IPC Message to main process
 * @param ipcRenderer IPC Renderer
 * @param message Message
 */
export function sendIpcMessage(ipcRenderer: IpcRenderer, message: IpcMessage) {
    console.log("Task message send to channel: " + message.channel);
    ipcRenderer.send(message.channel, ...message.args);
}

