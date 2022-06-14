import { Component, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { environment } from '@environment/environment';
import { GameService } from '@app/services/game.service';

//export const baseURL = './assets/data';
//export const textSpeed = 50;

@Component({
  selector: 'app-main',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {

  constructor(
    public gameService: GameService,
    private sanitizer: DomSanitizer,
  ) {}

  ngOnInit(): void {
    this.gameService.textDrawer(this.gameService.source$.value?.gameDialog.discription.text)
  }

  public getBackground(background: string) : SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(`url("${environment.rootRout}/${this.gameService.gameIdSync}/${background}")`);
  }

  public getPerson(person: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(`${environment.rootRout}/${this.gameService.gameIdSync}/${person}`);
  }

}


