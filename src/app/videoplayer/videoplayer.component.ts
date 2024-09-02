import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from '../api.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-video-player',
  template: `
    <div *ngIf="isLoading">Loading: {{ progress }}%</div>
    <video *ngIf="videoUrl" controls>
      <source [src]="videoUrl" type="video/mp4">
      Your browser does not support the video tag.
    </video>
    <div *ngIf="error">{{ error }}</div>
  `
})
export class VideoPlayerComponent implements OnInit, OnDestroy {
  videoUrl: string | null = null;
  isLoading = false;
  progress = 0;
  error: string | null = null;
  private videoSubscription: Subscription | null = null;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.getVideoData();
  }

  ngOnDestroy() {
    this.cleanUp();
  }

  getVideoData() {
    this.isLoading = true;
    this.error = null;
    let chunks: Uint8Array[] = [];

    this.videoSubscription = this.apiService.getVideo().subscribe({
      next: ({ data, progress }) => {
        this.progress = progress;
        if (data.length > 0) {
          chunks.push(data);
        }
        if (progress === 100) {
          const blob = new Blob(chunks, { type: 'video/mp4' });
          this.videoUrl = URL.createObjectURL(blob);
          this.isLoading = false;
          chunks = []; // 메모리 해제
        }
      },
      error: (err) => {
        console.error('비디오를 불러오는데 실패했습니다.', err);
        this.error = '비디오를 불러오는데 실패했습니다. 나중에 다시 시도해 주세요.';
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  private cleanUp() {
    if (this.videoSubscription) {
      this.videoSubscription.unsubscribe();
    }
    if (this.videoUrl) {
      URL.revokeObjectURL(this.videoUrl);
    }
  }
}