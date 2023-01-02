export enum ModeEnum {
  Web = 'Web',
  Desktop = 'Desktop',
  Mobile = 'Mobile'
}

export enum StatusEnum {
  Done = 'DONE',
  InProgress = 'IN_PROGRESS'
}

export enum ChannelEnum {
  Save = 'save',
  Load = 'load',
  SaveDone = 'save-done',
  SavedGames = 'saved-games',
}

export type SavedGamesFunction = (event: any, data: string) => void;
export type SaveStatusFunction = (event: any, data: StatusEnum) => void;

export interface ElectronApi {
  subscribeForSavedGames: (callback: SavedGamesFunction) => void,
  subscribeForSaveDone: (callback: SaveStatusFunction) => void,
  saveEntry: (key: string, data: string) => void,
  loadEntry: (key: string) => void,
}