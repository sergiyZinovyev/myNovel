import { ModeEnum } from "@myorg/game-data";
import { IEnvironment } from "@environment/environment.interface";

export const environment: IEnvironment = {
  production: false,
  rootRout: './assets/data',
  mode: ModeEnum.Desktop
  //rootRoutMob: '~/assets/data'
};