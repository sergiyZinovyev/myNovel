import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InitGameResolver } from '@app/resolvers/init-game.resolver';
import { GameComponent } from './game/game.component';
import { GamesComponent } from './games.component';

const routes: Routes = [
  { path: '', component: GamesComponent },
  { 
    path: ':id', 
    component: GameComponent,
    resolve: {
      InitGameResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GamesRoutingModule { }
