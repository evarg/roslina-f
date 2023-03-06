import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Producer, ProducersService } from 'src/app/services/producers.service';

@Component({
  selector: 'app-producers-list',
  templateUrl: './producers-list.component.html',
  styleUrls: ['./producers-list.component.scss']
})
export class ProducersListComponent implements OnInit {

  displayedColumns: string[] = ['producerID', 'producerName', 'producerEdit', 'producerDelete'];
  dataSource: Producer[] = [];
  rw: string = "";
  progress: number = 0;
  buildingID: number = 24;

  constructor(private http: HttpClient, private producersService: ProducersService) { }

  ngOnInit(): void {
    this.getAll()
  }

  getAll(): void {
    this.progress = 100;
    this.producersService.list().subscribe(data => {
      this.dataSource = data;
      this.progress = 0;
    })
  }

}
