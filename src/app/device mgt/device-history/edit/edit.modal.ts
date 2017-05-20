import { Component, OnInit, Input} from '@angular/core';
import {DeviceService} from '../../../service/device.service';
import {Location} from '@angular/common';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

@Component({
  selector: 'app-edit-device-history',
  templateUrl: './edit.modal.html'
  // styleUrls: ['./device-mgt.component.css']
})
export class EditDeviceHistoryComponent implements OnInit {
  @Input() data: any;
  options: any;
  error: any;
  deviceOwner = [];
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

  update(value) {
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
      this.deviceService.postData(this.deviceService.Api + '/deviceHistory/update', value).subscribe( res => {
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
      .distinctUntilChanged()
      .map(term => term.length < 2 ? []
        : this.deviceOwner.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10));


}
