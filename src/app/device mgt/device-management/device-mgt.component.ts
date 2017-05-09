import { Component, OnInit, Input } from '@angular/core';
import {LocalDataSource} from 'ng2-smart-table';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {EditDeviceManagementModalComponent} from './modal/edit-deviceMgt-modal/edit-device-mgt-modal.component';
import {DeviceService} from '../../service/device.service';

@Component({
  selector: 'app-device-management',
  templateUrl: './device-mgt.component.html',
  styleUrls: ['./device-mgt.component.css']
})
export class DeviceManagementComponent implements OnInit {
  successMessage = true;
  alert = {message: 'alert msg'};
  status: boolean;
  deviceMgtData: any;
  checkedOrNot = true;
  selectedRowNumber: number;
  closeResult: string;
  sort = false;
  search = {device_sn: null, parent_clinic: null, status: null, location: null};
  options: object;
  constructor(private modalService: NgbModal, private deviceService: DeviceService) {
  }
  // close alert bar
  closeAlert() {
    this.successMessage = false;
  }
  // change fa arrow class in accordion
  changeClass($event) {
    this.status = $event.nextState;
  }
  // change billable style
  billableStyle(type) {
    if (type === 'Y') {
      return {'background-color': '#D98880', 'border-radius': '30px'};
    }
    if (type === 'N') {
      return {'background-color': '#CACFD2', 'border-radius': '30px'};
    }
  }
  // edit selected data
  editSelectedData() {
    const modalRef = this.modalService.open(EditDeviceManagementModalComponent, {backdrop: 'static', size: 'lg'});
    modalRef.componentInstance.data = this.deviceMgtData[this.selectedRowNumber];
    modalRef.result.then((result) => {
        this.closeResult = result;
        }, (error) => {
        this.closeResult = error;
      }
      );
  }
  // test
  checkbox(event): void {
    if (event.target.checked) {
      this.checkedOrNot = false;
      this.selectedRowNumber = event.target.value;
    }
  }
  // searching
  filter(value) {
    // console.log('value', value);
  }

  // sorting
  sortNumeric(string) {
    this.sort = !this.sort;
    this.deviceMgtData.sort( (a, b) => {
      if (this.sort) {
        return a[string] - b[string];
      } else {
        return b[string] - a[string];
      }
    });
  }
  sortString(string) {
    this.sort = !this.sort;
    this.deviceMgtData.sort( (a, b) => {
      if (this.sort) {
        if ( a[string].toUpperCase() > b[string].toUpperCase() ) {
          return 1;
        } else {
          if ( a[string].toUpperCase() < b[string].toUpperCase() ) {
            return -1;
          } else {
            return 0;
          }
        }
      } else {
        if ( a[string].toUpperCase() < b[string].toUpperCase() ) {
          return 1;
        } else {
          if ( a[string].toUpperCase() > b[string].toUpperCase() ) {
            return -1;
          } else {
            return 0;
          }
        }
      }
    });
  }
  test() {
    console.log('test');
  }
  ngOnInit() {
    // data for smart-table
    this.deviceService.getData('assets/deviceMgtTable.json').subscribe(response => {
      this.deviceMgtData = response;
    });
    // select options
    this.options = this.deviceService.getDeviceMgtSelectOptions();
  }

}
