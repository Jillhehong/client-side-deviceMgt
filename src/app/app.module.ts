import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
// import {Injector} from '@angular/core';
import { UIRouterModule, StateService, UIRouter } from '@uirouter/angular';  // import ui-router
import { AppComponent } from './app.component';
import { DeviceManagementComponent } from './device mgt/device-management/device-mgt.component';
import { DeviceHistoryComponent } from './device mgt/device-history/device-history.component';
import { DeviceInventoryComponent } from './device mgt/device-inventory/device-inventory.component';
import { AccessoryInventoryComponent } from './device mgt/accessory-inventory/accessory-inventory.component';
import { CustomerManagementComponent } from './device mgt/customer-management/customer-management.component';
import { DashboardComponent } from './device mgt/dashboard/dashboard.component';
import { SignupComponent } from './device mgt/signup/signup.component'; // import signup page
import { LoginComponent } from './device mgt/login/login.component';    // import login page
import { HomepageComponent } from './device mgt/homepage/homepage.component';
import {DeviceService} from './service/device.service';          // import service
import {NgbModule} from '@ng-bootstrap/ng-bootstrap'; // import ng-bootstrap
import { PublicComponent } from './device mgt/public/public.component';
import { Ng2SmartTableModule } from 'ng2-smart-table'; // import ng2-smart-table
import { EditDeviceManagementModalComponent } from './device mgt/device-management/modal/edit-deviceMgt-modal/edit-device-mgt-modal.component';
import {NgxPaginationModule} from 'ngx-pagination'; // import the module
import { InsertDeviceMgtModalComponent } from './device mgt/device-management/modal/insert-device-mgt-modal/insert-device-mgt-modal.component';
import {EditDeviceHistoryComponent} from './device mgt/device-history/edit/edit.modal';
import {InsertDeviceHistoryComponent} from './device mgt/device-history/insert/insert.modal';
import {Location} from '@angular/common';
import { ChartsModule } from 'ng2-charts';
import { SharedVariables } from './shared/shared.variables';
import {uiRouterConfigFn} from "./shared/uiRouter.config"; // import config ui-router


let routes = {
  states: [
  { name: 'public', abstract: true, component: PublicComponent},
  { name: 'public.home', url: '/home',  component: HomepageComponent },
  { name: 'public.dashboard', url: '/dashboard',  component: DashboardComponent },
  { name: 'public.deviceManagement', url: '/deviceManagement',  component: DeviceManagementComponent },
  { name: 'public.deviceHistory', url: '/deviceHistory',  component: DeviceHistoryComponent },
  { name: 'public.editDeviceHistory', url: '/deviceHistory/edit',  component: EditDeviceHistoryComponent },
  { name: 'public.insertDeviceHistory', url: '/deviceHistory/insert',  component: InsertDeviceHistoryComponent },
  { name: 'public.deviceInventory', url: '/deviceInventory',  component: DeviceInventoryComponent },
  { name: 'public.accessoryInventory', url: '/accessoryInventory',  component: AccessoryInventoryComponent },
  { name: 'public.customerManagement', url: '/customerManagement',  component: CustomerManagementComponent },
  { name: 'login', url: '/login', component: LoginComponent},
  { name: 'signup', url: '/signup',  component: SignupComponent }
  ],
  config: uiRouterConfigFn
};

@NgModule({
  declarations: [
    AppComponent,
    DeviceManagementComponent,
    DeviceHistoryComponent,
    DeviceInventoryComponent,
    AccessoryInventoryComponent,
    CustomerManagementComponent,
    DashboardComponent,
    SignupComponent,
    LoginComponent,
    HomepageComponent,
    PublicComponent,
    EditDeviceManagementModalComponent,
    EditDeviceHistoryComponent,
    InsertDeviceHistoryComponent,
    InsertDeviceMgtModalComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    Ng2SmartTableModule,
    NgxPaginationModule,
    ChartsModule,
    UIRouterModule.forRoot(routes),
    // RouterModule.forRoot([]),
    NgbModule.forRoot()
  ],
  entryComponents: [
    EditDeviceManagementModalComponent,
    InsertDeviceMgtModalComponent,
    EditDeviceHistoryComponent,
    InsertDeviceHistoryComponent
  ],
  providers: [DeviceService, SharedVariables, Location],
  bootstrap: [AppComponent]
})
export class AppModule { }
