import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GamesRoutingModule } from './games-routing.module';
import { GamesComponent } from './games.component';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav'; 
import { GameComponent } from './game/game.component';
import { GameMenuComponent } from './game/game-menu/game-menu.component';


@NgModule({
  declarations: [
    GamesComponent,
    GameComponent,
    GameMenuComponent
  ],
  imports: [
    CommonModule,
    GamesRoutingModule,
    MatButtonModule,
    MatSidenavModule
  ]
})
export class GamesModule { }
