import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { BackendService } from '@myorg/game-player';
import { GameInfo } from '@myorg/game-data';
import { SettingsService } from '@app/services/settings.service';

export const baseURL = './assets/data'

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit {
  public source$!: BehaviorSubject<GameInfo[]>;

  constructor(
    private router: Router,
    private backendService: BackendService,
    private settingsService: SettingsService,
    private ngZone: NgZone
  ) {
    this.backendService.getAllGames().subscribe(data => { 
      this.source$ = new BehaviorSubject(data)
    });
  }

  ngOnInit(): void {
  }

  public routing(route?: string, id?: number): void {
    if (!route) return;
    console.log('route: ', route);
    if(id) {
      this.settingsService.initGame(id).subscribe((data) => {
        console.log('settingsService data: ', data);
        this.ngZone.run(() => {
          this.router.navigate([`/${route}`]);
        });
        
      });
    } else this.router.navigate([`/${route}`]);
  }

}
