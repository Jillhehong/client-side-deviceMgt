import { Component, OnInit } from '@angular/core';
// import {Location} from '@angular/common';   // import location


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // alert msg
  successMessage = true;
  alert = {message: 'incorrect username or password'};
  // log in user
  user = {email: null, password: null};
  closeAlert() {
    this.successMessage = false;
  }
  // login form submit
  submit(user) {
    if (!user.email || !user.password) {
      // this.successMessage = true;
      this.alert.message = 'email and password is required';
    }
  }
  constructor() {}
  ngOnInit() {
  }

}
