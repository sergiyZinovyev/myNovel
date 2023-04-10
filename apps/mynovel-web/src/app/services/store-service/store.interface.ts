import { StatusEnum } from '@myorg/game-data';
import { BehaviorSubject, Subject } from 'rxjs';

export interface IStoreService {
    storeData$: Subject<any>,
    isSavingFile$: BehaviorSubject<StatusEnum>,
    set: (key: string, data: string) => void,
    get: (key: string) => void
}