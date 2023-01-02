import { ElectronApi } from '@myorg/game-data';

export {};
declare global {
  interface Window {
    electron: ElectronApi;
  }
}
