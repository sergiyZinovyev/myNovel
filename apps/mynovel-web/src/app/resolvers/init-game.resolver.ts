import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Game } from '@app/interfaces/game-source.interface';
import { StoreService } from '@app/services/store.service';
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
