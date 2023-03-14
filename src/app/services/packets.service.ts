import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from './config.service';
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

  constructor(private http: HttpClient, private config: ConfigService) {}

  list(): Observable<Packet[]> {
    return this.http.get<Packet[]>(this.config.API_URI + 'packets');
  }

  create(data: Packet): Observable<Packet> {
    return this.http.post<Packet>(this.config.API_URI + 'packets', data);
  }

  modify(id: number, data: Packet): Observable<Packet> {
    return this.http.put<Packet>(this.config.API_URI + 'packets/' + id, data);
  }

  get(id: number): Observable<Packet> {
    return this.http.get<Packet>(this.config.API_URI + 'packets/' + id);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(this.config.API_URI + 'packets/' + id);
  }
}
