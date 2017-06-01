import { Component, OnInit } from '@angular/core';
import {DeviceService} from '../../service/device.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  totalAvailableDevices: any;
  orders = {total_ordered_qty: null, total_received_qty: null, total_deficiency_qty: null};
  billable = {
    datasets: [{data: []}],
    labels: [],
    colors: [{  // pie chart color setting, pay attention to use the below format, compared with line/bar chart, the formatting is not the same
      backgroundColor: ['#82C456', '#D3D3D3']
    }],
    isDataAvailable: false,
    options:{
      legend:{
        display:true
      },
      title: {
        display: true,
        fontSize: 16,
        text: 'billable vs Non-billable devices'
      },
      responsive: true,
      maintainAspectRatio: false
    }
  };
  status = {
    datasets: [{data: [], label: 'count'}],
    labels: [],
    colors: [
      {backgroundColor: '#5E7EE4'}
    ],
    options: {
      title: {
        display: true,
        fontSize: 16,
        text: 'Device Status'
      },
      scales: {
        xAxes: [{
          gridLines: {
            display: true
          }
        }],
        yAxes: [{
          gridLines: {
            display: false
          }
        }]
      },
      responsive: true,
      maintainAspectRatio: false
    },
    isDataAvailable: false
  };

  location = {
    datasets: [{data: [], label: 'count'}],
    labels: [],
    colors: [
      {backgroundColor: '#5E7EE4'}
    ],
    options: {
      title: {
        display: true,
        fontSize: 16,
        text: 'Device Location'
      },
      scales: {
        xAxes: [{
          gridLines: {
            display: true
          }
        }],
        yAxes: [{
          gridLines: {
            display: false
          }
        }]},
      responsive: true,
      maintainAspectRatio: false
  },
    isDataAvailable: false
  };
  purchaseOrder = {
    datasets: [],
    labels: [],
    colors: [
      { backgroundColor: '#5E7EE4' },
      { backgroundColor: '#AD2E39' },
      { backgroundColor: '#82C456' }
    ],
    options: {
      title: {
        display: true,
        fontSize: 16,
        text: 'Purchase Order History'
      },
      legend:{
        display:true,
        position:'right'
      },
      scales: {
        xAxes: [{
          gridLines: {
            display: false
          }
        }]
      }
    },
    responsive: true,
    maintainAspectRatio: false,
    isDataAvailable: false
  };

  constructor(private deviceService: DeviceService) { }

  ngOnInit() {
    // get billable devices
    this.deviceService.getData( '/dashboard/billable').subscribe( res => {
      res.forEach( value => {
        this.billable.labels.push(value.billable);
        this.billable.datasets[0].data.push(Number(value.count));
      });
      this.billable.isDataAvailable = true;
    }, err => console.log(err));
    // get status
    this.deviceService.getData( '/dashboard/status').subscribe( res => {
      res.forEach( value => {
        this.status.labels.push(value.status);
        this.status.datasets[0].data.push(Number(value.count));
      });
      this.status.isDataAvailable = true;
    }, err => console.log(err));
    // get location
    this.deviceService.getData( '/dashboard/location').subscribe( res => {
      let deviceCounts = 0; // count total available devices
      res.forEach( value => {
        // count
        if(value.location == 'Drawer1-Active' ||  value.location == 'Drawer3-Suspended' || value.location == 'Drawer4-Inactive(Misc)') {
          deviceCounts = Number(value.count) + deviceCounts;
        }
        // populate data for bar chart
        this.location.labels.push(value.location);
        this.location.datasets[0].data.push(Number(value.count));
      });
      console.log('test');
      console.log(deviceCounts);
      this.totalAvailableDevices = deviceCounts;
      this.location.isDataAvailable = true;
    }, err => console.log(err));
    // get purchase order
    this.deviceService.getData( '/dashboard/purchaseOrder').subscribe( res => {
      // populate data for bar chart
      let orderQty = {data: [], label: 'orderQty'};
      let receivedQty = {data: [], label: 'receivedQty'};
      let deficiencyQty = {data: [], label: 'deficiencyQty'};
      // populate data
      res.forEach( value => {
        this.purchaseOrder.labels.push(value.purchase_order);
        orderQty.data.push(Number(value.order_quantity));
        receivedQty.data.push(Number(value.received_quantity));
        deficiencyQty.data.push(Number(value.deficiency_quantity));
      });
      //summary
      this.purchaseOrder.datasets = [orderQty, receivedQty, deficiencyQty];
      // set true when finished async data
      this.purchaseOrder.isDataAvailable = true;
    }, err => console.log(err));
   //get total order per received, deficiency
    this.deviceService.getData( '/dashboard/orderSummary').subscribe( res => {
      this.orders.total_ordered_qty = res[0].total_ordered_qty;
      this.orders.total_received_qty= res[0].total_received_qty;
      this.orders.total_deficiency_qty = res[0].total_deficiency_qty;
    }, err => console.log(err));
  }

}
