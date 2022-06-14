import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameConstructorComponent } from './game-constructor.component';

const routes: Routes = [{ path: '', component: GameConstructorComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GameConstructorRoutingModule { }
