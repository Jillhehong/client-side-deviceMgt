import { Component, OnInit } from '@angular/core';
import { Ng2SmartTableModule, LocalDataSource } from 'ng2-smart-table';
import {DeviceService} from '../../service/device.service';

@Component({
  selector: 'app-device-inventory',
  templateUrl: './device-inventory.component.html',
  styleUrls: ['./device-inventory.component.css']
})
export class DeviceInventoryComponent implements OnInit {
  source: LocalDataSource; // add a property to the component
  data: any;
  settings = {columns: {}};
  constructor(private deviceService: DeviceService) { }

  ngOnInit() {
    // data variable
    this.deviceService.getData('assets/deviceInventory.json').subscribe( res => {
      this.data = res;
      this.source = new LocalDataSource(this.data); // create the source
    }, err => console.log(err));
    // setting variable
    const columns = this.deviceService.getDeviceInventoryColumns();
    columns.forEach( item => {
      const transformedName = item.replace(/_/g, ' ');
      this.settings.columns[item] = {title: transformedName, filter: false};
    });
    console.log('bgr');

  }

}
