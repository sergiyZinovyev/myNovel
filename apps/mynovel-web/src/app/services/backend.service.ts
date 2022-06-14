import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Game } from '../interfaces/game-source.interface';
import { environment } from '@environment/environment';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private httpClient: HttpClient) { }

  private get baseURL(): string {
    return environment.rootRout;
  }

  public getGameById(id: number): Observable<Game> {
    return this.httpClient.get<Game>(`${this.baseURL}/${id}/data.json`)
  }
}
