import { Component, OnInit } from '@angular/core';
import {DeviceService} from '../../service/device.service';

@Component({
  selector: 'app-customer-management',
  templateUrl: './customer-management.component.html',
  styleUrls: ['./customer-management.component.css']
})
export class CustomerManagementComponent implements OnInit {
  customerData: any;
  totalDevices: any;
  panelState = [];
  test =0;

  constructor(private deviceService: DeviceService) { }

  ngOnInit() {
    this.deviceService.getData( '/customerMgt/get').subscribe( res => {
      this.customerData = res;
      let counts = 0;
      res.forEach( value => {
        counts = counts + Number(value.totaldevices); // Number() convert string to number
      });
      this.totalDevices = counts;
    }, err => console.log(err));
  }
  // accordionState(event, index) {
  //   this.panelState[index] = event.nextState;
  // }

  rightClick(event) {
    console.log(event);
    this.test ++;
    return event.preventDefault();

  }

}
