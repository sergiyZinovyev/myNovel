import { StatusEnum } from '@myorg/game-data';
import { BehaviorSubject, filter, first } from 'rxjs';
import { IStoreService } from './store.interface';

export class StoreServiceElectron implements IStoreService {

    public storeData$: BehaviorSubject<any> = new BehaviorSubject(null);

    public isSavingFile$: BehaviorSubject<StatusEnum> = new BehaviorSubject<StatusEnum>(StatusEnum.Done);
    
    constructor() {
        window.electron.subscribeForSavedGames((_: any, data: string) => {
            this.storeData$.next(data)
        })
        window.electron.subscribeForSaveDone((_: any, data: StatusEnum) => {
            this.isSavingFile$.next(data)
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
