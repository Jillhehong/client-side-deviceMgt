import {Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
@Pipe({
  name: 'DatePipe'
})
export class DatePipe implements PipeTransform {
  transform(value) {
    return value.filter(data => {
      // return value.filter('date', 'yyyy-MM-dd');
      return moment(data).format('yyyy-MM-dd') ;
    });
  }

}
