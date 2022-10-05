import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { environment } from '../../../../environments/environment';
import { GameService } from '@myorg/game-player';
import { RadSideDrawerComponent } from "nativescript-ui-sidedrawer/angular";
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import { Router } from '@angular/router';
import { Screen } from '@nativescript/core';
import { android as androidApp } from '@nativescript/core/application';
import { device } from '@nativescript/core/platform';
import * as application from "@nativescript/core/application";
import {ad} from '@nativescript/core/utils'

export const LANDSCAPE_DIALOG_HEIGHT_COEF = 0.27;
export const PORTRAIT_DIALOG_HEIGHT_COEF = 0.2;
export const LANDSCAPE_BOTTOM_MENU_HEIGHT_COEF = 0.04;
export const PORTRAIT_BOTTOM_MENU_HEIGHT_COEF = 0.02;
export const CHOICE_POS = 0.3;
export const SCALE_COEF = 1.4;

@Component({
  moduleId: module.id,
  selector: 'app-main',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit, AfterViewInit, OnDestroy {

  private drawer: RadSideDrawer;

  private isLandscape: boolean;

  private _screenWidth: number;
  private _screenHeight: number;
  private _scale: number;

  public get height() : number {
    return this._screenHeight
  }

  public get scale() : number {
    return this._scale
  }

  public get fontSize() : number {
    const coef = (this.isLandscape ? LANDSCAPE_BOTTOM_MENU_HEIGHT_COEF : PORTRAIT_BOTTOM_MENU_HEIGHT_COEF) / SCALE_COEF;
    return (this.height / this._scale) * coef;
  }

  public get screenHeight() : string {
    return this.height + 'px'
  }

  // dialog
  public get dialogHeight() : string {
    const coef = this.isLandscape ? LANDSCAPE_DIALOG_HEIGHT_COEF : PORTRAIT_DIALOG_HEIGHT_COEF;
    return this.height * coef + 'px';
  }
  public get dialogTopPos() : string {
    const coef = this.isLandscape ? LANDSCAPE_DIALOG_HEIGHT_COEF : PORTRAIT_DIALOG_HEIGHT_COEF;
    return this.height * (1 - coef) + 'px';
  }

  // Bottom Menu
  public get bottomMenuHeight() : string {
    const coef = this.isLandscape ? LANDSCAPE_BOTTOM_MENU_HEIGHT_COEF : PORTRAIT_BOTTOM_MENU_HEIGHT_COEF;
    return this.height * coef + 'px';
  }
  public get bottomMenuTopPos() : string {
    const coef = this.isLandscape ? LANDSCAPE_BOTTOM_MENU_HEIGHT_COEF : PORTRAIT_BOTTOM_MENU_HEIGHT_COEF;
    return this.height * (1 - coef) + 'px';
  }

  //Choice
  public get choiceTopPos() : string {
    return this.height * CHOICE_POS + 'px';
  }

  //Sidenav
  public get topPosBtnMainGroup() : string {
    return this.height * 0.08 + 'px';
  }
  public get topPosBtnGroup() : string {
    return this.height * 0.13 + 'px';
  }
  public get btnFontSize() {
    const fontSize = this.isLandscape 
      ? (this.height / this._scale) * PORTRAIT_BOTTOM_MENU_HEIGHT_COEF * 1.7
      : this.fontSize * 1.4;
    return this.isLandscape
      ? {
          'font-size': fontSize + 'px',
          height: fontSize * 2.3 * this.scale + 'px',
          margin: fontSize + 'px'
        }
      : {
          'font-size': fontSize + 'px',
          margin: fontSize * 1.4 + 'px'
        }
  }

  constructor(
    public gameService: GameService,
    private _changeDetectionRef: ChangeDetectorRef,
    private router: Router,
    private sanitizer: DomSanitizer,
  ) {
    this.gameService.setMobile();
    this.setAppView();
    application.on(application.orientationChangedEvent, this.onOrientationChanged, this);
  }

  @ViewChild(RadSideDrawerComponent, { static: false }) public drawerComponent: RadSideDrawerComponent;
    

  ngAfterViewInit() {
    this.drawer = this.drawerComponent.sideDrawer;
    this._changeDetectionRef.detectChanges();
  }

  ngOnInit(): void {
    console.log('GameComponent init');
    this.goFullscreen();
    this.gameService.nextSource(1);
    this.gameService.source$.subscribe(data => console.log(data));
  }

  private getNotchHeight(): number{
    let notchHeight: number = 0;
    const notch = ad.getApplicationContext().getResources().getIdentifier("status_bar_height", "dimen", "android");
    if (notch > 0) {
      notchHeight = ad.getApplicationContext().getResources().getDimensionPixelSize(notch);
    }
    return notchHeight
  }

  
  public get notchHeight() : number {
    return this.isLandscape ? 0 : this.getNotchHeight();
  }
  

  private onOrientationChanged = (args: application.OrientationChangedEventData) => {
    setTimeout(() => {
        this.setAppView();
    }, 17 /* one frame @ 60 frames/s, no flicker */);
  };

  private setAppView() {
    this.isLandscape = Screen.mainScreen.heightPixels > Screen.mainScreen.widthPixels ? false : true;
    this._screenHeight = Screen.mainScreen.heightPixels - this.notchHeight;
    this._screenWidth = Screen.mainScreen.widthPixels;
    this._scale = Screen.mainScreen.scale;
  }

  private goFullscreen() {
    if (androidApp && device.sdkVersion >= '21') {
      const View = android.view.View;
      const window = androidApp.startActivity.getWindow();
      const decorView = window.getDecorView();
      decorView.setSystemUiVisibility(
        View.SYSTEM_UI_FLAG_HIDE_NAVIGATION |
          View.SYSTEM_UI_FLAG_FULLSCREEN |
          View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY
      );
    }
  }

  public openDrawer() {
    this.drawer.showDrawer();
  }

  public onCloseDrawerTap() {
    this.drawer.closeDrawer();
  }

  public getBackground(background: string): string {
    const url = `url("${environment.rootRout}/${this.gameService.gameIdSync}/${background}")`;
    return url;
  }

  public getPerson(person: string): string {
    const src = `${environment.rootRout}/${this.gameService.gameIdSync}/${person}`;
    return src;
  }

  public exit(){
    this.gameService.skipSourceToStart(false);
    this.router.navigate([`/home`]);
  }

  public newGame(): void {
    this.gameService.skipSourceToStart();
    this.onCloseDrawerTap()
  }

  ngOnDestroy(): void {
    this.gameService.textDrawer('');
  }

}


