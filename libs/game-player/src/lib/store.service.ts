import { Injectable } from '@angular/core';
import { Game, GameSource } from '@myorg/game-data';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { BackendService } from '@myorg/game-player';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  
  //private _game: Game | undefined;

  public game$!: BehaviorSubject<Game>;

  constructor(private backendService: BackendService) { }

  public setGameById(id: number): Observable<Game>{
    return this.backendService.getGameById(id).pipe(
      tap(game => this.game$ = new BehaviorSubject(game))
    )
  }

  public setGame(id: number): void{
    this.setGameById(id).subscribe()
  }

  public get gameName$(): Observable<string> {
    return this.game$.pipe(
      map(game => game.name),
    )
  }

  public get gameNameSync(): string {
    return this.game$.value.name
  }

  public get gameSources$(): Observable<GameSource[]> {
    return this.game$.pipe(
      map(game => game.gameSources),
    )
  }

  public get gameSourcesSync(): GameSource[] {
    return this.game$.value.gameSources
  }

  public get gameIdSync(): number {
    return this.game$.value.id
  }
  
}
