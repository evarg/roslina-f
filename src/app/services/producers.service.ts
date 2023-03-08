import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Producer {
  id?: number;
  name: string;
  desc: string;
  country: string;
  created_at?: string;
  updated_at?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ProducersService {
  apiURL: string = 'http://roslina-b.poligon/api/';

  constructor(private http: HttpClient) {}

  list(): Observable<Producer[]> {
    return this.http.get<Producer[]>(this.apiURL + 'producers');
  }

  create(data: any): Observable<any> {
    return this.http.post(this.apiURL + 'producers', data);
  }

  modify(id: number, data: any): Observable<any> {
    return this.http.put(this.apiURL + 'producers/' + id, data);
  }

  get(id: number): Observable<any> {
    return this.http.get(this.apiURL + 'producers/' + id);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(this.apiURL + 'producers/' + id);
  }
}
