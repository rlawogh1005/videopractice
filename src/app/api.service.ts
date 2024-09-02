import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpEventType } from '@angular/common/http';
import { map, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private videoUrl = 'http://localhost:3002/courses/WEB-CLASS/docNames/Front-end-1st/courseDocs/download/e5923fa7-e4b7-4832-907b-e84aeca1fc5d-videoplayback.mp4'; 
  private url = 'http://localhost:3002';

  constructor(private http: HttpClient) { }
  getData(): Observable<any> {
    return this.http.get(`${this.url}/courses`);
  }
  getOneData(): Observable<any> {
    return this.http.get(`${this.url}/courses/WEB-CLASS/docNames/Front-end-1st/courseDocs/download/ccb09a40-321b-4429-bde4-e3244a2d4f7d-testing.png`,
      {responseType: 'blob'})
  }
  // getVideo(): Observable<Blob> {
  //   return this.http.get(this.videoUrl, { responseType: 'blob' });
  // }
  getVideo(): Observable<{ data: Uint8Array, progress: number }> {
    return this.http.get(this.videoUrl, {
      responseType: 'arraybuffer',
      reportProgress: true,
      observe: 'events'
    }).pipe(
      map((event: HttpEvent<any>) => {
        switch (event.type) {
          case HttpEventType.DownloadProgress:
            const progress = Math.round(100 * event.loaded / (event.total || 0));
            return { data: new Uint8Array(0), progress };
          case HttpEventType.Response:
            return { 
              data: new Uint8Array(event.body), 
              progress: 100 
            };
          default:
            return { data: new Uint8Array(0), progress: 0 };
        }
      })
    );
  }

  
  // getVideo(): Observable<any> {
  //   return this.http.get()
  // }
}
