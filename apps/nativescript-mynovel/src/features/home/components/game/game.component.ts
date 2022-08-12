import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { environment } from '../../../../environments/environment';
import { GameService } from '@myorg/game-player';
import { RadSideDrawerComponent } from "nativescript-ui-sidedrawer/angular";
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import { Router } from '@angular/router';
import { Screen } from '@nativescript/core';

@Component({
  moduleId: module.id,
  selector: 'app-main',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit, AfterViewInit, OnDestroy {

  private drawer: RadSideDrawer;

  constructor(
    public gameService: GameService,
    private _changeDetectionRef: ChangeDetectorRef,
    private router: Router,
    private sanitizer: DomSanitizer,
  ) {
    this.gameService.setMobile();
    // console.log('screen widthDIPs: ', Screen.mainScreen.widthDIPs);
    // console.log('screen widthPixels: ', Screen.mainScreen.widthPixels);
    // console.log('screen heightDIPs: ', Screen.mainScreen.heightDIPs);
    // console.log('screen heightPixels: ', Screen.mainScreen.heightPixels);
  }

  @ViewChild(RadSideDrawerComponent, { static: false }) public drawerComponent: RadSideDrawerComponent;
    

  ngAfterViewInit() {
    this.drawer = this.drawerComponent.sideDrawer;
    this._changeDetectionRef.detectChanges();
  }

  ngOnInit(): void {
    console.log('GameComponent init');
    this.gameService.nextSource(1);
    this.gameService.source$.subscribe(data => console.log(data));
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


