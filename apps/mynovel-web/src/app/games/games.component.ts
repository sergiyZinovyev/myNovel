import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

export const baseURL = './assets/data'

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit {
  public source$!: BehaviorSubject<any>;

  constructor(
    private router: Router,
    private http: HttpClient,
  ) {
    this.http.get<any>(`${baseURL}/sources.json`).subscribe(data => { 
      console.log('data: ', data);
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
