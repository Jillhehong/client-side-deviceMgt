import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  submitted = false;
  // alert msg
  successMessage = true;
  alert = {message: null};
  user = {firstName: null, lastName: null, email: null, pwd: null, pwd2: null};
  closeAlert() {
    this.successMessage = false;
  }
  // submit sign up form
  submit(user) {
    if (user.pwd !== user.pwd2) {
      this.alert.message = 'passwords are not the same';
    }
  }
  constructor() { }

  ngOnInit() {
  }

}
