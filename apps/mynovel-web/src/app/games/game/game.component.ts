import { Component, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { SavingService } from '@app/services/saving.service';
import { environment } from '@environment/environment';
import { GameService } from '@myorg/game-player';

export enum GameLayoutEnum {
  GameArea,
  Saving,
  Setting
}
@Component({
  selector: 'app-main',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit, OnDestroy {

  public gameLayoutEnum = GameLayoutEnum;

  public activeLayout: GameLayoutEnum = this.gameLayoutEnum.GameArea;

  //private gameId: number;

  constructor(
    private route: ActivatedRoute,
    public gameService: GameService,
    private sanitizer: DomSanitizer,
    public storeService: SavingService
  ) {
    //this.gameId = Number(this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    this.storeService.initGame(Number(this.route.snapshot.paramMap.get('id')));
    this.gameService.nextSource(1)
  }

  public switchLayout(layout: GameLayoutEnum): void {
    this.activeLayout = layout;
  }

  public getBackground(background: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(`url("${environment.rootRout}/${this.gameService.gameIdSync}/${background}")`);
  }

  // public getPerson(person: string): SafeResourceUrl {
  //   return this.sanitizer.bypassSecurityTrustResourceUrl(`${environment.rootRout}/${this.gameService.gameIdSync}/${person}`);
  // }

  public save(savingId: number): void {
    this.storeService.addSaving(savingId)
  }

  ngOnDestroy(): void {
    this.gameService.textDrawer('');
  }

}


