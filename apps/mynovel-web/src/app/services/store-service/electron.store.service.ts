import { StatusEnum } from '@myorg/game-data';
import { BehaviorSubject, filter, first, Subject } from 'rxjs';
import { IStoreService } from './store.interface';
import { IStoreData, KeyDataEnum } from './store.service';

export class StoreServiceElectron implements IStoreService {

    public storeData$: Subject<IStoreData | null> = new Subject<IStoreData | null>;

    public isSavingFile$: BehaviorSubject<StatusEnum> = new BehaviorSubject<StatusEnum>(StatusEnum.Done);
    
    constructor() {
        window.electron.subscribeForSavedGames((_: any, data: string) => {
            this.storeData$.next({key: KeyDataEnum.Savings, data: data})
        })
        window.electron.subscribeForSaveDone((_: any, data: StatusEnum) => {
            this.isSavingFile$.next(data)
        })
        window.electron.subscribeForSettings((_: any, data: string) => {
            this.storeData$.next({key: KeyDataEnum.Settings, data: data});
        })
    }

    public set(key: string, data: string): void {
        this.isSavingFile$.next(StatusEnum.InProgress)
        window.electron.saveEntry(key, data);
        this.isSavingFile$.pipe(
            filter(d => d === StatusEnum.Done),
            first()
        ).subscribe(() => this.get(key));
    }

    public get(key: string): void {
        window.electron.loadEntry(key);
    }
}
