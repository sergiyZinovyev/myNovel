import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AudioPlayerService {

    private audio: HTMLAudioElement = new Audio();
    private tracks: string[] = [];
    private currentIndex: number = 0;
    private isPlaying: boolean = false;

    public currentTrack: string = '';

    constructor() {
        this.audio.addEventListener('ended', () => this.playNext());
    }

    public play(): void {
        this.audio.play();
        this.isPlaying = true;
    }

    public pause(): void {
        this.audio.pause();
        this.isPlaying = false;
    }

    public stop(): void {
        this.currentTrack = '';
        this.pause();
        this.audio.currentTime = 0;
        this.currentIndex = 0;
        this.tracks = [];
    }

    public addTrack(trackUrl: string): void {
        if (this.currentTrack) {   
            this.fadeOutAndPlayNewTrack(trackUrl);
        } else {
            this.playNewTrack(trackUrl);
        }
        this.currentTrack = trackUrl;
    }

    private playNewTrack(trackUrl: string): void {
        this.tracks.push(trackUrl);
        this.audio.src = trackUrl;
        this.play();
    }

    private fadeOutAndPlayNewTrack(trackUrl: string): void {
        this.fadeOut().then(vol => {
            this.playNewTrack(trackUrl);
            this.audio.volume = vol;
        })
    }

    private fadeOut(): Promise<number> {
        return new Promise<number>((resolve, reject) => {
            const prevVolume = this.audio.volume;
            const fadeOutInterval = setInterval(() => {
                const volume = this.audio.volume - 0.01;
                if (volume > 0) {
                    this.audio.volume = volume;
                } else {
                    clearInterval(fadeOutInterval);
                    resolve(prevVolume)
                }
            }, 10);
        })
    }

    public removeCurrentTrack(): void {
        this.tracks.splice(this.currentIndex, 1);
    }

    public setVolume(volume: number): void {
        this.audio.volume = volume;
    }

    private playNext(): void {
        if (this.currentIndex === this.tracks.length - 1) {
            this.currentIndex = 0;
        } else {
            this.currentIndex++;
        }
        this.audio.src = this.tracks[this.currentIndex];
        this.play();
    }

}
