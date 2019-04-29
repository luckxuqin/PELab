import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'berry-home',
  templateUrl: './home.component.html',
  styleUrls: [ './home.component.scss' ],

  // tslint:disable-next-line:use-host-property-decorator
  host: {
    '[class.content-container]': 'true',
  },
})
export class HomeComponent implements OnInit {

  constructor (private readonly http: HttpClient) { }

  showReserve = false;
  showFree = false;
  showReport = false;

  vo = {
    team: '',
    name: '',
    project: '',
    startDate: '',
    endDate: '',
    server: '',
  };

  sta = {
    status: '',
    server: '',
  };

  cols: string[] = ['Hostname','HostIP','Status','OEM','Server_Model','Team','AssignTo','TestBed','StartDate','EndDate'];
  data: object[] = [];

  saveReserve () {
    //console.log(this.vo);
    //this.vo.server = server;
    this.http.put<ExcelData>(`/api/get-excel/reserve` , this.vo)
    .subscribe(res => {
      this.data = res.data;
      this.vo = {
        team: '',
        name: '',
        project: '',
        startDate: '',
        endDate: '',
        server: '',
      };
      //this.cols = Object.keys(res.cols);
      //this.getExcel();
    });
  }

  saveFree () {
    this.vo.team = 'Not Assigned';
    this.vo.name = 'OPEN';
    this.vo.project = 'N/A';
    this.vo.startDate = '';
    this.vo.endDate = '';

    this.http.put<ExcelData>(`/api/get-excel/reserve` , this.vo)
    .subscribe(res => {
      this.data = res.data;
      this.vo = {
        team: '',
        name: '',
        project: '',
        startDate: '',
        endDate: '',
        server: '',
      };
      //this.getExcel();
    });
  }

  saveReport () {
    this.http.put<ExcelData>(`/api/get-excel/status` , this.sta)
    .subscribe(res => {
      this.data = res.data;
      this.sta.status = '';
      this.sta.server = '';
    });
  }


  getExcel () {
    this.http.get<ExcelData>('/api/get-excel')
    .subscribe(res => {
      this.data = res.data;
      //this.cols = Object.keys(res.cols);
    });
  }

  ngOnInit () {
    this.getExcel();
    // this.http.get<ExcelData>('/api/get-excel')
    //   .subscribe(res => {
    //     this.data = res.data;
    //     //this.cols = Object.keys(res.cols);
    //   });
  }

}

export interface ExcelData {
  cols: object;
  data: object[];
}

