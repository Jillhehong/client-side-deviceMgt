import { Component, OnInit } from '@angular/core';
import {DeviceService} from '../../service/device.service';
import {SharedVariables} from '../../shared/shared.variables';
import {Location} from '@angular/common';
import { StateService } from '@uirouter/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
  // providers: [UIRouter]  // do not need providers for UIRouter, otherwise it will cause error
})
export class LoginComponent implements OnInit {
  // url = 'http://localhost:3000';
  // alert msg
  alert = {successMessage: false, message: 'incorrect username or password'};
  // log in user
  user = {username: null, password: null};
  closeAlert() {
    this.alert.successMessage = false;
  }
  constructor(private deviceService: DeviceService, private sharedVariable: SharedVariables, private location: Location, private stateService: StateService) {}
  ngOnInit() {
  }
  // login form submit
  submit(user) {
    if (!user.username || !user.password) {
      this.alert = {successMessage: true, message: 'email and password is required'};
    } else {
      this.deviceService.postData('/authenticateUser', user).subscribe(res => {
        this.sharedVariable.username = res.username;
        this.stateService.go('public.home');
      }, err => {
        console.log(err);
        this.alert = {successMessage: true, message: 'Incorrect email or password'};
      });
    }
  }

}
