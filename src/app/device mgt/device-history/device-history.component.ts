import { Component, OnInit } from '@angular/core';
import {DeviceService} from '../../service/device.service';
// import { Ng2SmartTableModule, LocalDataSource } from 'ng2-smart-table';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {EditDeviceHistoryComponent} from './edit/edit.modal';
import {InsertDeviceHistoryComponent} from './insert/insert.modal';

@Component({
  selector: 'app-device-history',
  templateUrl: './device-history.component.html',
  styleUrls: ['./device-history.component.css']
})
export class DeviceHistoryComponent implements OnInit {
  deviceHistoryData: any;
  SelectedNumberOfRow = 30;
  alert = {successMessage: false, type: null, message: null};
  p: any;
  search = {searchBy: '', searchValue: ''};

  constructor(private deviceService: DeviceService, private modalService: NgbModal) {
  }

  ngOnInit() {
    this.deviceService.getData(this.deviceService.Api + '/deviceHistory/get').subscribe(res => {
      this.deviceHistoryData = res;
    });
  }

  // search by item
  searchByItem (value) {
    const obj = {};
    obj[value.searchBy] =  value.searchValue;
    console.log(obj);

    this.deviceService.postData(this.deviceService.Api + '/deviceHistory/search', obj).subscribe( res => {
      this.deviceHistoryData = res;
    }, err => console.log(err));
  }

  // open modal for editing
  edit(index) {
    const modalRef = this.modalService.open(EditDeviceHistoryComponent, {backdrop: 'static', size: 'lg'});
    modalRef.componentInstance.data = this.deviceHistoryData[index];
    modalRef.result.then((res) => {
      this.alert = {successMessage: true, type: 'success', message: 'update success'};
    }, (error) => {
      console.log(error);
    });
  }

  // open modal for delete
  delete(content) {
    this.modalService.open(content).result.then((result) => {
      this.deviceService.postData(this.deviceService.Api + '/deviceHistory/delete', result).subscribe( res => {
        console.log(res);
        this.alert = {successMessage: true, type: 'success', message: 'delete success'};
      }, err => {
        this.alert = {successMessage: true, type: 'danger', message: 'delete failed '+ err};
      });
    }, (err) => {
      console.log(err);
    });
  }
  // create
  create() {
    const modalRef = this.modalService.open(InsertDeviceHistoryComponent, {backdrop: 'static', size: 'lg'});
    modalRef.result.then((res) => {
      this.alert = {successMessage: true, type: 'success', message: 'update success'};
    }, (error) => {
      console.log(error);
    });
  }
}
