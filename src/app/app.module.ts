import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ApiService } from './api.service';
import { AppComponent } from './app.component';
import { TimeComponent } from './time/time.component';
import { HttpClientModule } from '@angular/common/http';
import { VideoPlayerComponent } from './videoplayer/videoplayer.component';

@NgModule({
  declarations: [
    AppComponent,
    TimeComponent,
    VideoPlayerComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
