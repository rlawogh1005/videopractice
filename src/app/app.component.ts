import { Component, ViewChild } from '@angular/core';
import { ApiService } from './api.service';
import { lastValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('videoPlayer') videoPlayer: any;
  videoUrl: string | null = null;
  title = 'client';
  constructor(private apiService: ApiService){}
  async getData() {
    try {
      const blob = await lastValueFrom(this.apiService.getOneData());
    
      console.log(blob.type);
      // Create a URL for the blob and log it, or use it as needed (e.g., for an image src or download)
      const url = window.URL.createObjectURL(blob);
      console.log(url);

      // Example: Create a link and simulate a click to download the image
      const a = document.createElement('a');
      a.href = url;
      a.download = 'image.png';
      a.click();

      // Optionally, you can revoke the URL to free up resources
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('에러 ㅋ', error);
    }
  }

  // async getVideoData() {
  //   try {
  //     const blob = await lastValueFrom(this.apiService.getVideo()); // Blob 데이터를 가져옴
  //     this.videoUrl = window.URL.createObjectURL(blob); // Blob으로부터 URL 생성
  //   } catch (error) {
  //     console.error('비디오를 불러오는데 실패했습니다.', error);
  //   }
  // }
  // ngOnInit() {
  //   this.getVideoData(); // 컴포넌트가 초기화될 때 비디오 데이터를 로드
  // }
  // RequestVideo() {
  //   this.http.get()
  // }


  
}
