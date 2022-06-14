import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game-constructor',
  templateUrl: './game-constructor.component.html',
  styleUrls: ['./game-constructor.component.scss']
})
export class GameConstructorComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  public routing(route?: string): void {
    if (!route) return;
    this.router.navigate([`/${route}`]);
  }

}
