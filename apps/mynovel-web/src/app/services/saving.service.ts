import { Injectable } from '@angular/core';
import { StatusEnum } from '@myorg/game-data';
import { BehaviorSubject, filter, map } from 'rxjs';
import { KeyDataEnum, StoreService } from './store-service/store.service';

export interface ISaving {
    id: number;
    name: string;
    savingId: number;
}

export class Saving implements ISaving{
    constructor(
        public id: number, 
        public name: string,
        public savingId: number
    ) {}
}

@Injectable({
    providedIn: 'root'
})
export class SavingService {

    private activeGameId: number = 0;

    private savedGames: ISaving[] = [];

    public isSavingFile$: BehaviorSubject<StatusEnum> = new BehaviorSubject<StatusEnum>(StatusEnum.Done);

    public initGameInProgress$: BehaviorSubject<boolean> = new BehaviorSubject(true);

    public savedGames$: BehaviorSubject<ISaving[]> = new BehaviorSubject([] as ISaving[]);
    
    constructor(private storeService: StoreService) {    
        this.storeService.storeData$.pipe(
            filter(data => !!data && data.key === KeyDataEnum.Savings),
            map((data) => data.data),
        ).subscribe((data: string) => {
            if(this.initGameInProgress$.value) {
                this.savedGames$.next(JSON.parse(data));
                this.savedGames = JSON.parse(data);
                this.initGameInProgress$.next(false);
            }
        })
        this.storeService.isSavingFile$.subscribe(d => this.isSavingFile$.next(d));
    }

    public initGame(gameId: number): void {
        this.initGameInProgress$.next(true);
        this.activeGameId = gameId
        this.savedGames = [];
        this.savedGames$.next(this.savedGames);
        this.storeService.get(`game${this.activeGameId}.save`);
    }

    public addSaving(id: number, gameId: number = this.activeGameId): void {
        if (this.isSavingFile$.value === StatusEnum.InProgress) return;
        const savedGames: ISaving[] = JSON.parse(JSON.stringify(this.savedGames));
        const savingId = savedGames?.map(item => item.savingId)?.length 
            ? Math.max( ...savedGames.map(item => item.savingId) ) + 1
            : 1;
        savedGames.unshift(new Saving(id, new Date().toLocaleString(), savingId));
        const newSavedGames = JSON.stringify(savedGames);
        this.storeService.set(`game${gameId}.save`, newSavedGames);
        this.savedGames = savedGames;
        this.savedGames$.next(savedGames);
    }

    public removeSaving(savingId: number, gameId: number = this.activeGameId): void {
        if (this.isSavingFile$.value === StatusEnum.InProgress) return;
        const savedGames: ISaving[] = JSON.parse(JSON.stringify(this.savedGames));
        const index = savedGames.findIndex(item => item.savingId === savingId);
        if (index === -1) return;
        savedGames.splice(index, 1);
        const newSavedGames = JSON.stringify(savedGames);
        this.storeService.set(`game${gameId}.save`, newSavedGames)
        this.savedGames = savedGames;
        this.savedGames$.next(savedGames);
    }
  
}
