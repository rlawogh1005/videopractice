import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ApiService } from './api.service';
import { AppComponent } from './app.component';
import { TimeComponent } from './time/time.component';
import { HttpClientModule } from '@angular/common/http';
import { VideoComponent } from './video/video.component';
import { VideoModule } from './video/video.module';
import { VideoPlayerComponent } from './videoplayer/videoplayer.component';

@NgModule({
  declarations: [
    AppComponent,
    TimeComponent,
    VideoComponent,
    VideoPlayerComponent
  ],
  imports: [
    BrowserModule,
    VideoModule,
    HttpClientModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent, VideoComponent]
})
export class AppModule { }
