
import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {DeviceService} from '../../../../service/device.service';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
// import {DatePipe} from '../../../../shared/date.pipe';

@Component({
  selector: 'app-insert-device-mgt-modal',
  templateUrl: './insert-device-mgt-modal.component.html',
  styleUrls: ['./insert-device-mgt-modal.component.css']
})

export class InsertDeviceMgtModalComponent implements OnInit {
  options: object;
  error: string;
  parent_clinic =[];
  sub_clinic =[];
  data = {};
  styles = {checked_out_date: '',checked_in_date: '', wyless_provision_date: '', registration_date: '',
    device_test_date: '', device_suspension_date: '', lease_start_date: '', lease_end_date: ''};
  constructor(public activeModal: NgbActiveModal, private deviceService: DeviceService) {
    // this.parent_clinic = this.bind(this);
  }
  ngOnInit() {
    this.options = this.deviceService.getDeviceMgtSelectOptions();
    // initialize data input for ngModel
    this.deviceService.getDeviceMgtColumns().forEach( value => {
      this.data[value] = null;
    });
    // get parent clinic
    this.deviceService.getData(this.deviceService.Api + '/deviceMgt/get/parent_clinic').subscribe(res => {
      // this.parent_clinic = res;
      res.forEach( value => {
        // console.log('test');
        this.parent_clinic.push(value.parent_clinic);
      });
      console.log('test');
      console.log(this.parent_clinic);

    }, err => {
      console.log(err);
    });
    // get sub clinic
    this.deviceService.getData(this.deviceService.Api + '/deviceMgt/get/sub_clinic').subscribe(res => {
      // this.sub_clinic = res;
      res.forEach(value => {
        this.sub_clinic.push(value.sub_clinic);
      });
    }, err => {
      console.log(err);
    });
  };


  // searchSubClinic() {
  //
  // }

  insert(value) {
    console.log('test');
    console.log('test', value);
    this.deviceService.postData(this.deviceService.Api + '/deviceMgt/insert', value)
      .subscribe( res => {
        console.log('test ', res);
        this.activeModal.close();
      }, err => {
        console.log(err);
        this.error = err.statusText + '. Check your input';
        console.log(err);
      });
  }

  searchParentClinic = (text$: Observable<any>) =>
    text$
      .debounceTime(200)
      .distinctUntilChanged()
      .map(term => term.length < 2 ? []
        : this.parent_clinic.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10));

  searchSubClinic = (text$: Observable<any>) =>
    text$
      .debounceTime(200)
      .distinctUntilChanged()
      .map(term => term.length < 2 ? []
        : this.sub_clinic.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10));

}
