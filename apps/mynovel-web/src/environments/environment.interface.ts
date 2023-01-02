import { ModeEnum } from "@myorg/game-data";

export interface IEnvironment {
  production: boolean;
  rootRout: string;
  mode: ModeEnum
}