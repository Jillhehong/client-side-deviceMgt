
import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {DeviceService} from '../../../../service/device.service';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

@Component({
  selector: 'app-insert-device-mgt-modal',
  templateUrl: './insert-device-mgt-modal.component.html',
  styleUrls: ['./insert-device-mgt-modal.component.css']
})

export class InsertDeviceMgtModalComponent implements OnInit {
  error: string;
  parent_clinic =[];
  sub_clinic =[];
  options: any;
  data ={};
  // data = {
  //   purchase_order: null,
  //   registration_date: null,
  //   device_sn: null,
  //   iccid: null,
  //   imei: null,
  //   model_number: null,
  //   model_description: null,
  //   firmware_version: null,
  //   manufacturer: null,
  //   points_to: null,
  //   use_zywie_sim: null,
  //   sim_provider: null,
  //   zywie_logo: null,
  //   wyless_provision_date: null,
  //   device_test_date: null,
  //   device_suspension_date: null,
  //   status: null,
  //   location: null,
  //   checked_out_by: null,
  //   checked_out_date: null,
  //   checked_in_by: null,
  //   checked_in_date: null,
  //   salesteam: null,
  //   salesperson_name: null,
  //   enterprise_id: null,
  //   parent_clinic: null,
  //   sub_clinic: null,
  //   physician: null,
  //   billable: null,
  //   lease: null,
  //   lease_price_per_month: null,
  //   lease_start_date: null,
  //   lease_end_date: null
  // };

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
    this.deviceService.getData( '/deviceMgt/get/parent_clinic').subscribe(res => {
      res.forEach( value => {
        this.parent_clinic.push(value.parent_clinic);
      });

    }, err => {
      console.log(err);
    });
    // get sub clinic
    this.deviceService.getData( '/deviceMgt/get/sub_clinic').subscribe(res => {
      // this.sub_clinic = res;
      res.forEach(value => {
        this.sub_clinic.push(value.sub_clinic);
      });
    }, err => {
      console.log(err);
    });
  };

  insert(value) {
    console.log('test');
    console.log('test', value);
    this.deviceService.postData( '/deviceMgt/insert', value)
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
