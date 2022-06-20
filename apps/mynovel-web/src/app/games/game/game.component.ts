import { Component, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { environment } from '@environment/environment';
import { GameService } from '@myorg/game-player';

@Component({
  selector: 'app-main',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit, OnDestroy {

  constructor(
    public gameService: GameService,
    private sanitizer: DomSanitizer,
  ) {}

  ngOnInit(): void {
    this.gameService.nextSource(1)
  }

  public getBackground(background: string) : SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(`url("${environment.rootRout}/${this.gameService.gameIdSync}/${background}")`);
  }

  public getPerson(person: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(`${environment.rootRout}/${this.gameService.gameIdSync}/${person}`);
  }

  ngOnDestroy(): void {
    this.gameService.textDrawer('');
  }

}


