import { Component, OnInit } from '@angular/core';
import {SharedVariables} from '../../shared/shared.variables';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  username: string;

  constructor(private sharedVariable: SharedVariables) {}

  ngOnInit() {
    // console.log(this.sharedVariable.username);
    this.username = this.sharedVariable.username;
  }

}
