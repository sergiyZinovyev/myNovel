import { StatusEnum } from '@myorg/game-data';
import { BehaviorSubject } from 'rxjs';
import { IStoreService } from './store.interface';

export class StoreServiceLocal implements IStoreService {

    public storeData$: BehaviorSubject<any> = new BehaviorSubject(null);

    public isSavingFile$: BehaviorSubject<StatusEnum> = new BehaviorSubject<StatusEnum>(StatusEnum.Done);
    
    constructor() {}

    public set(key: string, data: string): void {
        localStorage.setItem(key, data);
        this.get(key);
    }

    public get(key: string): void {
        const data = localStorage.getItem(key) || '';
        this.storeData$.next(data);
    }

}