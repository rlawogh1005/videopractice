import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ApiService } from './services/video.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('videoPlayer') videoPlayer!: ElementRef<HTMLVideoElement>;
  videoUrl: string | null = null;
  progress: number = 0; // 진행 상황을 추적하기 위한 프로퍼티
  title = 'client';

  constructor(
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.getVideoData(); // 컴포넌트가 초기화될 때 비디오 데이터를 로드
  }
  getData() {
    // 데이터 호출 로직
    console.log("데이터를 불러옵니다.");
  }
  getVideoData() {
    this.apiService.getVideo().subscribe({
      next: ({ data, progress }) => {
        this.progress = progress;
        if (data && data.length > 0) {
          const blob = new Blob([data], { type: 'video/mp4' });
          this.videoUrl = URL.createObjectURL(blob);
          if (this.videoPlayer && this.videoPlayer.nativeElement) {
            this.videoPlayer.nativeElement.src = this.videoUrl;
          }
        }
      },
      error: (error) => console.error('비디오를 불러오는데 실패했습니다.', error),
      complete: () => console.log('비디오 로딩 완료')
    });
  }
}
