import { Injectable } from '@angular/core';
import { StatusEnum } from '@myorg/game-data';
import { BehaviorSubject } from 'rxjs';
import { IStoreService } from './store.interface';

@Injectable({
    providedIn: 'root'
})
export class StoreService implements IStoreService {
    
    public storeData$!: BehaviorSubject<any>;

    public isSavingFile$!: BehaviorSubject<StatusEnum>;

    public set(key: string, data: string): void {}

    public get(key: string): void {}
}