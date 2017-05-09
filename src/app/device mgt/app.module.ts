import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { UIRouterModule } from '@uirouter/angular';  // import ui-router
import { AppComponent } from './app.component';
import { DeviceManagementComponent } from './device-management/device-mgt.component';
import { DeviceHistoryComponent } from './device-history/device-history.component';
import { DeviceInventoryComponent } from './device-inventory/device-inventory.component';
import { AccessoryInventoryComponent } from './accessory-inventory/accessory-inventory.component';
import { CustomerManagementComponent } from './customer-management/customer-management.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SignupComponent } from './signup/signup.component'; // import signup page
import { LoginComponent } from './login/login.component';    // import login page
import { HomepageComponent } from './homepage/homepage.component';
import {DeviceService} from '../service/device.service';          // import service
import {NgbModule} from '@ng-bootstrap/ng-bootstrap'; // import ng-bootstrap
import { PublicComponent } from './public/public.component';
import { Ng2SmartTableModule } from 'ng2-smart-table'; // import ng2-smart-table
import { EditDeviceManagementModalComponent } from './device-management/modal/edit-deviceMgt-modal/edit-device-mgt-modal.component';
import {NgxPaginationModule} from 'ngx-pagination'; // <-- import the module

const routes = { states: [
  { name: 'public', abstract: true, component: PublicComponent},
  { name: 'public.home', url: '/home',  component: HomepageComponent },
  { name: 'public.dashboard', url: '/dashboard',  component: DashboardComponent },
  { name: 'public.deviceManagement', url: '/deviceManagement',  component: DeviceManagementComponent },
  { name: 'public.deviceHistory', url: '/deviceHistory',  component: DeviceHistoryComponent },
  { name: 'public.deviceInventory', url: '/deviceInventory',  component: DeviceInventoryComponent },
  { name: 'public.accessoryInventory', url: '/accessoryInventory',  component: AccessoryInventoryComponent },
  { name: 'public.customerManagement', url: '/customerManagement',  component: CustomerManagementComponent },
  { name: 'login', url: '/login', component: LoginComponent},
  { name: 'signup', url: '/signup',  component: SignupComponent }

]};
//
// /** UIRouter Config  */
// export function uiRouterConfigFn(router: UIRouter) {
//   // If no URL matches, go to the `hello` state by default
//   router.urlService.rules.otherwise({ state: 'home' });
//
// }

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
    EditDeviceManagementModalComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    Ng2SmartTableModule,
    NgxPaginationModule,
    UIRouterModule.forRoot(routes),
    NgbModule.forRoot()
  ],
  entryComponents: [
    EditDeviceManagementModalComponent
  ],
  providers: [DeviceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
