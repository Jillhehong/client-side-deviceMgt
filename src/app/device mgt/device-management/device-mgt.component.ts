
import { Component, OnInit, ViewChild} from '@angular/core';
import {LocalDataSource} from 'ng2-smart-table';
import {NgbModal, NgbPopover} from '@ng-bootstrap/ng-bootstrap';
import {EditDeviceManagementModalComponent} from './modal/edit-deviceMgt-modal/edit-device-mgt-modal.component';
import {InsertDeviceMgtModalComponent} from './modal/insert-device-mgt-modal/insert-device-mgt-modal.component';
import {DeviceService} from '../../service/device.service';

@Component({
  selector: 'app-device-management',
  templateUrl: './device-mgt.component.html',
  styleUrls: ['./device-mgt.component.css']
})
export class DeviceManagementComponent implements OnInit {
  alert = {successMessage: false, type: null, message: null};
  status: boolean;
  deviceMgtData: any;
  checkedOrNot: boolean;
  selectedMgtData: any;
  sort = false;
  search = {device_sn: null, parent_clinic: null, status: null, location: null};
  options: object;
  Api: string;
  downloadUrl: string;
  RowsPerPage = 30;
  classTrueOrFalse = [];
  ifSelected: boolean;

  constructor(private modalService: NgbModal, private deviceService: DeviceService) {}

  ngOnInit() {
    this.Api = this.deviceService.Api;
    this.downloadUrl = this.Api + '/deviceMgt/download';
    // data for smart-table
    this.deviceService.getData(this.Api + '/deviceMgt/get').subscribe(response => {
      this.deviceMgtData = response;
      this.classTrueOrFalse.push(false);
    });

    // select options
    this.options = this.deviceService.getDeviceMgtSelectOptions();
  }
  // close alert bar
  closeAlert() {
    this.alert.successMessage = false;
  }
  // change fa arrow class in accordion
  // changeClass($event) {
  //   this.status = $event.nextState;
  // }
  // change billable style
  billableStyle(type) {
    if (type === 'Y') {
      return {'background-color': '#D98880', 'border-radius': '30px'};
    }
    if (type === 'N') {
      return {'background-color': '#CACFD2', 'border-radius': '30px'};
    }
  }

  // selected row
  selectedOrUnselectRow(index) {
    if(!this.classTrueOrFalse[index]) {
      this.classTrueOrFalse[index] = true;
      this.ifSelected = true;
      this.selectedMgtData = this.deviceMgtData[index];
    } else {
      this.classTrueOrFalse[index] = false;
      this.ifSelected = false;
    }
  }

  // edit selected row
  editSelectedData() {
    const modalRef = this.modalService.open(EditDeviceManagementModalComponent, {backdrop: 'static', size: 'lg'});
    modalRef.componentInstance.data = this.selectedMgtData;
    modalRef.result.then(() => {
      this.alert = {successMessage: true, type: 'success', message: 'update success'};
      console.log('testing');
      console.log(this.alert);
    }, (error) => {
      console.log(this.alert);
    });
  }
  // insert selected row
  deleteSelectedData(content) {
    console.log(this.selectedMgtData);
    this.modalService.open(content).result.then((res) => {
      console.log(res);
      this.deviceService.postData(this.Api + '/deviceMgt/insert', this.selectedMgtData).subscribe(res => {
        console.log(res);
        this.alert = {successMessage: true, type: 'success', message: 'insert success'};
      }, err => {
        console.log(err);
        this.alert = {successMessage: true, type: 'danger', message: 'insert failed '+ err};
      });
    }, (err) => {
      console.log(err);
    });
  }
  // create new
  create() {
    const modalRef = this.modalService.open(InsertDeviceMgtModalComponent, {backdrop: 'static', size: 'lg'});
    modalRef.result.then(() => {
      this.alert = {successMessage: true, type: 'success', message: 'update success'};
      console.log('testing');
      console.log(this.alert);
    }, (error) => {
      // this.alert = {successMessage: true, type: 'danger', message: 'update failed '+ error};
      console.log(this.alert);
    });


  }

  // searching
  filter(value, pop) {
    console.log(pop);
    if(this.search.device_sn || this.search.parent_clinic || this.search.status || this.search.location) {
      this.deviceService.postData(this.Api + '/deviceMgt/filter', value).subscribe( res => {
        this.deviceMgtData = res;
        console.log('test');
        pop.close();
      });
    }
  }
  clearFilter() {
    this.search = {device_sn: '', parent_clinic: '', status: '', location: ''};
    this.deviceService.getData(this.Api + '/deviceMgt/get').subscribe(res => {
      this.deviceMgtData = res;
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
  // changeListener(event): void {
  //   console.log('test');
  //   this.readThis(event.target);
  //   console.log('test2');
  // }
  // readThis(inputValue: any): void {
  //   const myReader: FileReader = new FileReader();
  //   const file: File = inputValue.files[0];
  //   const fileType = inputValue.parentElement.id;
  //   console.log('filetType ', fileType);
  //   myReader.onloadend = function (e) {
  //     //   //myReader.result is a String of the uploaded file
  //     console.log(myReader.result);
  //   };
  //   myReader.readAsArrayBuffer(file);
  // }

}
