import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { BackendService } from '@myorg/game-player';
import { GameInfo } from '@myorg/game-data';

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
  ) {
    this.backendService.getAllGames().subscribe(data => { 
      //console.log('data: ', data);
      this.source$ = new BehaviorSubject(data)
    });
  }

  ngOnInit(): void {
  }

  public routing(route?: string): void {
    if (!route) return;
    this.router.navigate([`/${route}`]);
  }

}
