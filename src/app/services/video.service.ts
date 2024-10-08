import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpEventType } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, scan } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private videoUrl = 'http://localhost:3002/courses/웹개발반/프론트엔드 2/video/stream';
  private url = 'http://localhost:3002';

  constructor(private http: HttpClient) { }

  // courses 연결
  getData(): Observable<any> {
    return this.http.get(`${this.url}/courses`);
  }

  getOneData(): Observable<Blob> {
    return this.http.get(`${this.url}`, { responseType: 'blob' });
  }

  getVideo(): Observable<{ data: Uint8Array, progress: number }> {
    return this.http.get(this.videoUrl, {
      responseType: 'arraybuffer',
      reportProgress: true,
      observe: 'events'
    }).pipe(
      scan((acc: { data: Uint8Array, progress: number }, event: HttpEvent<any>) => {
        if (event.type === HttpEventType.DownloadProgress) {
          const progress = event.total ? Math.round(100 * event.loaded / event.total) : 0;
          return { ...acc, progress };
        }
        if (event.type === HttpEventType.Response) {
          const newData = new Uint8Array(event.body as ArrayBuffer);
          const combinedData = new Uint8Array(acc.data.length + newData.length);
          combinedData.set(acc.data);
          combinedData.set(newData, acc.data.length);
          return { data: combinedData, progress: 100 };
        }
        return acc;
      }, { data: new Uint8Array(), progress: 0 }),
      map(result => ({
        data: result.data,
        progress: result.progress
      }))
    );
  }
}
