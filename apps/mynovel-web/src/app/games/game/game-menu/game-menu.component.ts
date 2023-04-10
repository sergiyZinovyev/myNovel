import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AudioPlayerService } from '@app/services/audio-player.service';
import { GameService } from '@myorg/game-player';
import { GameLayoutEnum } from '../game.component';

@Component({
  selector: 'app-game-menu',
  templateUrl: './game-menu.component.html',
  styleUrls: ['./game-menu.component.scss']
})
export class GameMenuComponent implements OnInit {

  public gameLayoutEnum = GameLayoutEnum;

  @Output() public close: EventEmitter<void> = new EventEmitter();

  @Output() public newLayout: EventEmitter<GameLayoutEnum> = new EventEmitter();

  @Output() public save$: EventEmitter<void> = new EventEmitter();

  constructor(
    public gameService: GameService,
    private router: Router,
    private audioPlayerService: AudioPlayerService
  ) { }

  ngOnInit(): void {}

  private routing(route?: string): void {
    if (!route) return;
    this.router.navigate([`/${route}`]);
  }

  public exit(route?: string){
    this.gameService.skipSourceToStart(false);
    this.audioPlayerService.stop();
    this.routing(route);
  }

  private closeMenu(): void {
    this.close.emit()
  }

  public chageLayout(layout: GameLayoutEnum): void {
    this.newLayout.emit(layout);
    this.closeMenu()
  }

  public newGame(): void {
    this.gameService.skipSourceToStart();
    this.closeMenu()
  }

  public save(): void {
    this.save$.emit()
  }

}
