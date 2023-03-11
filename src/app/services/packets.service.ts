import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producer } from './producers.service';

export interface Packet {
  id?: number;
  name: string;
  desc: string;
  name_polish: string;
  name_latin: string;
  producer_id: number;
  producer?: Producer;
  expiration_date: string;
  purchase_date: string;
  created_at?: string;
  updated_at?: string;
}

@Injectable({
  providedIn: 'root',
})
export class PacketsService {
  apiURL: string = 'http://roslina-b.poligon/api/';

  constructor(private http: HttpClient) {}

  list(): Observable<Packet[]> {
    return this.http.get<Packet[]>(this.apiURL + 'packets');
  }

  create(data: Packet): Observable<Packet> {
    return this.http.post<Packet>(this.apiURL + 'packets', data);
  }

  modify(id: number, data: Packet): Observable<Packet> {
    return this.http.put<Packet>(this.apiURL + 'packets/' + id, data);
  }

  get(id: number): Observable<Packet> {
    return this.http.get<Packet>(this.apiURL + 'packets/' + id);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(this.apiURL + 'packets/' + id);
  }
}
