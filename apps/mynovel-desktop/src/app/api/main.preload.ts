import { contextBridge, ipcRenderer } from 'electron';
import { ChannelEnum, ElectronApi, StatusEnum } from '@myorg/game-data';

const api: ElectronApi = {
  subscribeForSavedGames: (callback: (event: Electron.IpcRendererEvent, data: string) => void): void => {
    ipcRenderer.on(ChannelEnum.SavedGames, callback)
  },

  subscribeForSaveDone: (callback: (event: Electron.IpcRendererEvent, data: StatusEnum) => void): void => {
    ipcRenderer.on(ChannelEnum.SaveDone, callback)
  },

  saveEntry: (key: string, data: string): void => {
    ipcRenderer.send(ChannelEnum.Save, data, key)
  },

  loadEntry: (key: string): void => {
    ipcRenderer.send(ChannelEnum.Load, key)
  },
}

contextBridge.exposeInMainWorld('electron', api)

// contextBridge.exposeInMainWorld('electron', {
//   // getAppVersion: () => ipcRenderer.invoke('get-app-version'),
//   // platform: process.platform,
// });
