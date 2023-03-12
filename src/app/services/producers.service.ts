import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Packet } from './packets.service';

export interface Producer {
  id?: number;
  name: string;
  desc: string;
  country: string;
  packets?: Packet[];
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

  create(data: Producer): Observable<Producer> {
    return this.http.post<Producer>(this.apiURL + 'producers', data);
  }

  modify(id: number, data: Producer): Observable<Producer> {
    return this.http.put<Producer>(this.apiURL + 'producers/' + id, data);
  }

  get(id: number): Observable<Producer> {
    return this.http.get<Producer>(this.apiURL + 'producers/' + id);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(this.apiURL + 'producers/' + id);
  }
}
