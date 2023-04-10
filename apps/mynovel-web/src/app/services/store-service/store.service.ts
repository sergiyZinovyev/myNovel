import { Injectable } from '@angular/core';
import { StatusEnum } from '@myorg/game-data';
import { BehaviorSubject, Subject } from 'rxjs';
import { IStoreService } from './store.interface';

export enum KeyDataEnum {
    Savings = 'save',
    Settings = 'settings'
  }
export interface IStoreData {
    key: KeyDataEnum;
    data: string;
}

@Injectable({
    providedIn: 'root'
})
export class StoreService implements IStoreService {
    
    public storeData$!: Subject<IStoreData>;

    public isSavingFile$!: BehaviorSubject<StatusEnum>;

    public set(key: string, data: string): void {}

    public get(key: string): void {}
}