import { Component, OnInit} from '@angular/core';
import {DeviceService} from '../../../service/device.service';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

@Component({
  selector: 'app-insert-device-history',
  templateUrl: './insert.modal.html'
  // styleUrls: ['./device-mgt.component.css']
})
export class InsertDeviceHistoryComponent implements OnInit {
  options: any;
  error: any;
  deviceOwner = [];
  data = {};
  styles = {history_date_style: null, replaced_device_SN_style: null};

  constructor(private deviceService: DeviceService, private activeModal: NgbActiveModal) {}
  ngOnInit() {
    this.options = this.deviceService.getDeviceHistorySelectOptions();
    // get device owner
    this.deviceService.getData(this.deviceService.Api + '/deviceHistory/get/deviceOwner').subscribe( res => {
      res.forEach( value => {
        this.deviceOwner.push(value.device_owner);
      });
    }, err => console.log(err));
  }

  add(value) {
    // validate date
    const pattern = new RegExp("^\d{4}-\d{1,2}-\d{1,2}$");
    if(!pattern.test(value.history_date)) {
      this.error = 'please input date format yyyy-mm-dd';
      this.styles.history_date_style = {'background-color':'pink' };
    } else if(value.replace_device == 'Y' && !value.replaced_device_SN) {
      this.error = 'replaced device SN is required';
      this.styles.replaced_device_SN_style = {'background-color':'pink' };
    } else  {
      //convert empty value into null
      Object.keys(value).forEach( key => {
        if(value[key] == '') {
          value[key] = null;
        }
      });
      // post data
      this.deviceService.postData(this.deviceService.Api + '/deviceHistory/insert', value).subscribe( res => {
        this.activeModal.close();
      }, err => {
        this.error = err;
      });
    }
  }

  formatter =  (x: {device_owner: string}) => x.device_owner;

  // typeahead
  search = (text$: Observable<string>) =>
    text$
      .debounceTime(200)
      .map(term => term === '' ? []
        : this.deviceOwner.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10));


}
