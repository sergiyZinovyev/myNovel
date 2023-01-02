import { ModeEnum } from "@myorg/game-data";
import { IEnvironment } from "@environment/environment.interface";

export const environment: IEnvironment = {
  production: true,
  rootRout: './assets/data',
  mode: ModeEnum.Web
};
