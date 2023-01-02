import { 
  AfterViewInit, 
  Component, 
  ElementRef, 
  EventEmitter, 
  HostListener, 
  OnInit, 
  Output, 
  ViewChild 
} from '@angular/core';
import { ISaving, SavingService } from '@app/services/saving.service';
import { GameService } from '@myorg/game-player';

@Component({
  selector: 'myorg-savings',
  templateUrl: './savings.component.html',
  styleUrls: ['./savings.component.scss'],
})
export class SavingsComponent implements OnInit, AfterViewInit {

  public isVisibleCancel: { visible: boolean; id: number; } | undefined;

  public gameHeight!: number;

  @Output() public exit: EventEmitter<void> = new EventEmitter();

  @ViewChild('container')
  elementView!: ElementRef;

  constructor(
    public gameService: GameService,
    public storeService: SavingService
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    setTimeout(() => {
      this.setGameHeight(this.getWidth());
    }, 0);
  }

  @HostListener('window:resize', ['$event.target'])
  public onResize(): void {
    this.setGameHeight(this.getWidth());
  }

  private getNativeElement(): HTMLElement {
    return this.elementView.nativeElement;
  }

  private getWidth(): number {
    return this.getNativeElement().clientWidth;
  }

  private setGameHeight(width: number) {
    this.gameHeight = width * 0.22 / 1.45;
  }

  public loadGame(sourceId: number): void {
    this.gameService.nextSource(sourceId);
    this.exit.emit()
  }

  public toggleCancel(val: boolean, id: number): void {
    this.isVisibleCancel = {
      visible: val,
      id: id
    };
  }

  public removeSaving(id: number): void {
    this.storeService.removeSaving(id)
  }

  public trackSavingId (index: number, savingGame: ISaving) {
    return savingGame ? savingGame.savingId : undefined;
  }

}
