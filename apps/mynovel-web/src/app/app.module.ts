import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//import { MainComponent } from './games/main/main.component';
import { MatButtonModule } from '@angular/material/button'; 
import { MatIconModule } from '@angular/material/icon'; 
//import { HttpClientModule } from '@angular/common/http';
//import { HttpClientJsonpModule } from '@angular/common/http';
import { GamePlayerModule } from '@myorg/game-player';
import { APP_BASE_HREF, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { environment } from '@environment/environment';
@NgModule({
  declarations: [
    AppComponent,
    MainMenuComponent,
    //MainComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    GamePlayerModule.config({
      url: environment.rootRout
    })
    //HttpClientModule,
    //HttpClientJsonpModule
  ],
  providers: [
    { provide: APP_BASE_HREF, useValue: '/' },
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
