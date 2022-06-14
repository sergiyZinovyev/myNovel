import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GameConstructorRoutingModule } from './game-constructor-routing.module';
import { GameConstructorComponent } from './game-constructor.component';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    GameConstructorComponent
  ],
  imports: [
    CommonModule,
    GameConstructorRoutingModule,
    MatButtonModule,
  ]
})
export class GameConstructorModule { }
