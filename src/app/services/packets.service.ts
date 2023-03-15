import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ConfigService } from './config.service';
import { Producer } from './producers.service';
import { FileU } from './upload-file.service';

export interface Packet {
  id?: number;
  name: string;
  desc: string;
  name_polish: string;
  name_latin: string;
  producer_id: number;
  producer?: Producer;
  files?: FileU[];
  expiration_date: string;
  purchase_date: string;
  created_at?: string;
  updated_at?: string;
}

@Injectable({
  providedIn: 'root',
})
export class PacketsService {

  constructor(private http: HttpClient) {}

  list(): Observable<Packet[]> {
    return this.http.get<Packet[]>(environment.apiUrl + 'packets');
  }

  create(data: Packet): Observable<Packet> {
    return this.http.post<Packet>(environment.apiUrl + 'packets', data);
  }

  modify(id: number, data: Packet): Observable<Packet> {
    return this.http.put<Packet>(environment.apiUrl + 'packets/' + id, data);
  }

  get(id: number): Observable<Packet> {
    return this.http.get<Packet>(environment.apiUrl + 'packets/' + id);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(environment.apiUrl + 'packets/' + id);
  }
}
