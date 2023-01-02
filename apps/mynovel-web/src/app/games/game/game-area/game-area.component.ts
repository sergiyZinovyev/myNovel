import { AfterViewInit, Component, ElementRef, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { environment } from '@environment/environment';
import { GameSource } from '@myorg/game-data';
import { GameService } from '@myorg/game-player';

@Component({
  selector: 'myorg-game-area',
  templateUrl: './game-area.component.html',
  styleUrls: ['./game-area.component.scss'],
})

export class GameAreaComponent implements OnInit, AfterViewInit, OnDestroy {

  public isSetFontSize: boolean = false;

  @Input()
  public source!: GameSource | undefined;

  @Input()
  public disabled: Boolean = false;

  @Output() 
  public drawerToggle: EventEmitter<void> = new EventEmitter();

  @ViewChild('container')
  elementView!: ElementRef;

  constructor(
    public gameService: GameService,
    private sanitizer: DomSanitizer,
  ) {}

  ngOnInit(): void {
    //this.gameService.nextSource(1) 
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.setFontSize(this.getWidth())
    }, 0);
  }

  @HostListener('window:resize', ['$event.target'])
  public onResize(): void {
    this.setFontSize(this.getWidth());
  }

  setFontSize(value: number): void {
    let size = value / 100;
    this.getNativeElement().style.fontSize = `${size}px`;
    this.isSetFontSize = true;
  }

  public getBackground(background: string) : SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(`url("${environment.rootRout}/${this.gameService.gameIdSync}/${background}")`);
  }

  public getPerson(person: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(`${environment.rootRout}/${this.gameService.gameIdSync}/${person}`);
  }

  public toggleMenu(): void {
    this.drawerToggle.emit()
  }

  /**
   * get width of native element
   */
  private getWidth(): number {
    return this.getNativeElement().clientWidth;
  }
  /**
   * get height of native element
   */
  private getHeight() {
    return this.getNativeElement().clientHeight;
  }
  /**
   * get native element
   */
  private getNativeElement(): HTMLElement {
    return this.elementView.nativeElement;
  }

  ngOnDestroy(): void {
    //this.gameService.textDrawer('');
  }
}
