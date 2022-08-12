import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CoreModule } from './core/core.module';
import { SharedModule } from './features/shared/shared.module';
import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { GamePlayerModule } from '@myorg/game-player';
import { environment } from './environments/environment';

@NgModule({
  declarations: [AppComponent],
  imports: [
    CoreModule, 
    SharedModule, 
    AppRoutingModule,
    GamePlayerModule.config({
      url: environment.rootRout
    })
  ],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule {}
