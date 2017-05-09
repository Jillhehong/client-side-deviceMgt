import { Component, OnInit, Input, Output } from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {DeviceService} from '../../../../service/device.service';

@Component({
  selector: 'app-edit-device-management-modal',
  templateUrl: './edit-device-mgt-modal.component.html',
  styleUrls: ['./edit-device-mgt-modal.component.css']
})
export class EditDeviceManagementModalComponent implements OnInit {
  @Input() data;
  options: object;
  constructor(public activeModal: NgbActiveModal, private deviceService: DeviceService) { }
  ngOnInit() {
    this.options = this.deviceService.getDeviceMgtSelectOptions();
  }

}
