import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-video-player',
  template: `
    <div>
      <h1>Video Streaming</h1>
      <progress [value]="progress" max="100"></progress>
      <video #videoElement controls>
        <source [src]="videoSrc" type="video/mp4">
        Your browser does not support the video tag.
      </video>
    </div>
  `,
  styles: []
})
export class VideoPlayerComponent implements OnInit {
  progress = 0;
  videoSrc: string | ArrayBuffer | null = null;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getVideo().subscribe({
      next: ({ data, progress }) => {
        this.progress = progress;
        if (data) {
          const blob = new Blob([data], { type: 'video/mp4' });
          this.videoSrc = URL.createObjectURL(blob);
        }
      },
      error: (err) => console.error('Video streaming error', err)
    });
  }
}
