import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GamesRoutingModule } from './games-routing.module';
import { GamesComponent } from './games.component';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon'; 
import { GameComponent } from './game/game.component';
import { GameMenuComponent } from './game/game-menu/game-menu.component';
import { GameAreaComponent } from './game/game-area/game-area.component';
import { SavingsComponent } from './game/savings/savings.component';
import { SettingsComponent } from './game/settings/settings.component';
@NgModule({
  declarations: [
    GamesComponent,
    GameComponent,
    GameMenuComponent,
    GameAreaComponent,
    SavingsComponent,
    SettingsComponent,
  ],
  imports: [
    CommonModule,
    GamesRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
  ],
})
export class GamesModule {}
