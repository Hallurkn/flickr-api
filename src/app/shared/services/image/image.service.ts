import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse
} from '@angular/common/http';

import { map, catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private API_KEY = '3742c6f8a1530492c986e06d9e350996';
  constructor(private http: HttpClient) { }

  getImages(tag: string, perPage: number = 24, page: number = 1): Observable<object> {
    const API_ENDPOINT = `https://api.flickr.com/services/rest/?method=flickr.photos.search`;
    const query = `&api_key=${this.API_KEY}&per_page=${perPage}&page=${page}&tags=${tag}&format=json&nojsoncallback=1`;

    return this.http
      .get(`${API_ENDPOINT}${query}`)
      .pipe(
        map((val: any) => {
          if (val.stat === 'ok') {
            return {
              total: parseInt(val.photos.total, 10),
              photos: val.photos.photo.map((photo: any) => {
                return {
                  url: `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_n.jpg`,
                  title: photo.title,
                };
              })
            };
          } else {
            return [];
          }
        }),
        catchError(this.handleError) // then handle the error
      );
  }

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('A client error occurred:', error);
      return throwError(error.error);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.message}`
      );
      return throwError(error);
    }
  }
}
