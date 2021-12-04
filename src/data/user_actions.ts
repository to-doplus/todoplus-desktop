// To-Do Plus
// user_actions.ts
// @author Miroslav Safar (xsafar23)

import { mutate } from "swr";
import client from "./client";

/**
 * Checks if user is logged in
 * @returns True if user if logged in
 */
 export function isAuthenticated(): boolean {
    return !!client.getBearerToken();
}

export async function loadAuthTokenFromKeyTar(): Promise<boolean> {
    const token = await window.electron.ipcRenderer.invoke("get-auth-token");
    console.log("Token z keytaru:")
    console.log(token);
    if (!token) {
        console.log("Returning false");
        return false
    }
    client.setBearerToken(token);
    return true;
}

/**
 * Login user with credentials and saves the token into system password management
 * @param username Username
 * @param password Password
 * @returns True if it was successfull
 */
 export async function login(username: string, password: string): Promise<boolean> {
    const token = await client.login(username, password);
    if (!token) {
        //Error
        return false;
    }
    window.electron.ipcRenderer.send("set-auth-token", token);
    return true;
}

export async function register(username: string, email: string, password: string): Promise<boolean> {
    const token = await client.registerAndLogin(username, email, password);
    if (!token) {
        //Error
        return false;
    }
    window.electron.ipcRenderer.send("set-auth-token", token);
    return true;
}

export async function logout() {
    await window.electron.ipcRenderer.invoke("delete-auth-token");
    client.setBearerToken(undefined);
    await mutate("/taskslists")
    await mutate("/tasklists/c/myday/tasks")
    await mutate("/tasklists/c/important/tasks")
}

export async function setSettingsImportantEnabled(value: boolean) {
    const userSettings = await client.setImportantEnabled(value);
    if (!userSettings) {
        return false;
    }
    mutate('/users/settings', userSettings, false);
    return true;
}

export async function setSettingsMyDayEnabled(value: boolean) {
    const userSettings = await client.setMyDayEnabled(value);
    if (!userSettings) {
        return false;
    }
    mutate('/users/settings', userSettings, false);
    return true;
}

