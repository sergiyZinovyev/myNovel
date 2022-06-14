import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from '@app/services/game.service';

@Component({
  selector: 'app-game-menu',
  templateUrl: './game-menu.component.html',
  styleUrls: ['./game-menu.component.scss']
})
export class GameMenuComponent implements OnInit {

  @Output() public close: EventEmitter<void> = new EventEmitter();

  constructor(
    public gameService: GameService,
    private router: Router,
  ) { }

  ngOnInit(): void {}

  private routing(route?: string): void {
    if (!route) return;
    this.router.navigate([`/${route}`]);
  }

  public exit(route?: string){
    this.gameService.skipSourceToStart();
    this.routing(route);
  }

  private closeMenu(): void {
    this.close.emit()
  }

  public newGame(): void {
    this.gameService.skipSourceToStart();
    this.closeMenu()
  }

  public backToGame(): void {
    this.closeMenu()
  }

}
