import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSliderChange } from '@angular/material/slider';
import { SettingsService } from '@app/services/settings.service';

@Component({
  selector: 'myorg-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit, OnDestroy {

  public thumbLabel = true;

  public textSpeed: number | null = this.getSliderValue(this.settingsService.textSpeed, 300);
  public gameSpeed: number | null = this.getSliderValue(this.settingsService.gameSpeed, 10000);
  public sound: number | null = this.getSliderValue(this.settingsService.sound, 0.1, false);
  public music: number | null = this.getSliderValue(this.settingsService.music, 1, false);

  constructor(
    private settingsService: SettingsService,
  ) {}

  ngOnInit(): void {}

  public sliderChange(v:  MatSliderChange) {
    let id = v.source._elementRef.nativeElement.id
    if(id === 'textSpeed') {
      this.textSpeed = v.value;
      this.settingsService.textSpeed = Math.round(this.getSettingValue(v.value, 300));
    }
    if(id === 'gameSpeed') {
      this.gameSpeed = v.value;
      this.settingsService.gameSpeed = Math.round(this.getSettingValue(v.value, 10000));
    }
    if(id === 'sound') {
      this.sound = v.value;
      this.settingsService.sound = Number(this.getSettingValue(v.value, 0.1, false).toFixed(3));
    }
    if(id === 'music') {
      this.music = v.value;
      this.settingsService.music = Number(this.getSettingValue(v.value, 1, false).toFixed(3));
    }
  }

  public getSettingValue(v: number | null, max: number, invert: boolean = true): number {
    let res: number;
    if (!v) {
      res = 0;
    } else {
      let invRes = max - (max * v / 100) ? max - (max * v / 100) : 1;
      let uninvRes = max * v / 100;
      res = invert ? invRes : uninvRes;
    }
    return res
  }

  public getSliderValue(v: number | null, max: number, invert: boolean = true): number {
    let res: number;
    if (!v) {
      res = 0;
    } else {
      let invRes = 100 - v / max * 100;
      let uninvRes = v / max * 100;
      res = invert ? invRes : uninvRes;
    }
    return Math.round(res)
  }

  ngOnDestroy(): void {
    this.settingsService.saveSettings();
  }
}
