import { StatusEnum } from '@myorg/game-data';
import { BehaviorSubject } from 'rxjs';

export interface IStoreService {
    storeData$: BehaviorSubject<any>,
    isSavingFile$: BehaviorSubject<StatusEnum>,
    set: (key: string, data: string) => void,
    get: (key: string) => void
}