import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Observable } from 'rxjs/rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()
export class DeviceService {
  // Api: string = 'http://localhost:3000';
  private device_Mgt_table_columns: Array<string> = [
    'purchase_order',
    'registration_date',
    'device_sn',
    'iccid',
    'imei',
    'model_number',
    'model_description',
    'firmware_version',
    'manufacturer',
    'points_to',
    'use_zywie_sim',
    'sim_provider',
    'zywie_logo',
    'wyless_provision_date',
    'device_test_date',
    'device_suspension_date',
    'status',
    'location',
    'checked_out_by',
    'checked_out_date',
    'checked_in_by',
    'checked_in_date',
    'salesteam',
    'salesperson_name',
    'enterprise_id',
    'parent_clinic',
    'sub_clinic',
    'physician',
    'billable',
    'lease',
    'lease_price_per_month',
    'lease_start_date',
    'lease_end_date'
   ];
  private device_inventory_table_columns: Array<string> = [
    'received_date',
    'order_id',
    'purchase_order' ,
    'manufacturer' ,
    'item' ,
    'order_quantity' ,
    'received_quantity' ,
    'deficiency_quantity',
    'deficiency_received_date' ,
    'shipping_status',
    'device_sn',
    'package_content'
  ];
  private accessory_inventory_table_columns: Array<string> = [
    'row',
    'received_date' ,
    'manufacturer_order_ID',
    'purchase_order' ,
    'manufacturer' ,
    'accessory' ,
    'lot_no' ,
    'order_quantity' ,
    'received_quantity',
    'deficiency' ,
    'deficient_received_date' ,
    'shipping_status' ,
    'total_price'

  ];
  private device_history_table_columns: Array<string> = [
    'row',
    'history_date',
    'device_sn' ,
    'device_action' ,
    'by_whom',
    'status' ,
    'device_owner' ,
    'replace_device' ,
    'replaced_device_sn' ,
    'note'
  ];
  // select options data in device management page
  private selectOptions = {
    devidceMgtoptions: {
      model_description: ['Aera CT 2G', 'Aera CT 3G'],
      firmware_version: [ 'V2.8', 'V2.7', 'V2.6', 'V2.5'],
      manufacturer: ['TZ Medical'],
      points_to: ['AWS-Prod', 'AWS-Dev'],
      yesOrNo: ['Y', 'N'],
      sim_provider: [ 'AT&T', 'Wyless AT&T', 'Wyless T-Mobile'],
      salesteam: ['Zywie', 'eLab Solutions', 'Health Fusion distributor'],
      status: [
        'Beta Site',
        'Clinical Trials',
        'Customer',
        'Decommissioned',
        'Defective',
        'Inventory-Active',
        'Inventory-Inactive',
        'Inventory-Suspended',
        'Refurbished',
        'RMA',
        'Sales - Out',
        'Development',
        'Sales Demo',
        'Troubleshooting',
        'SIM Switch',
        'Los'
      ],
      location: [
        'Drawer1-Active',
        'Drawer2-Accessory',
        'Drawer3-Suspended',
        'Drawer4-Inactive(Misc)',
        'Device-Out-RMA',
        'Device-Out-Others',
        'Development',
        'Shelf-A-pre-order',
        'Shelf-B-pre-order',
        'Shelf-C-pre-order',
        'Shelf-D-pre-order'
      ],
      checked_by: [ 'Alex Armstrong', 'Emir Muhovic', 'Latha Ganeshan', 'Sameer Adumala', 'Steve Rode']
    },
    deviceHistoryOptions: {
      device_action: [
        'Inventory-Inactive',
        'Checked In',
        'Checked Out',
        'Decommissioned',
        'Defective',
        'Return-RMA',
        'Sales Demo'
      ],
      by_whom: [
        'Alex Armstrong',
        'Emir Muhovic',
        'Latha Ganeshan',
        'Sameer Adumala'
      ],
      status: [
        'Beta Site',
        'Clinical Trials',
        'Customer',
        'Decommissioned',
        'Defective',
        'Inventory-Active',
        'Inventory-Inactive',
        'Inventory-Suspended',
        'Refurbished',
        'RMA',
        'Sales - Out',
        'Development',
        'Sales Demo',
        'Troubleshooting',
        'SIM Switch',
        'Lost'
      ],
      YesOrNo: [
        'Y',
        'N'
      ]
    }
};
  private deviceHistory = {

};

  constructor(private http: Http) {  }
  getDeviceMgtColumns() {
    return this.device_Mgt_table_columns;
  }
  getDeviceHistoryColumns() {
    return this.device_history_table_columns;
  }
  getDeviceInventoryColumns() {
    return this.device_inventory_table_columns;
  }
  getAccessoryInventoryColumns() {
    return this.accessory_inventory_table_columns;
  }
  getDeviceMgtSelectOptions() {
    return this.selectOptions.devidceMgtoptions;
  }
  getDeviceHistorySelectOptions() {
    return this.selectOptions.deviceHistoryOptions;
  }

  // http service
  getData(url): Observable<any> {
    return this.http.get(url)
      .map(response => response.json())
      .catch(error => Observable.throw(error));
  };
  postData(url, data): Observable<any> {
    return this.http.post(url, data)
      .map(res => res.json())
      .catch(err => Observable.throw(err));
  }
}
