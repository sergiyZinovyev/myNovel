import { Injectable } from '@angular/core';
import { GameSource, SourceLink } from '@app/interfaces/game-source.interface';
import { BehaviorSubject, Subscription, timer } from 'rxjs';
import { StoreService } from './store.service';

export const textSpeed: number = 70;
export const gameSpeed: number = 1000;

@Injectable({
  providedIn: 'root'
})
export class GameService {

  public source$: BehaviorSubject<GameSource | undefined> = new BehaviorSubject(this.getSourceById(1));

  public gameDialog$: BehaviorSubject<string> = new BehaviorSubject('');

  public isAuto: boolean = false;

  private gameAutoTimer: any;

  private prevSourceId: Array<number | undefined> = [];

  private timer$: Subscription | undefined;

  constructor(
    public storeService: StoreService,
  ) { }

  private getSourceById(id: number | undefined): GameSource | undefined {
    return this.storeService.gameSourcesSync.find(src => {return src.id === id})
  }

  public skipSourceToStart(): void {
    clearTimeout(this.gameAutoTimer);
    this.source$.next(this.getSourceById(1));
    this.prevSourceId = [];
    this.textDrawer(this.source$.value?.gameDialog.discription.text);
  }

  public nextSource(id: number | undefined, forced: boolean = false, pushPrev: boolean = true): void{
    clearTimeout(this.gameAutoTimer);
    if (!id) return;
    if(!forced && (!this.source$.value || this.source$.value.sourceLinks.length > 1)) return

    if (pushPrev) this.prevSourceId.push(this.source$.value?.id);
    this.source$.next(this.getSourceById(id));
    this.textDrawer(this.source$.value?.gameDialog.discription.text);
  }

  public textDrawer(text: string | undefined): void{
    if(this.gameDialog$?.value) this.gameDialog$.next('');
    if(this.timer$) this.timer$.unsubscribe();
    if (!text) return;
    let currentText = text.split('');
    this.timer$ = timer(0, textSpeed).subscribe((d) => {
      this.gameDialog$.next(this.gameDialog$.value + currentText.splice(0, 1)[0]);
      if(this.gameDialog$.value[this.gameDialog$.value.length-1] !== ' ') {
        this.playAudio().play();
      }
      if(text.length - 1 === d) {
        if(this.timer$) this.timer$.unsubscribe();
        if(this.isAuto) {
          this.gameAutoTimer = setTimeout(() => {
            this.nextSource(this.source$.value?.sourceLinks[0].src);
          }, gameSpeed);
        }
      }
    })
  }

  private playAudio(): HTMLAudioElement{
    const myAudio = new Audio;
    myAudio.muted = false;
    myAudio.volume = 0.02;
    myAudio.src = './assets/key-click2.wav';
    return myAudio
  }

  public skip(sourceLinks: SourceLink[], prevSourceId: number | undefined = this.source$.value?.id): void{
    if(sourceLinks?.length !== 1 ) return;
    if(this.prevSourceId[this.prevSourceId.length - 1] !== prevSourceId) this.prevSourceId.push(prevSourceId);
    
    let nextSource: GameSource | undefined = this.getSourceById(sourceLinks[0].src);
    if(!nextSource) return;
    let nextSourceLinks: SourceLink[] = nextSource.sourceLinks;
    if(nextSourceLinks?.length !== 1 ) {
      this.nextSource(nextSource.id, false, false);   
      return
    };
    this.skip(nextSourceLinks, nextSource.id);
  }

  public back(): void{
    if(!this.prevSourceId) return;
    this.nextSource(this.prevSourceId.pop(), true, false);
  }

  public tougleAutoMode(){
    this.isAuto = !this.isAuto
  }

  public get gameNameSync(): string {
    return this.storeService.gameNameSync
  }

  public get gameIdSync(): number {
    return this.storeService.gameIdSync
  }
}
