import { Component, OnInit } from '@angular/core';
import {DeviceService} from '../../service/device.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  // url = 'http://localhost:3000';
  submitted = false;
  // alert msg
  alert = {successMessage: false, message: null};
  user = {first_name: null, last_name: null, email: null, password: null, password2: null};
  closeAlert() {
    this.alert.successMessage = false;
  }
  constructor(private deviceService: DeviceService) { }

  ngOnInit() {
  }
// submit sign up form
submit(user) {
  if (user.password !== user.password2) {
    console.log('test');
    this.alert = {successMessage: true, message: 'passwords are not the same'};
  } else {
    console.log(user);
    this.deviceService.postData('/addNewUsers', user).subscribe( res=> {
      console.log(res);
      this.submitted = true;
    }, err => {
      console.log(err);
      this.alert = {successMessage: true, message: err};
    });

  }
}

}
