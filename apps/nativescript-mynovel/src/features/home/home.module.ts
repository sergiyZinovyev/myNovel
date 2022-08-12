import {
  NgModule,
  NO_ERRORS_SCHEMA,
  CUSTOM_ELEMENTS_SCHEMA
} from '@angular/core';
import { Routes } from '@angular/router';
import { NativeScriptRouterModule } from '@nativescript/angular';
import { NativeScriptUISideDrawerModule } from 'nativescript-ui-sidedrawer/angular';
import { InitGameResolver } from '../../resolvers/init-game.resolver';

import { SharedModule } from '../shared/shared.module';
import { HOME_COMPONENTS, HomeComponent, GameComponent } from './components';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  // {
  //   path: 'game',
  //   component: GameComponent
  // }
  { 
    path: ':id', 
    component: GameComponent,
    resolve: {
      InitGameResolver,
    },
  },
];

@NgModule({
  imports: [
    SharedModule, 
    NativeScriptRouterModule.forChild(routes),
    NativeScriptUISideDrawerModule
  ],
  declarations: [...HOME_COMPONENTS],
  exports: [...HOME_COMPONENTS],
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
})
export class HomeModule {}
