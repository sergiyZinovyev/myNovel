import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainMenuComponent } from './main-menu/main-menu.component';

const routes: Routes = [
  { path: '', redirectTo: 'menu', pathMatch: 'full'},
  { path: 'menu', component: MainMenuComponent },
  { path: 'games', loadChildren: () => import('./games/games.module').then(m => m.GamesModule) },
  { path: 'constructor', loadChildren: () => import('./game-constructor/game-constructor.module').then(m => m.GameConstructorModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
