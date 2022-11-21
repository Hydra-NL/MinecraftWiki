import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RndUser } from './user.model';
import { environment } from 'src/environments/environment';
import { map, Observable, tap } from 'rxjs';
import { ApiResponse } from './api.model';

@Injectable({
  providedIn: 'root',
})
export class RandomUserService {
  BASE_URL = environment.apiUrl;
  constructor(protected http: HttpClient) {}

  getRandomUsers(): Observable<RndUser[]> {
    const url = this.BASE_URL + '?results=10';
    return this.http
      .get<ApiResponse<RndUser[]>>(url)
      .pipe(map((response: ApiResponse<RndUser[]>) => response.results));
  }
}
