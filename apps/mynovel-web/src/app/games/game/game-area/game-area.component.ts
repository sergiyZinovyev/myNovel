import { AfterViewInit, Component, ElementRef, EventEmitter, HostListener, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AudioPlayerService } from '@app/services/audio-player.service';
import { environment } from '@environment/environment';
import { GameSource } from '@myorg/game-data';
import { GameService } from '@myorg/game-player';

@Component({
  selector: 'myorg-game-area',
  templateUrl: './game-area.component.html',
  styleUrls: ['./game-area.component.scss'],
})

export class GameAreaComponent implements OnInit, AfterViewInit, OnDestroy, OnChanges {

  public isSetFontSize: boolean = false;
  public isDrawerText: boolean = false;

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
    private audioPlayerService: AudioPlayerService
  ) {
    this.isDrawerText = !!this.gameService.textSpeed;
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.disabled) return;
    const currentTrack = this.getLastSegment(this.audioPlayerService.currentTrack);
    const curSound = changes['source']?.currentValue?.sound;
    if((curSound || currentTrack) && (curSound !== currentTrack)) {  
      this.playSound(curSound)
    }
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

  public playSound(src: string) {
    this.audioPlayerService.removeCurrentTrack();
    if(!src) {
      this.audioPlayerService.stop();
      return
    }
    const soundSrc = `${environment.rootRout}/${this.gameService.gameIdSync}/${src}`;
    this.audioPlayerService.addTrack(soundSrc);
  }

  private getLastSegment(path: string): string {
    return path.substring(path.lastIndexOf('/') + 1);
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
