import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button'; 
import { MatIconModule } from '@angular/material/icon'; 
import { GamePlayerModule } from '@myorg/game-player';
import { APP_BASE_HREF, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { environment } from '@environment/environment';
import { StoreService } from './services/store-service/store.service';
import { ModeEnum } from '@myorg/game-data';
import { StoreServiceElectron } from './services/store-service/electron.store.service';
import { StoreServiceLocal } from './services/store-service/local.store.service';
@NgModule({
  declarations: [
    AppComponent,
    MainMenuComponent,
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
  ],
  providers: [
    { provide: APP_BASE_HREF, useValue: '/' },
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    { 
      provide: StoreService, 
      useClass: environment.mode === ModeEnum.Desktop ? StoreServiceElectron : StoreServiceLocal 
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
