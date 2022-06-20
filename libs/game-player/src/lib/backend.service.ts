import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Game } from '@myorg/game-data';
import { config } from './game-player.config';
import { GamePlayerModuleConfig } from './game-player.interfaces';

export const baseURL = './assets/data';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(
    @Inject(config) private gamePlayerModuleConfig: GamePlayerModuleConfig,
    private httpClient: HttpClient
  ) { }

  private get baseURL(): string {
    return this.gamePlayerModuleConfig.url
  }

  public getGameById(id: number): Observable<Game> {
    return this.httpClient.get<Game>(`${this.baseURL}/${id}/data.json`)
  }
}
