import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { GamePlayerModuleConfig } from './game-player.interfaces';
import { config } from './game-player.config';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
  ],
})
export class GamePlayerModule {
  public static config(gamePlayerModuleConfig: GamePlayerModuleConfig): ModuleWithProviders<any> {
    return {
        ngModule: GamePlayerModule,
        providers: [{ provide: config, useValue: gamePlayerModuleConfig }]
    };
}
}
