import { Component, OnInit, Input } from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {DeviceService} from '../../../../service/device.service';
import * as moment from 'moment';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

@Component({
  selector: 'app-edit-device-management-modal',
  templateUrl: './edit-device-mgt-modal.component.html',
  styleUrls: ['./edit-device-mgt-modal.component.css']
})
export class EditDeviceManagementModalComponent implements OnInit {
  @Input() data;
  options: object;
  error: string;
  parent_clinic = []; // define type and initialize an empty value so that you can use its push method below
  sub_clinic = [];
  newData: any;
  styles = {checked_out_date: '',checked_in_date: '', wyless_provision_date: '', registration_date: '',
    device_test_date: '', device_suspension_date: '', lease_start_date: '', lease_end_date: ''};
  constructor(public activeModal: NgbActiveModal, private deviceService: DeviceService) { }
  ngOnInit() {
    this.options = this.deviceService.getDeviceMgtSelectOptions();
    // get parent_clinic
    this.deviceService.getData( '/deviceMgt/get/parent_clinic').subscribe( res => {
      console.log('test');
      console.log(this.parent_clinic);
      res.forEach(value => this.parent_clinic.push(value.parent_clinic));
    }, res => console.log(res));

    //get sub clinic
    this.deviceService.getData( '/deviceMgt/get/sub_clinic').subscribe( res => {
      res.forEach(value => this.sub_clinic.push(value.sub_clinic));
    }, res => console.log(res));
  }
  update(value) {
    // let error: string;
    // validation
    // Object.keys(value).forEach( key=> {
    //   if(key.indexOf('date') !== -1 && !moment(value[key], 'YYYY-MM-DD', true).isValid()) {
    //     this.styles[key] = {'background-color': '#f2dede'};
    //   }
    // });
    //convert empty value into null
    Object.keys(value).forEach( key => {
      if(value[key] == '') {
        value[key] = null;
        console.log(value[key]);
      }
    });
    this.deviceService.postData( '/deviceMgt/update', value)
      .subscribe( res => {
          console.log('test ', res);
        this.activeModal.close();
      }, err => {
        console.log(err);
        this.error = err.statusText + '. Check your input (eg: date format: yyyy-mm-dd)';
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
