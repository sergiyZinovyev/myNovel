import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GameInfo } from '@myorg/game-data';
import { BackendService } from '@myorg/game-player';
import { BehaviorSubject } from 'rxjs';
import { setStatusBarColor } from '../../../utils';
@Component({
  moduleId: module.id,
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  public source$!: BehaviorSubject<GameInfo[]>;

  constructor(
    private router: Router,
    private backendService: BackendService,
  ) {
    this.backendService.getAllGames().subscribe(data => { 
      this.source$ = new BehaviorSubject(data)
    });
  }

  ngOnInit() {
    setStatusBarColor('dark', '#143055');
  }

  onTap(sourceId) {
    //const button = args.object as Button
    console.log('navigate to game: ', sourceId);
    this.router.navigate([`/home/${sourceId}`]);
    
    // execute your custom logic here...
  }
}
