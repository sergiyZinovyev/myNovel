import { Injectable } from '@angular/core';
import { GameService } from 'libs/game-player/src/lib/game.service';
import { filter, map, Observable, take, tap } from 'rxjs';
import { AudioPlayerService } from './audio-player.service';
import { KeyDataEnum, StoreService } from './store-service/store.service';

export const TEXT_SPEED: number = 70;
export const GAME_SPEED: number = 1000;
export const SOUND: number = 0.02;
export const MUSIC: number = 1;

@Injectable({
    providedIn: 'root'
})
export class SettingsService {

    private activeGameId: number = 0;

    private _textSpeed: number | null = TEXT_SPEED;
    private _gameSpeed: number | null = GAME_SPEED;
    private _sound: number = SOUND;
    private _music: number = MUSIC;
    
    constructor(
        private storeService: StoreService,
        private gameService: GameService,
        private audioPlayerService: AudioPlayerService
    ) {}

    public initGame(gameId: number): Observable<string> {
        this.activeGameId = gameId
        this.storeService.get(`game${this.activeGameId}.settings`);
        
        return this.storeService.storeData$.pipe(
            filter(data => !!data && data.key === KeyDataEnum.Settings),
            map((data) => data.data),
            tap(data => {
                const settings = JSON.parse(data);
                this.textSpeed = settings.textSpeed;
                this.gameSpeed = settings.gameSpeed;
                this.sound = settings.sound;
                this.music = settings.music;
            }),
            take(1)
        )
    }

    public get textSpeed(): number | null {
        return this._textSpeed
    }
    public set textSpeed(v: number | null) {
        if(v === undefined) return;
        this._textSpeed = v;
        this.gameService.textSpeed = v;
    }

    public get gameSpeed(): number | null {
        return this._gameSpeed
    }
    public set gameSpeed(v: number | null) {
        if(v === undefined) return;
        this._gameSpeed = v;
        this.gameService.gameSpeed = v;
    }

    public get sound(): number {
        return this._sound
    }
    public set sound(v: number) {
        if(v === undefined) return;
        this._sound = v;
        this.gameService.sound = v;
    }

    public get music(): number {
        return this._music
    }
    public set music(v: number) {
        if(v === undefined) return;
        this._music = v;
        this.audioPlayerService.setVolume(v)
    }

    public saveSettings(): void {
        let data = {
          textSpeed: this.textSpeed,
          gameSpeed: this.gameSpeed,
          sound: this.sound,
          music: this.music
        };
        const newSavedGames = JSON.stringify(data);
        this.storeService.set(`game${this.activeGameId}.settings`, newSavedGames);
    }
    
    
}
