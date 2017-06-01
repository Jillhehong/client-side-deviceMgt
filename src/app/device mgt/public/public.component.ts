import { Component, OnInit } from '@angular/core';
import { StateService } from '@uirouter/angular';
import {Http} from '@angular/http';
import {SharedVariables} from '../../shared/shared.variables';


@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.css']
})
export class PublicComponent implements OnInit {
  // url = 'http://localhost:3000';

  constructor(private stateService: StateService, private http: Http, private sharedVariables: SharedVariables) { }

  ngOnInit() {
  }
  logout() {
    this.http.get('/logout').toPromise().then( res => {
      this.sharedVariables.username = null;
      this.stateService.go('login');
    });
  }

}
