import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Game } from '@myorg/game-data';
import { StoreService } from '@myorg/game-player';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InitGameResolver implements Resolve<Game> {

  constructor(private storeService: StoreService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Game> {
    return this.storeService.setGameById(Number(route.paramMap.get('id')));
  }
}
